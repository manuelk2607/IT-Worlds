import type { Exercise } from './exercise-types.ts';
import { courseExercises } from './course-exercises.ts';
export { exercisePath, type Exercise } from './exercise-types.ts';
type Text = { de: string; en: string };
const text = (de: string, en: string): Text => ({ de, en });
const topicExercises: Omit<Exercise, 'id' | 'level'>[] = [
  {
    topic: 'programmiersprachen', title: text('Den ganzzahligen Quotienten finden', 'Find the integer quotient'), format: 'Python · 17, 3, /, //, %',
    task: text('Ersetze den Operator so, dass result den abgerundeten Quotienten von 17 und 3 erhält. Dieses Rechenmodell prüft genau eine Zuweisung, kein vollständiges Python-Programm.', 'Replace the operator so result is the quotient of 17 and 3 rounded down. This arithmetic model checks one assignment, not a full Python program.'),
    starter: 'result = 17 / 3', solution: 'result = 17 // 3',
    hint: text('/ teilt, // rundet den Quotienten ab und % liefert den Rest.', '/ divides, // rounds the quotient down, and % gives the remainder.'), sources: ['python'],
  },
  {
    topic: 'datenbanken', title: text('Die passenden Kurse auswählen', 'Select the matching courses'), format: 'SQL · SELECT / FROM / WHERE',
    task: text('Wähle nur title aus courses für level = Beginner. Der lokale Übungsdatensatz enthält HTML basics (Beginner), SQL basics (Beginner) und Query plans (Advanced). Unterstützt wird genau eine SELECT-Abfrage mit dieser Gleichheitsbedingung.', 'Select only title from courses where level = Beginner. The local fixture contains HTML basics (Beginner), SQL basics (Beginner), and Query plans (Advanced). This model supports one SELECT query with this equality condition.'),
    starter: 'SELECT title\nFROM courses;', solution: "SELECT title FROM courses WHERE level = 'Beginner';",
    hint: text('WHERE schränkt Zeilen ein; Zeichenketten stehen in einfachen Anführungszeichen.', 'WHERE restricts rows; string literals use single quotes.'), sources: ['postgres'],
  },
  {
    topic: 'website-bauen', title: text('Eine Überschrift und einen Absatz auszeichnen', 'Mark up a heading and a paragraph'), format: 'HTML · h1 / p',
    task: text('Schreibe eine nicht leere h1-Überschrift und danach einen nicht leeren p-Absatz. Der Strukturprüfer akzeptiert diese beiden Elemente ohne Attribute oder verschachtelte Tags; es wird kein HTML ausgeführt.', 'Write a non-empty h1 heading followed by a non-empty p paragraph. The structure checker accepts those two elements without attributes or nested tags; it does not execute HTML.'),
    starter: '<h1>IT-Worlds</h1>\nPython, SQL, Linux.', solution: '<h1>IT-Worlds</h1>\n<p>Python, SQL, Linux.</p>',
    hint: text('Beide Elemente brauchen hier einen öffnenden und einen schließenden Tag.', 'Both elements need an opening and a closing tag here.'), sources: ['html'],
  },
  {
    topic: 'ki-neuronale-netze', title: text('Die Basisklasse ergänzen', 'Complete the base class'), format: 'Python · PyTorch',
    task: text('Ersetze BaseClass durch die Basisklasse für ein PyTorch-Modell. Geprüft werden Import und Klassendeklaration dieser Vorlage. PyTorch wird nicht geladen, ein Modell wird nicht trainiert.', 'Replace BaseClass with the base class for a PyTorch model. The checker examines the import and class declaration in this template. It does not load PyTorch or train a model.'),
    starter: 'from torch import nn\n\nclass TinyNetwork(BaseClass):\n    pass', solution: 'from torch import nn\n\nclass TinyNetwork(nn.Module):\n    pass',
    hint: text('Die Basisklasse steht im Namensraum nn und beginnt mit M.', 'The base class is in the nn namespace and starts with M.'), sources: ['pytorch'],
  },
  {
    topic: 'apis', title: text('Eine GET-Antwort beschreiben', 'Describe a GET response'), format: 'JSON · OpenAPI 3.1.1',
    task: text('Ergänze unter /courses eine get-Operation mit responses und dem Status "200" samt nicht leerer description. Der lokale Prüfer kontrolliert diese Aufgabe, nicht die gesamte OpenAPI-Spezifikation, und ruft keine API auf.', 'Add a get operation under /courses with responses and status "200", including a non-empty description. This local checker validates this task, not the entire OpenAPI specification, and makes no API calls.'),
    starter: '{\n  "openapi": "3.1.1",\n  "info": { "title": "Courses", "version": "1.0.0" },\n  "paths": { "/courses": {} }\n}',
    solution: '{\n  "openapi": "3.1.1",\n  "info": { "title": "Courses", "version": "1.0.0" },\n  "paths": { "/courses": { "get": { "responses": { "200": { "description": "OK" } } } } }\n}',
    hint: text('Die Reihenfolge ist paths → /courses → get → responses → 200 → description.', 'The nesting is paths → /courses → get → responses → 200 → description.'), sources: ['openapi'],
  },
  {
    topic: 'it-grundlagen', title: text('UTF-8-Bytes zählen', 'Count UTF-8 bytes'), format: 'JSON · UTF-8',
    task: text('Lass text unverändert und trage bei bytes die UTF-8-Byteanzahl von A€ ein. Der Prüfer codiert den Text lokal mit TextEncoder.', 'Keep text unchanged and set bytes to the UTF-8 byte count of A€. The checker encodes the text locally with TextEncoder.'),
    starter: '{ "text": "A€", "bytes": 2 }', solution: '{ "text": "A€", "bytes": 4 }',
    hint: text('A braucht ein Byte, € drei Bytes.', 'A needs one byte; € needs three.'), sources: ['utf8', 'encoder'],
  },
  {
    topic: 'netzwerke', title: text('Die verbleibende TTL berechnen', 'Calculate the remaining TTL'), format: 'JSON · DNS',
    task: text('Ein Record startet mit TTL 300 Sekunden. 120 Sekunden sind vergangen. Ändere nur remaining auf die Restdauer im vereinfachten Cache-Modell. Es findet keine DNS-Anfrage statt.', 'A record starts with a TTL of 300 seconds. 120 seconds have elapsed. Change only remaining to the time left in this simplified cache model. No DNS query is made.'),
    starter: '{ "ttl": 300, "elapsed": 120, "remaining": 300 }', solution: '{ "ttl": 300, "elapsed": 120, "remaining": 180 }',
    hint: text('Restdauer = Anfangs-TTL minus vergangene Sekunden, mindestens null.', 'Time left = initial TTL minus elapsed seconds, with a minimum of zero.'), sources: ['dns'],
  },
  {
    topic: 'it-sicherheit', title: text('Zwei unterschiedliche Faktoren kombinieren', 'Combine two different factors'), format: 'JSON · MFA',
    task: text('Kombiniere mindestens zwei Faktorkategorien. Erlaubt sind password, pin, totp und fingerprint. Diese JSON-Daten sind ein Lernmodell und keine echte Auth-Konfiguration.', 'Combine at least two factor categories. Allowed values are password, pin, totp and fingerprint. This JSON is a learning model, not a real authentication configuration.'),
    starter: '{ "factors": ["password", "pin"] }', solution: '{ "factors": ["password", "totp"] }',
    hint: text('password/pin = Wissen, totp = Besitz, fingerprint = biometrisches Merkmal.', 'password/pin = knowledge, totp = possession, fingerprint = biometric characteristic.'), sources: ['mfa'],
  },
  {
    topic: 'cloud-devops', title: text('Zwei Instanzen derselben Vorlage', 'Two instances of one template'), format: 'JSON · Container',
    task: text('Verwende für beide unterschiedlich benannten Container das Image course-demo:1. Diese selbst entworfene JSON-Struktur veranschaulicht Instanzen; sie ist keine Docker- oder Compose-Konfiguration und startet nichts.', 'Use image course-demo:1 for both differently named containers. This original JSON structure illustrates instances; it is not Docker or Compose configuration and starts nothing.'),
    starter: '{\n  "containers": [\n    { "name": "practice-a", "image": "course-demo:1" },\n    { "name": "practice-b", "image": "course-demo:2" }\n  ]\n}',
    solution: '{\n  "containers": [\n    { "name": "practice-a", "image": "course-demo:1" },\n    { "name": "practice-b", "image": "course-demo:1" }\n  ]\n}',
    hint: text('Die Namen unterscheiden die Instanzen. Der Image-Verweis darf gleich sein.', 'Names distinguish the instances. Their image reference can be the same.'), sources: ['docker'],
  },
  {
    topic: 'betriebssysteme', title: text('Dateirechte gezielt setzen', 'Set file permissions precisely'), format: 'Shell · chmod',
    task: text('Setze für notes.txt: Eigentümer lesen/schreiben, Gruppe lesen, andere keine Rechte. Unterstützt sind drei Oktalziffern oder vollständige u=,g=,o=-Zuweisungen mit r/w/x. Keine Datei wird verändert.', 'For notes.txt, set owner read/write, group read, others none. The model accepts three octal digits or complete u=,g=,o= assignments using r/w/x. No files are changed.'),
    starter: 'chmod 000 notes.txt', solution: 'chmod 640 notes.txt',
    hint: text('r = 4, w = 2, x = 1. Symbolisch geht auch u=rw,g=r,o=.', 'r = 4, w = 2, x = 1. Symbolic u=rw,g=r,o= also works.'), sources: ['coreutils'],
  },
];

export const exercises: Exercise[] = [...topicExercises.map(exercise => ({...exercise, id:exercise.topic, level:'einstieg' as const})), ...courseExercises];
