import { authClient, learningReady, learningState, loadLearningState, worldsStatusReady } from './progress-client';
import { t, locale, pagePath } from './browser-i18n';
import { authErrorMessage } from '../lib/auth-error';
const forms = [...document.querySelectorAll<HTMLFormElement>('[data-auth-form]')];
const tabs = [...document.querySelectorAll<HTMLButtonElement>('[data-auth-tab]')];
const message = document.querySelector<HTMLElement>('#auth-message')!;
const legacyAccount = document.querySelector<HTMLDetailsElement>('[data-legacy-account]')!;
const legacySummary = legacyAccount.querySelector<HTMLElement>('[data-legacy-summary]')!;
const legacyGuide = legacyAccount.querySelector<HTMLElement>('[data-legacy-guide]')!;
function show(action: string) {
  forms.forEach(form => form.hidden = form.dataset.authForm !== action);
  tabs.forEach(tab => { const selected = tab.dataset.authTab === action; tab.classList.toggle('active', selected); tab.setAttribute('aria-pressed', String(selected)); });
  message.textContent = '';
}
tabs.forEach(tab => tab.addEventListener('click', () => show(tab.dataset.authTab!)));
const params = new URLSearchParams(location.search);
function returnDestination() {
  const next = params.get('next');
  if (next?.startsWith('/')) {
    const destination = new URL(next, location.origin);
    if (destination.origin === location.origin) return destination.href;
  }
  return pagePath('/fortschritt/');
}
if (params.has('token')) show('reset');
if (params.has('error')) message.textContent = t('Dieser Link ist ungültig oder abgelaufen. Bitte fordere einen neuen an.', 'This link is invalid or expired. Please request a new one.');
const [status] = await Promise.all([worldsStatusReady, learningReady]);
const isWorldsMode = status?.enabled === true;
const linking = isWorldsMode && status.authenticated === true &&
  status.linkEnabled === true && status.accountState === 'ACCOUNT_LINK_REQUIRED';
if (isWorldsMode && status.legacySignInAvailable === true) {
  tabs.find(tab => tab.dataset.authTab === 'sign-up')!.hidden = true;
  legacySummary.hidden = false;
  legacyGuide.hidden = false;
  legacyAccount.open = params.has('token') || params.has('error');
  legacyAccount.dataset.legacyAvailable = '';
}
if (status?.enabled === false || (isWorldsMode && status.legacySignInAvailable === true)) {
  forms.forEach(form => {
    form.querySelector<HTMLButtonElement>('[type=submit]')!.disabled = isWorldsMode && form.dataset.authForm === 'sign-up';
  });
}
for (const form of forms) form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector<HTMLButtonElement>('[type=submit]')!;
  if (button.disabled) return;
  button.disabled = true;
  message.textContent = t('Einen Moment …', 'One moment …');
  const data = new FormData(form);
  const email = String(data.get('email') ?? '').trim();
  const password = String(data.get('password') ?? '');
  try {
    const action = form.dataset.authForm;
    const result = action === 'sign-up' ? await authClient.signUp.email({ email, password, name: String(data.get('name') ?? '').trim() || email.split('@')[0] })
      : action === 'forgot' ? await authClient.requestPasswordReset({ email, redirectTo: new URL(pagePath('/konto/'), location.origin).href })
      : action === 'reset' ? await authClient.resetPassword({ newPassword: password, token: params.get('token') ?? '' })
      : await authClient.signIn.email({ email, password });
    if (result.error) {
      message.textContent = authErrorMessage(result.error,locale);
      return;
    }
    if (action === 'forgot') { message.textContent = t('Falls ein Account existiert, wurde ein Link angefordert. Bitte prüfe auch deinen Spam-Ordner.', 'If an account exists, a reset link has been requested. Please also check your spam folder.'); return; }
    form.reset();
    if (action === 'reset') {
      show('sign-in'); history.replaceState(null, '', pagePath('/konto/'));
      message.textContent = t('Passwort gespeichert. Du kannst dich jetzt anmelden.', 'Password saved. You can now sign in.'); return;
    }
    if (linking) {
      message.textContent = t('Dein bisheriges Konto wurde bestätigt. Prüfe jetzt beide Konten weiter oben.', 'Your existing account has been verified. Review both accounts above.');
      document.querySelector<HTMLButtonElement>('[data-worlds-link-review]')?.focus();
      return;
    }
    await loadLearningState();
    if (!learningState.user) { message.textContent = t('Bitte melde dich mit deinem neuen Account an.', 'Please sign in with your new account.'); return; }
    location.assign(returnDestination());
  } catch(error) { message.textContent = authErrorMessage(error,locale); }
  finally { button.disabled = false; }
});
