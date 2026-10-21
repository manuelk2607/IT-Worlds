import { translate, type Locale } from './locale.ts';
export function authErrorMessage(error: unknown, locale: Locale) {
  const t=translate(locale);
  const status=error && typeof error==='object' && 'status' in error ? Number(error.status) : 0;
  const code=error && typeof error==='object' && 'code' in error ? String(error.code).toLowerCase() : '';
  if(status===429 || code.includes('rate_limit'))return t('Zu viele Versuche. Bitte versuche es später erneut.', 'Too many attempts. Please try again later.');
  if(status===401 || code.includes('invalid_credentials') || code.includes('invalid_email_or_password'))return t('E-Mail-Adresse oder Passwort stimmen nicht.', 'The email address or password is incorrect.');
  if(code.includes('already_exists') || code==='email_exists')return t('Für diese Adresse besteht bereits ein Account. Bitte melde dich an.', 'An account already exists for this address. Please sign in.');
  if(code.includes('password_too_short') || code==='weak_password')return t('Bitte verwende ein längeres Passwort.', 'Please use a longer password.');
  if(code.includes('invalid_token') || code.includes('token_expired'))return t('Dieser Link ist ungültig oder abgelaufen. Bitte fordere einen neuen an.', 'This link is invalid or expired. Please request a new one.');
  if(status>=400 && status<500)return t('Das hat nicht funktioniert. Prüfe deine Angaben und versuche es erneut.', 'That did not work. Check your details and try again.');
  return t('Der Account-Dienst ist gerade nicht erreichbar. Bitte versuche es später erneut.', 'The account service is currently unavailable. Please try again later.');
}
