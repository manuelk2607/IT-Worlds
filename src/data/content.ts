import {practiceTopics} from './practice-topics.ts';
import {documentSources} from './course-document-sources.ts';
import {practiceSources} from './practice-sources.ts';
import { exerciseSources } from './exercise-sources.ts';
import {guidedLearningPaths} from './learning-paths.ts';
import {markdownSources} from './course-markdown-sources.ts';
import {typstSources} from './course-typst-sources.ts';
import {osSources} from './course-os-sources.ts';
import {pythonSources} from './course-python-sources.ts';
import {devopsSources} from './course-devops-sources.ts';
import {securitySources} from './course-security-sources.ts';
import {networkSources} from './course-network-sources.ts';
import {linuxSources} from './course-linux-sources.ts';
import {basicsSources} from './course-basics-sources.ts';
import {webSources} from './course-web-sources.ts';
import {programmingSources} from './course-programming-sources.ts';
import { foundationSources } from './course-foundation-sources.ts';
import { additionalSources, additionalLessons, additionalQuestions } from './expansion.ts';
import { courseSources } from './course-sources.ts';
import { courseQuestions, courseLearningPaths } from './courses.ts';
export const levels = [
  {
    id: "einstieg",
    name: "Einstieg",
    number: "01",
    description: "Begriffe verstehen. Erste Schritte machen.",
  },
  {
    id: "vertiefung",
    name: "Vertiefung",
    number: "02",
    description: "Zusammenhänge erkennen. Eigenständig bauen.",
  },
  {
    id: "profi",
    name: "Profi",
    number: "03",
    description: "Architektur abwägen. Systeme hinterfragen.",
  },
] as const;
export type Level = (typeof levels)[number]["id"];

export type Source = {
  title: string;
  publisher: string;
  url: string;
  evidenceUrl: string;
  version: string;
  section: string;
  reviewedAt: string;
  description: string;
};
export const sources = {
  ...documentSources,
  ...practiceSources,
  ...exerciseSources,
  ...typstSources,
  ...markdownSources,
  ...courseSources,
  ...foundationSources,
  ...programmingSources,
  ...webSources,
  ...basicsSources,
  ...linuxSources,
  ...networkSources,
  ...securitySources,
  ...devopsSources,
  ...pythonSources,
  ...osSources,
  python: {
    title: "An Informal Introduction to Python",
    publisher: "Python Software Foundation",
    url: "https://docs.python.org/3.14/tutorial/introduction.html#numbers",
    evidenceUrl:
      "https://raw.githubusercontent.com/python/cpython/3.14/Doc/tutorial/introduction.rst",
    version: "Python 3.14",
    section: "Numbers",
    reviewedAt: "2026-10-20",
    description:
      "Zahlen, Rechenoperatoren und Variablen im offiziellen Python-Tutorial.",
  },
  postgres: {
    title: "Querying a Table",
    publisher: "PostgreSQL Global Development Group",
    url: "https://www.postgresql.org/docs/18/tutorial-select.html",
    evidenceUrl:
      "https://raw.githubusercontent.com/postgres/postgres/REL_18_STABLE/doc/src/sgml/query.sgml",
    version: "PostgreSQL 18",
    section: "Tutorial · 2.5",
    reviewedAt: "2026-10-20",
    description: "SELECT, Spaltenauswahl und das Filtern von Zeilen mit WHERE.",
  },
  html: {
    title: "Basic HTML syntax",
    publisher: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
    evidenceUrl:
      "https://raw.githubusercontent.com/mdn/content/main/files/en-us/learn_web_development/core/structuring_content/basic_html_syntax/index.md",
    version: "Fortlaufende Dokumentation",
    section: "What is HTML?",
    reviewedAt: "2026-10-20",
    description:
      "HTML als Auszeichnungssprache und die Bestandteile eines HTML-Elements.",
  },
  pytorch: {
    title: "Build the Neural Network",
    publisher: "PyTorch",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html",
    evidenceUrl:
      "https://raw.githubusercontent.com/pytorch/tutorials/main/beginner_source/basics/buildmodel_tutorial.py",
    version: "Fortlaufendes Tutorial",
    section: "Define the Class",
    reviewedAt: "2026-10-20",
    description:
      "Neuronale Netze aus Modulen aufbauen: nn.Module, Schichten und forward.",
  },
  openapi: {
    title: "OpenAPI Specification",
    publisher: "OpenAPI Initiative",
    url: "https://spec.openapis.org/oas/v3.1.1.html#introduction",
    evidenceUrl:
      "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/3.1.1/versions/3.1.1.md",
    version: "OpenAPI 3.1.1",
    section: "Introduction",
    reviewedAt: "2026-10-20",
    description:
      "Der sprachunabhängige Standard zur Beschreibung von HTTP-APIs.",
  },
  http: {
    title: "HTTP Semantics",
    publisher: "IETF · HTTP Working Group",
    url: "https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.1",
    evidenceUrl:
      "https://raw.githubusercontent.com/httpwg/http-core/main/rfc9110.xml",
    version: "RFC 9110 · Juni 2022",
    section: "9.2.1 · Safe Methods",
    reviewedAt: "2026-10-20",
    description:
      "Die Bedeutung von HTTP-Methoden und die genaue Definition sicherer Methoden.",
  },
  owasp: {
    title: "A03:2021 – Injection",
    publisher: "OWASP Foundation",
    url: "https://owasp.org/Top10/2021/A03_2021-Injection/",
    evidenceUrl:
      "https://raw.githubusercontent.com/OWASP/Top10/master/2021/docs/en/A03_2021-Injection.md",
    version: "Top 10 · Ausgabe 2021",
    section: "How to Prevent",
    reviewedAt: "2026-10-20",
    description:
      "Daten und Befehle trennen; parametrisierte Schnittstellen gegen Injection. Historische Ausgabe, keine Aussage zur aktuellen Rangfolge.",
  },
  docker: additionalSources.docker,
  linux: {
    title: "Linux kernel release 6.x",
    publisher: "Linux-Kernel-Projekt",
    url: "https://www.kernel.org/doc/html/latest/admin-guide/README.html",
    evidenceUrl:
      "https://raw.githubusercontent.com/torvalds/linux/master/Documentation/admin-guide/README.rst",
    version: "Kernel-Dokumentation · fortlaufend",
    section: "What is Linux?",
    reviewedAt: "2026-10-20",
    description:
      "Offizielle Einführung in den Linux-Kernel und weiterführende Dokumentation.",
  },
  git: {
    title: "Getting Started – What is Git?",
    publisher: "Scott Chacon & Ben Straub · Pro Git",
    url: "https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F",
    evidenceUrl:
      "https://raw.githubusercontent.com/progit/progit2/master/book/01-introduction/sections/what-is-git.asc",
    version: "Pro Git · 2. Auflage",
    section: "Snapshots, Not Differences",
    reviewedAt: "2026-10-20",
    description:
      "Das Snapshot-Modell von Git, lokale Operationen und Versionierung.",
  },
  typescript: {
    title: "TypeScript for the New Programmer",
    publisher: "Microsoft · TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html",
    evidenceUrl:
      "https://raw.githubusercontent.com/microsoft/TypeScript-Website/v2/packages/documentation/copy/en/get-started/TS%20for%20the%20New%20Programmer.md",
    version: "Fortlaufendes Handbook",
    section: "TypeScript: A Static Type Checker",
    reviewedAt: "2026-10-20",
    description:
      "Einstieg in TypeScript, statische Typprüfung und das Verhältnis zur JavaScript-Laufzeit.",
  },
  latex: {
    title: "An introduction to LaTeX",
    publisher: "The LaTeX Project",
    url: "https://www.latex-project.org/about/",
    evidenceUrl:
      "https://raw.githubusercontent.com/latex3/latex3.github.io/main/about/index.md",
    version: "Fortlaufende Projekteinstiegsseite",
    section: "An introduction to LaTeX · LaTeX Features",
    reviewedAt: "2026-10-20",
    description:
      "LaTeX als System zur Dokumentaufbereitung und zum Textsatz, einschließlich Formeln, Querverweisen und Literaturverzeichnissen.",
  },
  typst: {
    title: "Typst – README",
    publisher: "Typst",
    url: "https://github.com/typst/typst/tree/v0.15.1",
    evidenceUrl: "https://raw.githubusercontent.com/typst/typst/v0.15.1/README.md",
    version: "Typst 0.15.1 · 2026-07-17",
    section: "Overview; Installation; Usage: compile, watch, fonts, help",
    reviewedAt: "2026-10-24",
    description:
      "Markup-basiertes Satzsystem mit Funktionen und integriertem Scripting; Beispiele für Überschriften, Formeln und Layoutregeln.",
  },
  markdown: {
    title: "CommonMark Spec",
    publisher: "John MacFarlane · CommonMark",
    url: "https://spec.commonmark.org/0.31.2/#what-is-markdown-",
    evidenceUrl:
      "https://raw.githubusercontent.com/commonmark/commonmark-spec/0.31.2/spec.txt",
    version: "CommonMark 0.31.2 · 28. Januar 2024",
    section: "Introduction; 4.2 ATX headings; 4.5 Fenced code blocks; document structure and literal code",
    reviewedAt: "2026-10-24",
    description:
      "Markdown als Klartextformat für strukturierte Dokumente und die präzisierte CommonMark-Syntax.",
  },
  utf8: additionalSources.utf8,
  encoder: additionalSources.encoder,
  dns: additionalSources.dns,
  mfa: additionalSources.mfa,
  coreutils: additionalSources.coreutils,
} satisfies Record<string, Source>;
export type SourceId = keyof typeof sources;

export type Lesson = {
  curriculumIndex?: number;
  title: string;
  goal: string;
  paragraphs: string[];
  code?: string;
  language?: string;
  takeaway: string;
  sources: SourceId[];
};
export type Topic = {
  id: string;
  title: string;
  short: string;
  icon: string;
  color: string;
  group: "bauen" | "daten" | "systeme";
  description: string;
  tags: string[];
  prerequisites: string;
  curriculum: Record<Level, string[]>;
  sources: SourceId[];
  subareas?: {
    title: string;
    description: string;
    languages: string[];
    sources: SourceId[];
  }[];
  lesson?: Lesson;
};
const baseTopics: Topic[] = [
  {
    id: "programmiersprachen",
    title: "Programmiersprachen",
    short: "Von der ersten Zeile zu durchdachtem Code.",
    icon: "code",
    color: "blue",
    group: "bauen",
    description:
      "Lerne, Probleme in kleine Schritte zu zerlegen und Lösungen in Code auszudrücken. Python und TypeScript besitzen eigene Kursfolgen; Java, C/C++, Go und Rust ergänzen die weitere Sprachlandkarte. Markdown ergänzt die Programmierpraxis für einfache strukturierte Dokumentation.",
    tags: ["Python", "TypeScript", "Markdown", "Algorithmen"],
    prerequisites:
      "Für den Einstieg genügt Neugier. Vertiefungen bauen auf Variablen, Funktionen und grundlegenden Datenstrukturen auf.",
    curriculum: {
      einstieg: [
        "Variablen & Rechenoperatoren",
        "Bedingungen, Schleifen & Funktionen",
        "Erste Schritte mit Python und TypeScript",
        "Dokumentation mit Markdown strukturieren",
      ],
      vertiefung: [
        "Datenstrukturen & Algorithmen",
        "Typsysteme, Fehlerbehandlung & Tests",
        "Sprachvergleich: Java, C/C++, Go & Rust",
        "Programme dokumentieren & verständlich erklären",
      ],
      profi: [
        "Nebenläufigkeit & Speichermodelle",
        "Compiler, Laufzeiten & Profiling",
        "Softwarearchitektur & Entwurfsmuster",
        "Werkzeuge, Laufzeiten & Sprachdesign vergleichen",
      ],
    },
    sources: ["python", "git", "typescript", "markdown"],
    lesson: {
      title: "Wie rechnet Python?",
      goal: "Du kannst /, // und % an einem einfachen Beispiel unterscheiden.",
      paragraphs: [
        "Python kann direkt mit Zahlen rechnen. Ganze Zahlen wie 17 haben den Typ int. Der Operator / liefert bei der Division dieser Zahlen eine Gleitkommazahl (float).",
        "Mit // erhältst du den abgerundeten Quotienten, mit % den Rest. Für positive ganze Zahlen lässt sich das gut als „Wie oft passt die Zahl hinein, und was bleibt übrig?“ verstehen. Das Beispiel verwendet positive ganze Zahlen.",
      ],
      code: "17 / 3   # 5.666666666666667\n17 // 3  # 5\n17 % 3   # 2",
      language: "Python 3.14",
      takeaway:
        "Division, abgerundeter Quotient und Rest sind drei unterschiedliche Operationen.",
      sources: ["python"],
    },
  },
  {
    id: "datenbanken",
    title: "Datenbanken",
    short: "Daten ordnen. Die richtigen Antworten finden.",
    icon: "database",
    color: "orange",
    group: "daten",
    description:
      "Verstehe, wie Daten modelliert, gespeichert und abgefragt werden. Der Weg führt von einer ersten SQL-Abfrage zu Transaktionen, verteilten Datenbanken und begründeten Architekturentscheidungen.",
    tags: ["SQL", "PostgreSQL", "Datenmodelle"],
    prerequisites:
      "Für den Einstieg reicht der Umgang mit Tabellen. Für die Vertiefung solltest du SELECT, Schlüssel und Beziehungen kennen.",
    curriculum: {
      einstieg: [
        "Tabellen, Zeilen & Datentypen",
        "SELECT & WHERE",
        "Schlüssel & Beziehungen",
      ],
      vertiefung: [
        "JOINs, Aggregationen & Normalisierung",
        "Transaktionen & Indizes",
        "Relationale Datenbanken und NoSQL",
      ],
      profi: [
        "Abfragepläne & Performance",
        "Isolation, Replikation & Konsistenz",
        "Backups, Wiederherstellung & Datenarchitektur",
      ],
    },
    sources: ["postgres", "owasp"],
    lesson: {
      title: "Mit SQL gezielt Daten auswählen",
      goal: "Du erkennst, welche Aufgabe SELECT, FROM und WHERE übernehmen.",
      paragraphs: [
        "Eine SELECT-Abfrage liest Daten aus Tabellen. Hinter SELECT stehen die gewünschten Spalten; FROM nennt die Tabelle. Mit WHERE kannst du eine Bedingung für die zurückgegebenen Zeilen angeben.",
        "In diesem selbst erstellten Beispiel enthält die gedachte Tabelle kurse die Spalten titel und niveau. Die Abfrage liefert nur Titel von Zeilen, deren niveau den Wert Einstieg hat. Sie ist eine Illustration und wird auf dieser Website nicht ausgeführt.",
      ],
      code: "SELECT titel\nFROM kurse\nWHERE niveau = 'Einstieg';",
      language: "SQL · PostgreSQL",
      takeaway:
        "Die Spaltenauswahl steht hinter SELECT; WHERE schränkt die Zeilen ein.",
      sources: ["postgres"],
    },
  },
  {
    id: "website-bauen",
    title: "Website bauen",
    short: "Von einer Idee zu deinem Platz im Web.",
    icon: "browser",
    color: "green",
    group: "bauen",
    description:
      "Baue schrittweise eine zugängliche Website. Lerne HTML, CSS und TypeScript kennen, verbinde Oberflächen mit Daten und entwickle ein Gefühl für Performance und gutes Webdesign.",
    tags: ["HTML & CSS", "TypeScript", "Barrierefreiheit"],
    prerequisites:
      "Für HTML brauchst du keine Programmierkenntnisse. Für interaktive Oberflächen sind anschließend TypeScript-Grundlagen hilfreich.",
    curriculum: {
      einstieg: [
        "HTML: Inhalte strukturieren",
        "CSS: Layout & responsive Gestaltung",
        "TypeScript: erste Interaktionen",
      ],
      vertiefung: [
        "Semantisches HTML & Barrierefreiheit",
        "Komponenten, Formulare & API-Anbindung",
        "Git, Hosting & Veröffentlichung",
      ],
      profi: [
        "Renderingstrategien & Web-Performance",
        "Designsysteme & automatisierte Tests",
        "Web-Sicherheit & skalierbare Frontends",
      ],
    },
    sources: ["html", "git", "typescript"],
    lesson: {
      title: "HTML gibt Inhalten Struktur",
      goal: "Du kannst eine Überschrift und einen Absatz als HTML auszeichnen.",
      paragraphs: [
        "HTML steht für HyperText Markup Language. Es ist eine Auszeichnungssprache, mit der Inhalte einer Webseite strukturiert werden. Ein Element besteht häufig aus einem öffnenden Tag, einem Inhalt und einem schließenden Tag.",
        "Im Beispiel zeichnet h1 eine Überschrift der obersten Ebene aus. Das p-Element kennzeichnet einen Absatz. Nicht jedes HTML-Element hat einen schließenden Tag; die gezeigten Elemente haben einen.",
      ],
      code: "<h1>Hallo, IT-Welt!</h1>\n<p>Hier beginnt mein Lernweg.</p>",
      language: "HTML",
      takeaway:
        "Mit HTML beschreibst du die Struktur und Bedeutung deiner Inhalte.",
      sources: ["html"],
    },
  },
  {
    id: "ki-neuronale-netze",
    title: "KI & neuronale Netze",
    short: "Verstehen, was hinter den Modellen steckt.",
    icon: "network",
    color: "purple",
    group: "daten",
    description:
      "Ordne KI, maschinelles Lernen und neuronale Netze ein. Der Kurs verbindet Python und mathematische Grundlagen mit eigenen Modellen, Transformern, generativer KI, Evaluation und einem kritischen Blick auf Grenzen und Risiken.",
    tags: ["Machine Learning", "PyTorch", "Modelle"],
    prerequisites:
      "Für das PyTorch-Beispiel sind Python-Klassen und Funktionen hilfreich. Die ersten Kurskapitel erklären Begriffe und nötige Mathematik.",
    curriculum: {
      einstieg: [
        "KI, Machine Learning & Deep Learning einordnen",
        "Daten, Vektoren & Trainingsprinzip",
        "Ein neuronales Netz als Schichtenmodell",
      ],
      vertiefung: [
        "Training, Gradienten & Backpropagation",
        "Trainings-, Validierungs- & Testdaten",
        "Overfitting, Metriken & Modellvergleich",
      ],
      profi: [
        "Transformer & Modellarchitekturen",
        "Evaluation, Robustheit & Verzerrungen",
        "Inferenz, MLOps & verantwortlicher Einsatz",
      ],
    },
    sources: ["pytorch", "python"],
    lesson: {
      title: "Ein Netz aus Modulen aufbauen",
      goal: "Du kannst die Rolle von nn.Module im PyTorch-Tutorial benennen.",
      paragraphs: [
        "Im offiziellen PyTorch-Tutorial wird ein neuronales Netz als Zusammensetzung von Modulen und Schichten beschrieben. Das Beispielmodell ist eine Unterklasse von nn.Module.",
        "Die Schichten werden in __init__ angelegt. Die Methode forward beschreibt die Operationen auf den Eingabedaten. Das folgende verkürzte Strukturbeispiel definiert nur eine lineare Schicht; es trainiert kein Modell und belegt keine Vorhersagequalität.",
      ],
      code: "from torch import nn\n\nclass KleinesNetz(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.schicht = nn.Linear(3, 1)\n\n    def forward(self, x):\n        return self.schicht(x)",
      language: "Python · PyTorch",
      takeaway:
        "nn.Module bildet die Grundlage für das gezeigte PyTorch-Modell. Eine Architektur allein ist noch kein trainiertes Modell.",
      sources: ["pytorch"],
    },
  },
  {
    id: "apis",
    title: "APIs & Schnittstellen",
    short: "Anwendungen verbinden. Möglichkeiten eröffnen.",
    icon: "arrows",
    color: "pink",
    group: "bauen",
    description:
      "Erfahre, wie Anwendungen über Schnittstellen zusammenarbeiten. Von HTTP und JSON geht es zu verlässlichen Verträgen, Authentifizierung und der Gestaltung robuster APIs.",
    tags: ["HTTP", "REST", "OpenAPI"],
    prerequisites:
      "Ein Grundverständnis von Webseiten und Client/Server hilft. Für eigene API-Clients brauchst du anschließend eine Programmiersprache.",
    curriculum: {
      einstieg: [
        "Schnittstellen, Client & Server",
        "HTTP-Anfragen, Antworten & JSON",
        "APIs mit OpenAPI beschreiben",
      ],
      vertiefung: [
        "REST, GraphQL & Webhooks",
        "Authentifizierung, Fehler & Pagination",
        "API-Verträge & Integrationstests",
      ],
      profi: [
        "Versionierung & Abwärtskompatibilität",
        "Idempotenz, Rate Limits & Zuverlässigkeit",
        "API-Sicherheit & verteilte Systeme",
      ],
    },
    sources: ["openapi", "http"],
    lesson: {
      title: "Was beschreibt OpenAPI?",
      goal: "Du kannst eine API-Beschreibung von ihrer Implementierung unterscheiden.",
      paragraphs: [
        "Die OpenAPI-Spezifikation definiert einen standardisierten, sprachunabhängigen Weg, HTTP-APIs zu beschreiben. Menschen und Werkzeuge können damit die Möglichkeiten einer Schnittstelle nachvollziehen, ohne ihren Quellcode zu kennen.",
        "Eine Beschreibung kann beispielsweise Pfade, Operationen, Parameter und Antworten dokumentieren. Sie ersetzt nicht die Anwendung, die Anfragen tatsächlich verarbeitet. OpenAPI ist außerdem nicht gleichbedeutend mit jeder Art von API.",
      ],
      takeaway:
        "Ein API-Vertrag beschreibt die Schnittstelle. Die Implementierung führt ihre Funktionen aus.",
      sources: ["openapi"],
    },
  },
  {
    id: "it-grundlagen",
    title: "IT-Grundlagen",
    short: "Ein solides Fundament für jede Richtung.",
    icon: "blocks",
    color: "yellow",
    group: "systeme",
    description:
      "Starte bei den Grundbausteinen: Daten, Hardware, Software und logisches Denken. Hier entsteht das Vorwissen für die anderen Themenwelten.",
    tags: ["Bits & Bytes", "Hardware", "Daten"],
    prerequisites:
      "Keine Vorkenntnisse. Dieser Bereich ist als Startpunkt für die gesamte Plattform vorgesehen.",
    curriculum: {
      einstieg: [
        "Bits, Bytes & Zahlensysteme",
        "Hardware, Software & Dateien",
        "Logisches Denken & erste Algorithmen",
      ],
      vertiefung: [
        "Datendarstellung & Zeichencodierung",
        "Prozessor, Speicher & Ein-/Ausgabe",
        "Komplexität & Abstraktion",
      ],
      profi: [
        "Rechnerarchitektur & Speicherhierarchie",
        "Gleitkommazahlen & numerische Grenzen",
        "Systementwurf & technische Abwägungen",
      ],
    },
    sources: ["python"],
  },
  {
    id: "netzwerke",
    title: "Internet & Netzwerke",
    short: "Entdecke die Verbindungen hinter dem Web.",
    icon: "globe",
    color: "cyan",
    group: "systeme",
    description:
      "Verfolge den Weg einer Anfrage und verstehe, wie Geräte miteinander kommunizieren. Der Kurs verbindet IP und DNS mit Transport, TLS, IPv6, Routing und überprüfbaren Antworten.",
    tags: ["IP & DNS", "HTTP", "Routing"],
    prerequisites:
      "Für den Einstieg sind keine Netzwerkkenntnisse nötig. Fortgeschrittene Themen setzen Schichtenmodelle und grundlegende Protokollkenntnisse voraus.",
    curriculum: {
      einstieg: [
        "Client/Server, IP-Adressen & Ports",
        "DNS, HTTP & HTTPS",
        "Dein Heimnetz verstehen",
      ],
      vertiefung: [
        "TCP, UDP & Routing",
        "Subnetze & Netzwerkdiagnose",
        "TLS, Proxies & Caching",
      ],
      profi: [
        "HTTP/2, HTTP/3 & Protokollanalyse",
        "Lastverteilung & Ausfallsicherheit",
        "Netzwerkdesign & Observability",
      ],
    },
    sources: ["http"],
  },
  {
    id: "it-sicherheit",
    title: "IT-Sicherheit",
    short: "Risiken erkennen. Systeme bewusst schützen.",
    icon: "shield",
    color: "red",
    group: "systeme",
    description:
      "Lerne, Sicherheitsfragen von Anfang an mitzudenken. Von Kontenschutz und Phishing führt der geplante Weg zu sicherer Entwicklung und systematischer Risikoanalyse.",
    tags: ["Datenschutz", "OWASP", "Secure Coding"],
    prerequisites:
      "Alltagswissen genügt für den Einstieg. Secure Coding baut auf Programmierung, HTTP und Datenbanken auf.",
    curriculum: {
      einstieg: [
        "Passwörter, MFA & Phishing",
        "Schutzziele & Datenschutz",
        "Sicherer Umgang mit Daten",
      ],
      vertiefung: [
        "Injection & sichere Eingabeverarbeitung",
        "Authentifizierung & Berechtigungen",
        "Verschlüsselung richtig einordnen",
      ],
      profi: [
        "Threat Modeling & Sicherheitsarchitektur",
        "Sicherheitsprüfungen in eigenen Testsystemen",
        "Incident Response & Lieferkettensicherheit",
      ],
    },
    sources: ["owasp", "http"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    short: "Aus deinem Projekt wird ein verlässlicher Dienst.",
    icon: "cloud",
    color: "blue",
    group: "systeme",
    description:
      "Verbinde Entwicklung und Betrieb. Geplant sind nachvollziehbare Schritte vom ersten Deployment über Container bis zu automatisierten, beobachtbaren Systemen.",
    tags: ["Docker", "CI/CD", "Deployment"],
    prerequisites:
      "Für den Einstieg helfen Kommandozeile und ein kleines eigenes Projekt. Vertiefungen setzen Git und Netzwerkgrundlagen voraus.",
    curriculum: {
      einstieg: [
        "Hosting, Server & Cloud-Begriffe",
        "Git & erste Deployments",
        "Images & Container kennenlernen",
      ],
      vertiefung: [
        "CI/CD & Infrastructure as Code",
        "Container-Netzwerke & Konfiguration",
        "Logs, Metriken & Monitoring",
      ],
      profi: [
        "Orchestrierung & Plattformarchitektur",
        "SLOs, Resilienz & Wiederherstellung",
        "Kosten, Sicherheit & Betriebsmodelle",
      ],
    },
    sources: ["docker", "git"],
  },
  {
    id: "betriebssysteme",
    title: "Betriebssysteme & Linux",
    short: "Verstehe das System unter deinen Anwendungen.",
    icon: "terminal",
    color: "slate",
    group: "systeme",
    description:
      "Erkunde Prozesse, Dateien, Berechtigungen und die Kommandozeile. Zwei Kursfolgen verbinden praktische Linux-Kenntnisse mit nachvollziehbaren Betriebssystemkonzepten.",
    tags: ["Linux", "Shell", "Prozesse"],
    prerequisites:
      "Keine Linux-Vorkenntnisse für den Einstieg. Systemnahe Profi-Themen bauen auf Programmierung und Rechnergrundlagen auf.",
    curriculum: {
      einstieg: [
        "Betriebssystem, Kernel & Anwendungen",
        "Dateien & erste Shell-Befehle",
        "Benutzer, Gruppen & Rechte",
      ],
      vertiefung: [
        "Prozesse, Dienste & Paketverwaltung",
        "Shell-Skripte & Automatisierung",
        "Dateisysteme & Systemdiagnose",
      ],
      profi: [
        "Speicherverwaltung & Scheduling",
        "Systemaufrufe & Isolation",
        "Kernel-Konzepte & Performanceanalyse",
      ],
    },
    sources: ["linux"],
  },
];

export const topics: Topic[] = [...baseTopics.map(topic => {
  const lesson = additionalLessons[topic.id];
  return lesson ? { ...topic, lesson, sources: [...new Set([...topic.sources, ...lesson.sources])] } : topic;
}), ...practiceTopics('de')];

export type Question = {
  course?: string;
  chapter?: string;
  id: string;
  topic: string;
  level: Level;
  prompt: string;
  options: { text: string; explanation: string }[];
  answer: number;
  source: SourceId;
};
export const questions: Question[] = [
  {
    id: "python-division",
    topic: "programmiersprachen",
    level: "einstieg",
    prompt: "Welchen Wert ergibt 17 // 3 in Python 3.14?",
    options: [
      {
        text: "5",
        explanation:
          "Richtig. // liefert den abgerundeten Quotienten. 3 passt fünfmal vollständig in 17.",
      },
      {
        text: "5.666666666666667",
        explanation:
          "Das wäre das Ergebnis von 17 / 3. Mit // erhältst du hier den ganzzahligen Quotienten 5.",
      },
      {
        text: "2",
        explanation:
          "2 ist der Rest von 17 % 3. Gefragt war der Quotient von 17 // 3; der ist 5.",
      },
    ],
    answer: 0,
    source: "python",
  },
  {
    id: "sql-where",
    topic: "datenbanken",
    level: "einstieg",
    prompt:
      "Welcher Teil einer SELECT-Abfrage schränkt die zurückgegebenen Zeilen durch eine Bedingung ein?",
    options: [
      {
        text: "FROM",
        explanation:
          "FROM nennt die Tabelle. Die Bedingung für die zurückgegebenen Zeilen steht in WHERE.",
      },
      {
        text: "WHERE",
        explanation:
          "Richtig. WHERE enthält eine Bedingung; zurückgegeben werden nur Zeilen, für die sie wahr ist.",
      },
      {
        text: "Die Spaltenliste hinter SELECT",
        explanation:
          "Die Spaltenliste bestimmt die ausgegebenen Spalten. WHERE filtert die Zeilen.",
      },
    ],
    answer: 1,
    source: "postgres",
  },
  {
    id: "html-role",
    topic: "website-bauen",
    level: "einstieg",
    prompt: "Welche Aufgabe hat HTML laut der MDN-Einführung?",
    options: [
      {
        text: "Datenbankabfragen ausführen",
        explanation:
          "HTML führt keine Datenbankabfragen aus. Es zeichnet Inhalte aus und strukturiert Webseiten.",
      },
      {
        text: "Inhalte einer Webseite strukturieren",
        explanation:
          "Richtig. HTML ist eine Auszeichnungssprache, die dem Browser die Struktur der Inhalte beschreibt.",
      },
      {
        text: "Netzwerkverbindungen verschlüsseln",
        explanation:
          "HTML verschlüsselt keine Verbindungen. Seine Aufgabe ist das Auszeichnen und Strukturieren von Inhalten.",
      },
    ],
    answer: 1,
    source: "html",
  },
  {
    id: "pytorch-module",
    topic: "ki-neuronale-netze",
    level: "einstieg",
    prompt:
      "Von welcher Basisklasse erbt das neuronale Netz im gezeigten PyTorch-Tutorial?",
    options: [
      {
        text: "DataLoader",
        explanation:
          "Das gezeigte Modell erbt von nn.Module, nicht von DataLoader.",
      },
      {
        text: "nn.Module",
        explanation:
          "Richtig. Die Klasse NeuralNetwork erbt von nn.Module und beschreibt ihre Berechnung in forward.",
      },
      {
        text: "nn.Softmax",
        explanation:
          "Softmax wird im Tutorial auf die Modellausgabe angewendet. Das Netz selbst erbt von nn.Module.",
      },
    ],
    answer: 1,
    source: "pytorch",
  },
  {
    id: "openapi-role",
    topic: "apis",
    level: "einstieg",
    prompt: "Wozu dient die OpenAPI-Spezifikation 3.1.1?",
    options: [
      {
        text: "HTTP-APIs standardisiert und sprachunabhängig beschreiben",
        explanation:
          "Richtig. OpenAPI beschreibt die Möglichkeiten einer HTTP-API, ohne ihre Implementierungssprache vorauszusetzen.",
      },
      {
        text: "Den Server einer API automatisch betreiben",
        explanation:
          "Die Spezifikation beschreibt die Schnittstelle. Sie ist kein Serverbetrieb und ersetzt keine Implementierung.",
      },
      {
        text: "Ausschließlich Datenbanken modellieren",
        explanation:
          "OpenAPI beschreibt HTTP-APIs. Es ist keine Spezifikation ausschließlich für Datenbankmodelle.",
      },
    ],
    answer: 0,
    source: "openapi",
  },
];

export type LearningPath = {
  course?: string;
  id: string;
  title: string;
  description: string;
  level: Level;
  icon: string;
  color: string;
  prerequisites: string;
  outcome?: string;
  steps: { note?: string; topic: string; title: string; available: boolean; href?: string; contentId?: string }[];
};
questions.push(...additionalQuestions, ...courseQuestions('de'));

export const paths: LearningPath[] = [...guidedLearningPaths('de'), ...courseLearningPaths('de')];



export function topicById(id: string) {
  return topics.find((topic) => topic.id === id);
}
export function levelName(id: Level) {
  return levels.find((level) => level.id === id)!.name;
}
