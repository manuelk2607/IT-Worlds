import type { Lesson, Question } from './content.ts';

export const additionalSources = {
  utf8: {
    title: 'UTF-8, a transformation format of ISO 10646', publisher: 'IETF · RFC Editor',
    url: 'https://www.rfc-editor.org/rfc/rfc3629.html#section-3', evidenceUrl: 'https://www.rfc-editor.org/rfc/rfc3629.txt',
    version: 'RFC 3629 · 2003-11', section: '3 · UTF-8 definition', reviewedAt: '2026-10-22',
    description: 'UTF-8 codiert Unicode-Codepunkte mit einem bis vier Oktetten; ASCII bleibt erhalten.',
  },
  encoder: {
    title: 'TextEncoder: encode() method', publisher: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode',
    evidenceUrl: 'https://raw.githubusercontent.com/mdn/content/ccd1540ad8c51242b318bf437dfabe2e5315b3fa/files/en-us/web/api/textencoder/encode/index.md',
    version: 'MDN · ccd1540ad8c5', section: 'Return value · Examples', reviewedAt: '2026-10-22',
    description: 'TextEncoder.encode gibt die UTF-8-Bytes einer Zeichenkette als Uint8Array zurück.',
  },
  dns: {
    title: 'Domain names – concepts and facilities', publisher: 'IETF · RFC Editor',
    url: 'https://www.rfc-editor.org/rfc/rfc1034.html#section-3.6', evidenceUrl: 'https://www.rfc-editor.org/rfc/rfc1034.txt',
    version: 'RFC 1034 · 1987-11', section: '2.4 · Elements of the DNS; 3.6 · Resource Records', reviewedAt: '2026-10-22',
    description: 'DNS-Namensraum, Resolver, autoritative Nameserver sowie Resource Records und TTL. Grundlage, keine vollständige Darstellung späterer Erweiterungen.',
  },
  mfa: {
    title: 'Multifactor Authentication Cheat Sheet', publisher: 'OWASP Foundation',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html',
    evidenceUrl: 'https://raw.githubusercontent.com/OWASP/CheatSheetSeries/ec35f68a0d06fe5279051525c9a9f654b407c1dc/cheatsheets/Multifactor_Authentication_Cheat_Sheet.md',
    version: 'OWASP Cheat Sheet · ec35f68a0d06', section: 'Introduction · Something You Know · Software OTP Tokens', reviewedAt: '2026-10-22',
    description: 'Unterschiedliche Authentifizierungsfaktoren, Grenzen von Passwort plus PIN und Risiken von TOTP.',
  },
  coreutils: {
    title: 'File permissions', publisher: 'GNU Project · Free Software Foundation',
    url: 'https://github.com/coreutils/coreutils/blob/v9.7/doc/perm.texi',
    evidenceUrl: 'https://raw.githubusercontent.com/coreutils/coreutils/v9.7/doc/perm.texi',
    version: 'GNU Coreutils 9.7', section: 'Mode Structure · Setting Permissions · Numeric Modes', reviewedAt: '2026-10-22',
    description: 'Dateirechte für Eigentümer, Gruppe und andere; symbolische und oktale Schreibweise. Untersucht wurde die festgehaltene Version 9.7.',
  },
  docker: {
    title: 'What is Docker?', publisher: 'Docker', url: 'https://docs.docker.com/get-started/docker-overview/',
    evidenceUrl: 'https://raw.githubusercontent.com/docker/docs/b98c400647c70f3e2177d513802d5d785aef232e/content/get-started/docker-overview.md',
    version: 'Docker Docs · b98c400647c7', section: 'Docker objects · Images · Containers', reviewedAt: '2026-10-22',
    description: 'Images als Vorlagen, Container als Instanzen sowie ihre beschreibbare Schicht und persistente Speicherung.',
  },
};

export const additionalLessons: Record<string, Lesson> = {
  'it-grundlagen': {
    title: 'Warum ein Zeichen mehrere Bytes braucht', curriculumIndex: 0,
    goal: 'Du unterscheidest Text von seiner UTF-8-Codierung und zählst die Bytes eines Beispiels.',
    paragraphs: [
      'Eine Codierung legt fest, wie Text als Zahlen gespeichert wird. UTF-8 verwendet für einen Unicode-Codepunkt ein bis vier Oktette. Ein Oktett besteht aus acht Bits. Die ASCII-Zeichen passen jeweils in ein Oktett; andere Codepunkte brauchen mehr Platz.',
      'Der Buchstabe A braucht in UTF-8 ein Byte, das Eurozeichen € drei. Die Zeichenkette A€ benötigt deshalb vier Bytes. Gezählt werden hier die codierten Daten, keine Dateikopfzeile und kein zusätzlicher Speicher einer Anwendung.',
      'TextEncoder übersetzt eine Zeichenkette in UTF-8-Bytes. Die Länge des zurückgegebenen Uint8Array zählt diese Bytes. Die Übung nutzt genau diese Codierung; andere Codierungen können andere Bytefolgen ergeben.',
    ],
    code: 'const bytes: Uint8Array = new TextEncoder().encode("A€");\nconsole.log([...bytes]); // [65, 226, 130, 172]\nconsole.log(bytes.length); // 4', language: 'TypeScript · Web API',
    takeaway: 'Textlänge und Speicherbedarf sind nicht dasselbe. Die Codierung bestimmt die Bytes.', sources: ['utf8', 'encoder'],
  },
  netzwerke: {
    title: 'Wie DNS Namen und Adressen verbindet', curriculumIndex: 1,
    goal: 'Du unterscheidest Resolver und autoritativen Nameserver und deutest eine TTL.',
    paragraphs: [
      'DNS organisiert Namen in einem verteilten Namensraum. Zu einem Namen können verschiedene Resource Records gehören. Ein A-Record der Internet-Klasse enthält eine IPv4-Adresse; andere Typen beschreiben andere Informationen. DNS liefert also nicht nur eine einzige Adresse pro Name.',
      'Ein Resolver beschafft passende Informationen für eine Anfrage. Er kann eine gespeicherte Antwort verwenden oder Nameserver befragen. Ein autoritativer Nameserver kennt die Daten einer bestimmten Zone. Resolver und autoritativer Server haben damit unterschiedliche Aufgaben.',
      'Die TTL eines Resource Records wird in Sekunden angegeben und steuert im Grundmodell seine Cache-Dauer. Bei TTL 300 und bereits 120 verstrichenen Sekunden bleiben 180 Sekunden. Das ist eine Rechenübung zum Grundmodell, keine vollständige Darstellung heutiger DNS-Caches und ihrer Erweiterungen.',
    ],
    takeaway: 'Namen, Record-Typen und Cache-Dauer gehören zusammen. Eine DNS-Anfrage überträgt noch keine Webseite.', sources: ['dns'],
  },
  'it-sicherheit': {
    title: 'Warum Passwort plus PIN noch keine MFA ist', curriculumIndex: 0,
    goal: 'Du ordnest Anmeldeverfahren den Kategorien Wissen, Besitz und biometrische Merkmale zu.',
    paragraphs: [
      'Mehrfaktor-Authentifizierung verlangt Nachweise aus mindestens zwei unterschiedlichen Kategorien. Beispiele sind Wissen wie ein Passwort, Besitz wie ein OTP-Token und biometrische Merkmale. Zwei Abfragen sind allein noch keine zwei Faktoren.',
      'Passwort und PIN gehören beide zur Kategorie Wissen. Ein Passwort zusammen mit einem unabhängigen TOTP-Token kombiniert dagegen Wissen und Besitz. Die zeitabhängigen Codes einer Authenticator-App sind ein Beispiel für einen solchen Token.',
      'Die Faktoren sollten unabhängig sein. TOTP-Codes können trotzdem durch Phishing abgefangen werden; MFA macht deshalb nicht jede Anmeldung automatisch unangreifbar. Auch der Verlust des zweiten Faktors und seine Wiederherstellung müssen berücksichtigt werden. Die folgende Übung vergleicht nur Faktoren und richtet keine echte Anmeldung ein.',
    ],
    takeaway: 'Entscheidend sind verschiedene, unabhängige Faktoren, nicht die Anzahl der Eingabefelder.', sources: ['mfa'],
  },
  'cloud-devops': {
    title: 'Image und Container auseinanderhalten', curriculumIndex: 2,
    goal: 'Du unterscheidest die Vorlage einer Anwendung von ihren laufenden Instanzen.',
    paragraphs: [
      'Ein Docker-Image ist eine schreibgeschützte Vorlage, aus der Container erzeugt werden. Es kann zum Beispiel die Anwendung und ihre benötigten Bestandteile enthalten. Ein Container ist eine ausführbare Instanz eines Images; aus derselben Vorlage lassen sich mehrere Container erzeugen.',
      'Ein gestarteter Container erhält eine beschreibbare Schicht. Änderungen dort verändern nicht einfach das zugrunde liegende Image. Wird der Container entfernt, gehen nicht persistent gespeicherte Änderungen seines Zustands verloren. Stoppen und Entfernen sind dabei unterschiedliche Aktionen.',
      'Daten, die länger leben sollen als ein Container, brauchen eine passende persistente Speicherung. Ein Image ist deshalb kein Ersatz für ein Datenbank-Backup. Diese Einführung erklärt das Modell; sie deployt nichts und startet auf deinem Gerät keinen Container.',
    ],
    takeaway: 'Image = Vorlage, Container = Instanz. Plane die Lebensdauer deiner Daten ausdrücklich.', sources: ['docker'],
  },
  betriebssysteme: {
    title: 'Dateirechte mit 640 verstehen', curriculumIndex: 2,
    goal: 'Du liest einfache Dateirechte und übersetzt sie zwischen symbolischer und oktaler Schreibweise.',
    paragraphs: [
      'Die klassischen Dateirechte unterscheiden Eigentümer, Gruppe und andere. Für jede Kategorie gibt es Lesen (r), Schreiben (w) und Ausführen (x). Hier betrachten wir eine gewöhnliche Datei, keine Verzeichnisse, Sonderbits oder zusätzlichen ACL-Regeln.',
      'In der oktalen Schreibweise stehen r, w und x für die Werte 4, 2 und 1. Die Werte einer Kategorie werden addiert. 6 bedeutet also Lesen und Schreiben, 4 nur Lesen und 0 keines dieser Rechte. 640 entspricht damit rw-r-----: Eigentümer lesen/schreiben, Gruppe lesen, andere kein Zugriff über diese Bits.',
      'Mit chmod lassen sich diese Modusbits setzen. Der symbolische Ausdruck u=rw,g=r,o= beschreibt die drei Kategorien ausdrücklich. Die Übung bildet diesen kleinen Ausschnitt nach und verändert keine Dateien auf deinem Gerät. Die gesamten Zugriffsregeln eines Systems gehen über dieses Grundmodell hinaus.',
    ],
    code: 'chmod 640 notes.txt\n# Gleiche einfachen Rechte:\nchmod u=rw,g=r,o= notes.txt', language: 'Shell · GNU Coreutils 9.7',
    takeaway: 'Die drei Ziffern beschreiben unterschiedliche Nutzerkategorien, nicht drei aufeinanderfolgende Aktionen.', sources: ['coreutils'],
  },
};

export const additionalQuestions: Question[] = [
  { id: 'utf8-byte-count', topic: 'it-grundlagen', level: 'einstieg', prompt: 'Wie viele Bytes benötigt A€ in UTF-8 ohne zusätzliche Metadaten?', answer: 1, source: 'utf8', options: [
    {text:'2', explanation:'Zwei sichtbare Zeichen bedeuten nicht zwei Bytes. A braucht ein Byte und € drei.'},
    {text:'4', explanation:'Richtig: ein Byte für A plus drei Bytes für € ergeben vier Bytes.'},
    {text:'8', explanation:'UTF-8 reserviert nicht pauschal vier Bytes pro Zeichen. Hier sind es eins plus drei.'},
  ]},
  { id: 'dns-ttl', topic: 'netzwerke', level: 'einstieg', prompt: 'In welcher Einheit wird die TTL eines DNS-Resource-Records angegeben?', answer: 0, source: 'dns', options: [
    {text:'Sekunden', explanation:'Richtig. Die TTL steuert im DNS-Grundmodell, wie lange ein Record im Cache bleiben darf.'},
    {text:'Bytes', explanation:'Bytes messen eine Datenmenge. Die TTL beschreibt eine Zeitdauer.'},
    {text:'Anzahl der Aufrufe', explanation:'Die TTL wird nicht pro Aufruf heruntergezählt. Entscheidend ist die verstrichene Zeit.'},
  ]},
  { id: 'mfa-distinct-factors', topic: 'it-sicherheit', level: 'einstieg', prompt: 'Welche Kombination verwendet zwei unterschiedliche Authentifizierungsfaktoren?', answer: 2, source: 'mfa', options: [
    {text:'Passwort und PIN', explanation:'Beide sind Wissen. Eine zweite Wissensabfrage ist kein zusätzlicher Faktor.'},
    {text:'Passwort und ein anderes Passwort', explanation:'Auch zwei verschiedene Passwörter gehören zur gleichen Kategorie Wissen.'},
    {text:'Passwort und unabhängiger TOTP-Token', explanation:'Richtig: Wissen plus Besitz. Diese Kombination beseitigt allerdings nicht jedes Phishing-Risiko.'},
  ]},
  { id: 'docker-image-container', topic: 'cloud-devops', level: 'einstieg', prompt: 'Was ist ein Docker-Container im Verhältnis zu einem Image?', answer: 1, source: 'docker', options: [
    {text:'Immer ein vollständiges Backup aller Anwendungsdaten', explanation:'Nicht persistent gespeicherte Änderungen können beim Entfernen verloren gehen. Ein Container ist kein vollständiges Backup.'},
    {text:'Eine ausführbare Instanz des Images', explanation:'Richtig. Mehrere Container können aus demselben Image erzeugt werden.'},
    {text:'Ein neuer Name für genau dasselbe Objekt', explanation:'Image und Container erfüllen unterschiedliche Rollen: Vorlage und Instanz.'},
  ]},
  { id: 'linux-mode-640', topic: 'betriebssysteme', level: 'einstieg', prompt: 'Welche einfachen Dateirechte drückt der Modus 640 aus?', answer: 0, source: 'coreutils', options: [
    {text:'Eigentümer lesen/schreiben, Gruppe lesen, andere keine', explanation:'Richtig: 6 = 4 + 2, 4 = Lesen, 0 = keine dieser Rechte.'},
    {text:'Alle dürfen lesen und schreiben', explanation:'Die Kategorien haben unterschiedliche Rechte. 640 erlaubt anderen weder Lesen noch Schreiben.'},
    {text:'Eigentümer ausführen, Gruppe schreiben, andere lesen', explanation:'Die Werte für r, w und x sind 4, 2 und 1. In 640 ist kein Ausführungsbit gesetzt.'},
  ]},
];
