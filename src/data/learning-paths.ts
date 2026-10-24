import {courses,coursePath,chapterProgressId} from './courses.ts';
import {text as t,type Bilingual,type Course} from './course-types.ts';
import type {LearningPath,Level} from './content.ts';
import type {Locale} from '../lib/locale.ts';
type Step=[Course['id'],string,Bilingual];
interface Definition {id:string;title:Bilingual;description:Bilingual;outcome:Bilingual;prerequisites:Bilingual;level:Level;icon:string;color:string;steps:Step[]}
const definitions:Definition[]=[
 {id:'erste-website',title:t('Deine erste Website','Your first website'),level:'einstieg',icon:'browser',color:'green',
 description:t('Von semantischem HTML über ein responsives Layout zur bedienbaren TypeScript-Interaktion und überprüften Veröffentlichung.','From semantic HTML through responsive layout to usable TypeScript interaction and verified publishing.'),
 prerequisites:t('Beginne ohne Programmiererfahrung. Für HTML/CSS brauchst du Browser und Editor. Vor den Interaktionen führen fünf TypeScript-Kapitel die nötigen Begriffe ein; deren lokale Programme benötigen Node.js ab 22.22, TypeScript und @types/node im eigenen Projektordner. Die Kursübersichten erklären die Einrichtung.','Start without programming experience. HTML/CSS need a browser and editor. Before interactions, five TypeScript chapters introduce the required concepts; their local programs need Node.js 22.22 or newer, TypeScript and @types/node in your own project directory. Course overviews explain setup.'),
 outcome:t('Eine kleine responsive Lernseite mit beschriftetem Formular, verständlichen Lade-/Fehlerzuständen, Tastaturzugang und einer geprüften HTML-/404-Auslieferung. Halte deine Entscheidungen in einer kurzen Projekt-README fest.','A small responsive learning page with a labelled form, clear loading/error states, keyboard access and verified HTML/404 delivery. Record your decisions in a short project README.'),
 steps:[
 ['web','struktur',t('Lege zuerst die Bedeutung und Gliederung der Inhalte fest.','First define meaning and structure of contents.')],
 ['web','boxmodell',t('Erkläre die tatsächliche Breite deiner Elemente, bevor du das Layout verteilst.','Explain actual element widths before arranging the layout.')],
 ['web','layout',t('Prüfe dieselben Inhalte auf schmalen und breiten Bildschirmen.','Check the same contents on narrow and wide screens.')],
 ['web','formulare',t('Gib Eingaben Namen, Regeln und verständliche Rückmeldungen.','Give inputs names, rules and understandable feedback.')],
 ['typescript','erste-schritte',t('Lerne Werte und Typprüfung als Grundlage der folgenden Browserlogik kennen.','Learn values and type-checking as foundations for browser logic.')],
 ['typescript','funktionen',t('Formuliere die Regeln einer Interaktion als nachvollziehbare Funktionen.','Express interaction rules as traceable functions.')],
 ['typescript','datenstrukturen',t('Ordne mehrere Aufgaben und ihren Zustand über stabile Kennungen.','Organise tasks and their state using stable identifiers.')],
 ['typescript','zustaende',t('Prüfe unbekannte Eingaben und benenne gültige oder fehlerhafte Zustände.','Validate unknown input and name valid or failed states.')],
 ['typescript','asynchron',t('Verstehe spätere Ergebnisse, bevor du Laden und Wiederholen darstellst.','Understand delayed results before displaying loading and retries.')],
 ['web','dom',t('Verbinde die Funktionen mit semantischen Elementen und Ereignissen.','Connect functions to semantic elements and events.')],
 ['web','fehlerzustaende',t('Zeige Laden, Erfolg und Fehler vollständig und ermögliche Wiederholung.','Represent loading, success and failure completely and allow retry.')],
 ['web','zugang',t('Prüfe Fokus, Tastatur und Sprunglink am fertigen Ablauf.','Check focus, keyboard operation and skip link in the complete flow.')],
 ['web','veroeffentlichen',t('Prüfe Auslieferung und fehlende Routen und dokumentiere deinen Release.','Verify delivery and missing routes and document your release.')],
 ]},
 {id:'apis-und-daten',title:t('APIs & Daten verbinden','Connect APIs & data'),level:'vertiefung',icon:'arrows',color:'blue',
 description:t('Verbinde ein belastbares Datenmodell mit einem dokumentierten HTTP-Vertrag, geprüftem Client und nachvollziehbaren Zugriffsregeln.','Connect a robust data model to a documented HTTP contract, validated client and traceable access rules.'),
 prerequisites:t('TypeScript-Funktionen, Arrays, unknown und async/await sowie erste Tabellenkenntnisse. Nutze bei Bedarf den TypeScript-Kurs vorher. SQL-Beispiele benötigen eine eigene PostgreSQL-18-Übungsdatenbank, die lokalen Clients Node.js ab 22.22. Die Kursübersichten erklären die Einrichtung.','TypeScript functions, arrays, unknown and async/await plus initial familiarity with tables. Take the TypeScript course first if needed. SQL examples require your own PostgreSQL 18 practice database; local clients need Node.js 22.22 or newer. Course overviews explain setup.'),
 outcome:t('Ein begründeter Entwurf für einen Kurskatalog: Tabellen und Constraints, parametrisierte Abfragen, HTTP-Vertrag, Datenprüfung im Client, Objektberechtigungen, Konflikt- und Wiederherstellungsfälle. Die lokalen Modelle sind kein automatisch veröffentlichter API-Server.','A reasoned course-catalogue design: tables and constraints, parameterized queries, HTTP contract, client data validation, object authorization, conflict and recovery cases. Local models do not automatically create a deployed API server.'),
 steps:[
 ['apis','http',t('Bestimme Ressourcen, Methoden und erwartete Statuswerte.','Identify resources, methods and expected status codes.')],
 ['datenbanken','modell',t('Modelliere die Daten, die der Vertrag beschreiben soll.','Model the data that the contract will describe.')],
 ['datenbanken','abfragen',t('Wähle benötigte Zeilen und Spalten und behandle NULL bewusst.','Select required rows and columns and handle NULL deliberately.')],
 ['datenbanken','beziehungen',t('Sichere Beziehungen und zulässige Daten mit Constraints.','Protect relationships and valid data with constraints.')],
 ['datenbanken','transaktionen',t('Halte zusammengehörige Änderungen auch bei Fehlern konsistent.','Keep related changes consistent even on failure.')],
 ['datenbanken','parameter',t('Trenne Datenwerte von der Abfragestruktur.','Separate data values from query structure.')],
 ['apis','vertrag',t('Beschreibe das erwartete Verhalten unabhängig von seiner Implementierung.','Describe expected behaviour independently of implementation.')],
 ['sicherheit','eingaben',t('Begrenze Form und Wertebereich an der Eingabegrenze.','Bound shape and value range at the input boundary.')],
 ['apis','client',t('Prüfe Status und tatsächliche Antwortdaten vor ihrer Verwendung.','Check status and actual response data before using it.')],
 ['apis','fehler',t('Lege verständliche Fehler und den Abbruch laufender Anfragen fest.','Define understandable failures and cancellation of ongoing requests.')],
 ['apis','rechte',t('Binde private Datenzugriffe an die validierte Identität.','Bind private data access to validated identity.')],
 ['apis','konkurrenz',t('Vermeide verlorene Änderungen bei Wiederholung und Konkurrenz.','Avoid lost updates with retries and concurrent changes.')],
 ['apis','abschluss',t('Prüfe den Vertrag mit positiven und negativen Fällen.','Check the contract with positive and negative cases.')],
 ['datenbanken','abschluss',t('Überprüfe den Datenweg einschließlich Migration und Wiederherstellung.','Verify the data path including migration and restoration.')],
 ]},
 {id:'systeme-entwerfen',title:t('Systeme bewusst entwerfen','Design systems thoughtfully'),level:'profi',icon:'blocks',color:'purple',
 description:t('Begründe Architekturentscheidungen anhand von Schutzgrenzen, Konsistenz, messbaren Betriebszielen und einem überprüften Wiederanlaufplan.','Justify architectural decisions through protection boundaries, consistency, measurable service objectives and a verified recovery plan.'),
 prerequisites:t('Praktische Erfahrung mit TypeScript, HTTP, SQL und Deployment; die vorherigen Kursfolgen dienen als Grundlage. Der Pfad beginnt mit einer gezielten Auffrischung und verbindet anschließend fortgeschrittene Kapitel. Für Beispiele nur eigene Übungsdaten und isolierte Umgebungen verwenden.','Practical TypeScript, HTTP, SQL and deployment experience; earlier course sequences provide foundations. The path starts with a focused refresher and then connects advanced chapters. Use only your own practice data and isolated environments for examples.'),
 outcome:t('Ein kurzes Architekturprotokoll für eine Lernplattform: öffentliche/private Daten, API- und Konsistenzregeln, Risiken mit überprüfbaren Maßnahmen, definierter Betriebsindikator sowie kompatibler Rollback- oder Wiederherstellungsplan. Belege jede Entscheidung durch einen konkreten Test oder eine ausdrücklich offene Annahme.','A short architecture record for a learning platform: public/private data, API and consistency rules, risks with testable controls, a defined service indicator and a compatible rollback or restore plan. Support each decision with a concrete test or an explicitly open assumption.'),
 steps:[
 ['sicherheit','bedrohungsmodell',t('Frische Werte, Datenflüsse und überprüfbare Schutzanforderungen auf.','Refresh assets, data flows and testable protection requirements.')],
 ['apis','vertrag',t('Definiere die beobachtbare Schnittstelle vor internen Implementierungsdetails.','Define the observable interface before internal implementation details.')],
 ['datenbanken','transaktionen',t('Bestimme, welche Änderungen atomar sein müssen und welche Isolation nötig ist.','Determine which changes must be atomic and which isolation is required.')],
 ['apis','konkurrenz',t('Verbinde Datenkonsistenz mit dem Verhalten konkurrierender Clients.','Connect data consistency with concurrent client behaviour.')],
 ['datenbanken','plaene',t('Miss Ausführungspläne und begründe Indexkosten am konkreten Zugriff.','Measure query plans and justify index costs for the actual access pattern.')],
 ['devops','messen',t('Wähle einen aus Nutzersicht sinnvollen Indikator und ein Messfenster.','Choose a user-relevant indicator and measurement window.')],
 ['devops','ausliefern',t('Prüfe, ob frühere Codeversionen zum aktuellen Datenstand passen.','Check whether previous code versions match the current data state.')],
 ['linux','wiederherstellung',t('Führe eine isolierte Wiederherstellungsprobe mit klarer Inhaltsprüfung durch.','Perform an isolated restore experiment with explicit content checks.')],
 ['sicherheit','abschluss',t('Prüfe Ablehnungsfälle, unveränderte Daten und Protokolle ohne Geheimnisse.','Check denied requests, unchanged data and logs without secrets.')],
 ['devops','abschluss',t('Verbinde die Entscheidungen mit einer überprüfbaren Auslieferungsprüfung.','Connect the decisions to a verifiable delivery check.')],
 ]},
];
export function guidedLearningPaths(locale:Locale):LearningPath[]{
 return definitions.map(path=>({id:path.id,title:path.title[locale],description:path.description[locale],outcome:path.outcome[locale],prerequisites:path.prerequisites[locale],level:path.level,icon:path.icon,color:path.color,
  steps:path.steps.map(([courseId,chapterId,note])=>{
   const course=courses.find(course=>course.id===courseId);
   const chapter=course?.chapters.find(chapter=>chapter.id===chapterId);
   if(!course||!chapter)throw new Error(`Missing learning-path chapter: ${courseId}/${chapterId}`);
   return {topic:course.topic,title:chapter.title[locale],available:true,href:coursePath(course,chapter),contentId:chapterProgressId(course,chapter),note:note[locale]};
  })}));
}
