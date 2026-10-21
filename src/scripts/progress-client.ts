import { createAuthClient } from '@neondatabase/auth';
import { t, locale, pagePath } from './browser-i18n';
import type { ProgressItem, ProgressChange } from '../lib/progress';

export const authClient = createAuthClient(new URL('/api/auth', location.origin).href);
interface User { id: string; name: string; email: string }
export const learningState: { user: User | null; items: ProgressItem[]; unavailable: boolean } = { user: null, items: [], unavailable: false };
const controls = [...document.querySelectorAll<HTMLElement>('[data-progress-control]')];
const itemFor = (kind: string | undefined, id: string | undefined) => learningState.items.find(item => item.kind === kind && item.contentId === id);
function render() {
  document.querySelectorAll<HTMLAnchorElement>('[data-account-link]').forEach(link => {
    link.textContent = learningState.user ? t('Mein Lernstand', 'My progress') : t('Anmelden', 'Sign in');
    link.href = pagePath(learningState.user ? '/fortschritt/' : '/konto/');
  });
  document.querySelectorAll<HTMLElement>('[data-signed-in]').forEach(element => element.hidden = !learningState.user);
  document.querySelectorAll<HTMLElement>('[data-signed-out]').forEach(element => element.hidden = !!learningState.user);
  document.querySelectorAll<HTMLElement>('[data-user-name]').forEach(element => element.textContent = learningState.user?.name ?? '');
  document.querySelectorAll<HTMLElement>('[data-user-email]').forEach(element => element.textContent = learningState.user?.email ?? '');
  document.querySelectorAll<HTMLElement>('[data-session-status]').forEach(element => element.textContent = learningState.unavailable ? t('Der Account-Dienst ist gerade nicht erreichbar. Bitte lade die Seite später neu. Alle Inhalte bleiben zugänglich.', 'The account service is currently unavailable. Please reload later. All content remains accessible.') : '');
  for (const control of controls) {
    const input = control.querySelector<HTMLInputElement>('[data-progress-toggle]')!;
    input.checked = itemFor(control.dataset.kind, control.dataset.contentId)?.completed ?? false;
    input.disabled = !learningState.user || learningState.unavailable || control.dataset.saving === 'true';
    control.querySelector<HTMLElement>('[data-progress-login]')!.hidden = !!learningState.user;
    control.classList.toggle('is-complete', input.checked);
  }
  const completed = learningState.items.filter(item => item.completed);
  const lessons = completed.filter(item => item.kind === 'lesson').length;
  const questions = completed.filter(item => item.kind === 'question').length;
  const solved = completed.filter(item => item.kind === 'question' && item.solved).length;
  for (const [selector, value] of [['[data-lessons-count]', lessons], ['[data-questions-count]', questions], ['[data-solved-count]', solved]] as const)
    document.querySelectorAll(selector).forEach(element => element.textContent = String(value));
  document.querySelectorAll<HTMLProgressElement>('[data-total-progress]').forEach(progress => progress.value = completed.length);
  document.querySelectorAll<HTMLElement>('[data-path-lesson-ids]').forEach(element => {
    const ids: string[] = JSON.parse(element.dataset.pathLessonIds!);
    const read = ids.filter(id => itemFor('lesson', id)?.completed).length;
    element.textContent = t(`${read} von ${ids.length} verfügbaren Einstiegen gelesen`, `${read} of ${ids.length} available introductions read`);
  });
  document.querySelectorAll<HTMLElement>('[data-question-solved]').forEach(element => {
    const solved = itemFor('question', element.dataset.questionSolved)?.solved;
    element.textContent = solved ? t('Richtig beantwortet', 'Answered correctly') : '';
  });
  const latest = completed.map(item => item.updatedAt).sort().at(-1);
  document.querySelectorAll<HTMLElement>('[data-last-activity]').forEach(element => element.textContent = latest ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(latest)) : t('Noch kein gespeicherter Fortschritt.', 'No saved progress yet.'));
}
export async function loadLearningState() {
  try {
    const session = await authClient.getSession({ query: { disableCookieCache: true } });
    if (session.error) throw new Error('AUTH_UNAVAILABLE');
    learningState.user = session.data?.user ? { id: session.data.user.id, name: session.data.user.name, email: session.data.user.email } : null;
    learningState.items = [];
    if (learningState.user) {
      const response = await fetch('/api/progress', { credentials: 'same-origin', cache: 'no-store' });
      if (response.status === 401) learningState.user = null;
      else if (!response.ok) throw new Error('PROGRESS_UNAVAILABLE');
      else learningState.items = (await response.json() as { items: ProgressItem[] }).items;
    }
    learningState.unavailable = false;
  } catch { learningState.unavailable = true; }
  render();
}
export const learningReady = loadLearningState();
export async function saveProgress(change: ProgressChange) {
  await learningReady;
  if (!learningState.user) return false;
  const response = await fetch('/api/progress', { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(change) });
  if (response.status === 401) { learningState.user = null; learningState.items = []; render(); throw new Error('SESSION_EXPIRED'); }
  if (!response.ok) throw new Error('SAVE_FAILED');
  const { item } = await response.json() as { item: ProgressItem };
  learningState.items = [...learningState.items.filter(current => current.kind !== item.kind || current.contentId !== item.contentId), item];
  render();
  return true;
}
export async function recordQuestion(contentId: string, selectedOption: number) {
  const control = controls.find(control => control.dataset.kind === 'question' && control.dataset.contentId === contentId);
  if (control) { control.dataset.saving = 'true'; render(); }
  try {
    if (await saveProgress({ kind: 'question', contentId, completed: true, selectedOption }) && control)
      control.querySelector<HTMLElement>('[data-progress-message]')!.textContent = t('Antwort und Fortschritt gespeichert.', 'Answer and progress saved.');
  } catch {
    if (control) control.querySelector<HTMLElement>('[data-progress-message]')!.textContent = t('Antwort ausgewertet, aber nicht gespeichert. Bitte versuche es erneut oder melde dich neu an.', 'Answer checked, but not saved. Please try again or sign in again.');
  } finally { if (control) { control.dataset.saving = 'false'; render(); } }
}
for (const control of controls) {
  const input = control.querySelector<HTMLInputElement>('[data-progress-toggle]')!;
  control.querySelector<HTMLAnchorElement>('[data-progress-login]')!.href = `${pagePath('/konto/')}?next=${encodeURIComponent(location.pathname + location.search + (location.hash || (control.dataset.kind === 'lesson' ? '#einstiegsartikel' : '')))}`;
  input.addEventListener('change', async () => {
    const message = control.querySelector<HTMLElement>('[data-progress-message]')!;
    control.dataset.saving = 'true';
    input.disabled = true;
    message.textContent = t('Wird gespeichert …', 'Saving …');
    try {
      await saveProgress({ kind: control.dataset.kind as ProgressChange['kind'], contentId: control.dataset.contentId!, completed: input.checked });
      message.textContent = t('Gespeichert.', 'Saved.');
    } catch { message.textContent = t('Nicht gespeichert. Bitte erneut versuchen oder neu anmelden.', 'Not saved. Please try again or sign in again.'); }
    finally { control.dataset.saving = 'false'; render(); }
  });
}
document.querySelectorAll<HTMLButtonElement>('[data-sign-out]').forEach(button => button.addEventListener('click', async () => {
  button.disabled = true;
  try { const result = await authClient.signOut(); if (result.error) throw new Error('SIGN_OUT_FAILED'); learningState.user = null; learningState.items = []; render(); }
  catch { document.querySelectorAll<HTMLElement>('[data-session-status]').forEach(element => element.textContent = t('Abmelden fehlgeschlagen. Bitte erneut versuchen.', 'Sign out failed. Please try again.')); }
  finally { button.disabled = false; }
}));
