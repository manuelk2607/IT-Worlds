import { translate, type Locale } from './locale.ts';
import { checkCourseExercise } from './course-exercise-checker.ts';
export interface ExerciseResult { passed: boolean; message: string; output: string }
const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
export function checkExercise(topic: string, input: string, locale: Locale): ExerciseResult {
  const t = translate(locale);
  const result = (passed: boolean, output: unknown): ExerciseResult => ({ passed,
    message: passed ? t('Aufgabe gelöst. Vergleiche das Ergebnis mit dem Lernziel.', 'Task solved. Compare the result with the learning goal.') : t('Das Lernziel ist noch nicht erreicht. Prüfe Ausgabe, Aufgabenformat und Hinweis.', 'The learning goal has not been reached yet. Check the output, task format and hint.'),
    output: typeof output === 'string' ? output : JSON.stringify(output, null, 2) ?? '',
  });
  if (!input.trim() || input.length > 8000) return result(false, t('Bitte gib zwischen 1 und 8.000 Zeichen ein.', 'Please enter between 1 and 8,000 characters.'));
  const code = input.trim();
  const courseResult = checkCourseExercise(topic, code, locale, result);
  if (courseResult) return courseResult;
  // Deliberately model a documented subset. Never eval input, create functions, render HTML or call a service.
  if (topic === 'programmiersprachen') {
    const match = code.replace(/#[^\n]*/g, '').trim().match(/^result\s*=\s*17\s*(\/\/|\/|%)\s*3\s*$/);
    if (!match) return result(false, t('Format: result = 17 OPERATOR 3', 'Format: result = 17 OPERATOR 3'));
    const value = match[1] === '//' ? Math.floor(17 / 3) : match[1] === '%' ? 17 % 3 : 17 / 3;
    return result(value === 5, { result: value });
  }
  if (topic === 'datenbanken') {
    const match = code.match(/^SELECT\s+(title|\*)\s+FROM\s+courses(?:\s+WHERE\s+level\s*=\s*'([^']*)')?\s*;?$/i);
    if (!match) return result(false, t('Unterstützt: SELECT title FROM courses WHERE level = \'Beginner\';', 'Supported: SELECT title FROM courses WHERE level = \'Beginner\';'));
    const rows = [{title:'HTML basics',level:'Beginner'},{title:'SQL basics',level:'Beginner'},{title:'Query plans',level:'Advanced'}].filter(row => match[2] === undefined || row.level === match[2]);
    return result(match[1].toLowerCase() === 'title' && match[2] === 'Beginner', match[1] === '*' ? rows : rows.map(({title}) => ({title})));
  }
  if (topic === 'website-bauen') {
    const match = code.match(/^<h1>([^<>]*)<\/h1>\s*<p>([^<>]*)<\/p>$/i);
    const valid = !!match && !!match[1].trim() && !!match[2].trim();
    return result(valid, valid && match ? { heading: match[1].trim(), paragraph: match[2].trim() } : t('Erwartet: <h1>Text</h1> und <p>Text</p>, ohne weitere Tags oder Attribute.', 'Expected: <h1>Text</h1> and <p>Text</p>, without additional tags or attributes.'));
  }
  if (topic === 'ki-neuronale-netze') {
    const lines = code.split('\n').map(line => line.replace(/#[^\n]*/, '').trim()).filter(Boolean);
    const valid = lines.length === 3 && lines[0] === 'from torch import nn' && /^class\s+TinyNetwork\s*\(\s*nn\.Module\s*\)\s*:$/.test(lines[1]) && lines[2] === 'pass';
    return result(valid, valid ? 'TinyNetwork → nn.Module\n'+t('Nur Strukturprüfung; kein Training.', 'Structure check only; no training.') : t('Prüfe Import, Basisklasse und die pass-Zeile der Vorlage.', 'Check the import, base class and pass line in the template.'));
  }
  if (topic === 'betriebssysteme') {
    const match = code.match(/^chmod\s+([0-7]{3}|[ugorwx=,]+)\s+notes\.txt$/);
    if (!match) return result(false, t('Unterstützt: chmod MODUS notes.txt', 'Supported: chmod MODE notes.txt'));
    let mode = match[1];
    if (!/^\d{3}$/.test(mode)) {
      const permissions: Record<string, number> = {};
      for (const part of mode.split(',')) {
        const pair = part.match(/^([ugo])=([rwx]*)$/);
        if (!pair || pair[1] in permissions || new Set(pair[2]).size !== pair[2].length) return result(false, t('Setze u=, g= und o= jeweils einmal.', 'Set u=, g= and o= once each.'));
        permissions[pair[1]] = [...pair[2]].reduce((sum, bit) => sum + (bit === 'r' ? 4 : bit === 'w' ? 2 : 1), 0);
      }
      if (Object.keys(permissions).length !== 3) return result(false, t('Alle drei Kategorien u, g und o angeben.', 'Include all three categories: u, g and o.'));
      mode = `${permissions.u}${permissions.g}${permissions.o}`;
    }
    return result(mode === '640', { mode, permissions: [...mode].map(digit => Number(digit)).map(bits => `${bits&4?'r':'-'}${bits&2?'w':'-'}${bits&1?'x':'-'}`).join('') });
  }
  let data: Record<string, unknown>;
  try { const parsed: unknown = JSON.parse(code); data = record(parsed); } catch { return result(false, t('Ungültiges JSON. Prüfe doppelte Anführungszeichen, Kommas und Klammern.', 'Invalid JSON. Check double quotes, commas and brackets.')); }
  if (topic === 'apis') {
    const info = record(data.info);
    const get = record(record(record(data.paths)['/courses']).get);
    const response = record(record(get.responses)['200']);
    const valid = data.openapi === '3.1.1' && typeof info.title === 'string' && !!info.title.trim() && typeof info.version === 'string' && !!info.version.trim() && typeof response.description === 'string' && !!response.description.trim();
    return result(valid, valid ? {method:'GET',path:'/courses',status:200,description:response.description} : t('Prüfe openapi, info und GET /courses → responses → "200" → description.', 'Check openapi, info and GET /courses → responses → "200" → description.'));
  }
  if (topic === 'it-grundlagen') {
    const bytes = new TextEncoder().encode('A€');
    return result(data.text === 'A€' && data.bytes === bytes.length, {text:'A€',bytes:[...bytes],byteCount:bytes.length});
  }
  if (topic === 'netzwerke') return result(data.ttl === 300 && data.elapsed === 120 && data.remaining === 180, {ttl:300,elapsed:120,remaining:180,unit:t('Sekunden','seconds')});
  if (topic === 'it-sicherheit') {
    const categories: Record<string,string> = {password:t('Wissen','knowledge'),pin:t('Wissen','knowledge'),totp:t('Besitz','possession'),fingerprint:t('Biometrie','biometrics')};
    const factors = Array.isArray(data.factors) ? data.factors : [];
    if (factors.length < 2 || factors.length > 4 || !factors.every((factor: unknown) => typeof factor === 'string' && Object.hasOwn(categories, factor))) return result(false, t('Erlaubte Faktoren: password, pin, totp, fingerprint.', 'Allowed factors: password, pin, totp, fingerprint.'));
    const selected = factors as string[];
    return result(new Set(selected.map(factor => categories[factor])).size >= 2, selected.map(factor => ({factor,category:categories[factor]})));
  }
  if (topic === 'cloud-devops') {
    const containers = Array.isArray(data.containers) ? data.containers.map(record) : [];
    const valid = containers.length === 2 && containers.every(container => typeof container.name === 'string' && /^[a-z][a-z0-9-]{0,40}$/.test(container.name) && container.image === 'course-demo:1') && containers[0].name !== containers[1].name;
    return result(valid, containers.map(container => ({name:container.name,image:container.image})));
  }
  return result(false, t('Unbekannte Übung.', 'Unknown exercise.'));
}
