import {text as t, type Bilingual} from './course-types.ts';
import type {DocumentFormat} from '../lib/document-project.ts';

export interface DocumentRequirement {id:string; label:Bilingual; help:Bilingual; pattern:RegExp}
export interface DocumentTask {id:string; progressId:string; format:DocumentFormat; chapter:string; title:Bilingual; requirements:DocumentRequirement[]}
const requirement=(id:string,label:Bilingual,help:Bilingual,pattern:RegExp):DocumentRequirement=>({id,label,help,pattern});
const latex={
 structure:requirement('structure',t('Dokumentklasse und Dokumentanfang','Document class and start'),t('Verwende eine documentclass-Anweisung und begin{document} in deiner Hauptdatei. Prüfe das passende Ende zusätzlich im Editor.','Use documentclass and begin{document} in the main file. Also check the matching end in the editor.'),/\\documentclass(?:\s*\[[^\]]*\])?\s*\{[^}]+\}[\s\S]*\\begin\s*\{document\}/),
 heading:requirement('heading',t('Semantische Überschrift','Semantic heading'),t('Gliedere mit section oder chapter statt nur größerer Schrift.','Use section or chapter rather than just a larger font.'),/\\(?:section|chapter)\*?\s*\{/),
 math:requirement('math',t('Mathematischer Ausdruck','Mathematical expression'),t('Setze die Rechnung in eine Mathematikumgebung, etwa equation, align, \\(…\\), \\[…\\] oder $…$. Das Ergebnis musst du selbst nachrechnen.','Put the calculation in math mode, such as equation, align, \\(…\\), \\[…\\] or $…$. Verify the result yourself.'),/\\begin\{(?:equation|align|gather|multline)\*?\}|\\[([]|(?<!\\)\$[^$\n]+\$/),
 table:requirement('table',t('Tabellenstruktur','Table structure'),t('Verwende tabular, tabularx oder longtable und prüfe die Zahl der Spalten im PDF.','Use tabular, tabularx or longtable and check the column count in the PDF.'),/\\begin\{(?:tabular\*?|tabularx|longtable)\}/),
 image:requirement('image',t('Grafik eingebunden','Image included'),t('Binde eine mitexportierte Grafik mit includegraphics ein. Pfad und Großschreibung müssen passen.','Include an exported image with includegraphics. Check path and case.'),/\\includegraphics(?:\s*\[[^\]]*\])?\s*\{/),
 label:requirement('label',t('Verweismarke','Reference label'),t('Vergib eine eindeutige label-Kennung am passenden Element.','Assign a unique label to the appropriate element.'),/\\label\s*\{[^}]+\}/),
 reference:requirement('reference',t('Interner Verweis','Internal reference'),t('Verweise mit ref, eqref, pageref oder einem passenden Referenzpaket auf die Marke.','Refer to the label with ref, eqref, pageref or an appropriate reference package.'),/\\(?:ref|eqref|pageref|autoref|cref|Cref)\s*\{/),
 bibliography:requirement('bibliography',t('Literaturdatei eingebunden','Bibliography file included'),t('Exportiere die .bib-Datei und binde sie mit addbibresource oder bibliography ein. Prüfe Backend und Ausgabe in Overleaf.','Export the .bib file and include it with addbibresource or bibliography. Check the backend and output in Overleaf.'),/\\(?:addbibresource|bibliography)(?:\s*\[[^\]]*\])?\s*\{/),
 citation:requirement('citation',t('Literatur zitiert','Literature cited'),t('Zitiere einen vorhandenen Schlüssel, etwa mit cite, textcite oder parencite.','Cite an existing key with cite, textcite or parencite.'),/\\(?:cite|textcite|parencite)(?:\s*\[[^\]]*\]){0,2}\s*\{/),
 command:requirement('command',t('Eigener Befehl definiert','Custom command defined'),t('Definiere eine wiederverwendbare Schnittstelle mit newcommand oder NewDocumentCommand. Prüfe ihre Ausgabe in Overleaf.','Define a reusable interface with newcommand or NewDocumentCommand. Check its output in Overleaf.'),/\\(?:newcommand|NewDocumentCommand)\*?\s*\{/),
 emphasis:requirement('emphasis',t('Text ausgezeichnet','Text emphasis'),t('Zeichne Text gezielt mit emph oder textbf aus. Überprüfe die Lesbarkeit im PDF.','Use emph or textbf deliberately. Check readability in the PDF.'),/\\(?:emph|textbf)\s*\{/),
};
const typst={
 heading:requirement('heading',t('Semantische Überschrift','Semantic heading'),t('Beginne eine Überschrift mit = und einem Leerzeichen.','Start a heading with = followed by a space.'),/^\s*=+\s+\S/m),
 math:requirement('math',t('Mathematischer Ausdruck','Mathematical expression'),t('Setze eine Formel zwischen $-Zeichen und kontrolliere Rechnung und Einheiten selbst.','Place a formula between $ signs and verify calculations and units yourself.'),/(?<!\\)\$[^$]+\$/),
 table:requirement('table',t('Tabelle','Table'),t('Verwende table(...) und prüfe die Spaltenzuordnung im offiziellen Editor.','Use table(...) and check column alignment in the official editor.'),/\btable\s*\(/),
 image:requirement('image',t('Grafik eingebunden','Image included'),t('Verwende image(...) und exportiere die Bilddatei mit dem Projekt.','Use image(...) and export the image with the project.'),/\bimage\s*\(/),
 label:requirement('label',t('Verweismarke','Reference label'),t('Setze eine eindeutige Marke wie <ergebnis> direkt an das passende Element.','Attach a unique label such as <result> to the appropriate element.'),/<[\p{L}\p{N}_:.-]+>/u),
 reference:requirement('reference',t('Verweis oder Zitat','Reference or citation'),t('Verwende @kennung und kontrolliere Nummerierung und Ziel im PDF.','Use @key and check numbering and target in the PDF.'),/(?<![\p{L}\p{N}_\\])@[\p{L}\p{N}_:.-]+/u),
 bibliography:requirement('bibliography',t('Literaturdatei eingebunden','Bibliography file included'),t('Verwende bibliography(...) mit einer mitexportierten .bib-Datei.','Use bibliography(...) with an exported .bib file.'),/\bbibliography\s*\(/),
 function:requirement('function',t('Eigene Definition','Custom definition'),t('Verwende let für eine benannte Variable oder Funktion und prüfe deren Verhalten im Editor.','Use let for a named variable or function and test its behaviour in the editor.'),/#?\blet\s+[\p{L}_]/u),
 assert:requirement('assert',t('Eingaben abgesichert','Inputs guarded'),t('Prüfe eine Voraussetzung mit assert(...) und teste bewusst gültige und ungültige Eingaben im Editor.','Check a precondition with assert(...) and deliberately test valid and invalid input in the editor.'),/\bassert(?:\.eq)?\s*\(/),
 module:requirement('module',t('Lokale Datei eingebunden','Local file included'),t('Binde ein mitexportiertes lokales Modul mit include oder import ein.','Use include or import for an exported local module.'),/#?\b(?:include|import)\s*"(?!@)[^"\n]+"/),
 data:requirement('data',t('Datenquelle geladen','Data source loaded'),t('Lade eine mitexportierte Datenquelle mit csv, json, yaml, toml oder read. Inline-Testdaten benötigen keine Datei.','Load exported data with csv, json, yaml, toml or read. Inline test data need no file.'),/\b(?:csv|json|yaml|toml|read)(?:\.decode)?\s*\(/),
 style:requirement('style',t('Gestaltungsregel','Styling rule'),t('Verwende set oder show und kontrolliere ihre Reichweite im PDF.','Use set or show and check their scope in the PDF.'),/#?\b(?:set|show)\s+\S/),
 context:requirement('context',t('Kontextabhängige Auswertung','Contextual evaluation'),t('Verwende context für Informationen aus dem Layout. Statisch wird nur das Schlüsselwort erkannt.','Use context for layout-dependent information. Only the keyword is detected statically.'),/#?\bcontext\b/),
 page:requirement('page',t('Seitenregel oder Seitenumbruch','Page rule or page break'),t('Definiere eine page-Regel oder nutze pagebreak(). Prüfe die tatsächlichen Seiten im Editor.','Define a page rule or use pagebreak(). Check the actual pages in the editor.'),/\bpage(?:break)?\s*\(/),
 inputs:requirement('inputs',t('Buildparameter','Build parameters'),t('Lies dokumentierte Parameter über sys.inputs. Teste Varianten im lokalen Compiler oder Editor.','Read documented parameters through sys.inputs. Test variants in the local compiler or editor.'),/\bsys\.inputs\b/),
};
type Entry={chapter:string; title:Bilingual; rules:DocumentRequirement[]};
const latexTasks:Entry[]=[
 {chapter:'einrichtung',title:t('Ein lauffähiges Grunddokument','A minimal document'),rules:[latex.structure]},
 {chapter:'syntax',title:t('Struktur und Textauszeichnung','Structure and text emphasis'),rules:[latex.structure,latex.emphasis]},
 {chapter:'struktur',title:t('Ein gegliedertes Dokument','A structured document'),rules:[latex.structure,latex.heading]},
 {chapter:'typografie',title:t('Gezielte Textauszeichnung','Deliberate text emphasis'),rules:[latex.emphasis]},
 {chapter:'mathematik',title:t('Eine nachvollziehbare Formel','A traceable formula'),rules:[latex.math]},
 {chapter:'mathematik-fortgeschritten',title:t('Formeln verknüpfen','Connect equations'),rules:[latex.math,latex.label,latex.reference]},
 {chapter:'tabellen',title:t('Eine strukturierte Tabelle','A structured table'),rules:[latex.table]},
 {chapter:'grafiken',title:t('Eine vollständige Grafikabgabe','A complete image submission'),rules:[latex.image]},
 {chapter:'verweise',title:t('Marken und Querverweise','Labels and cross-references'),rules:[latex.label,latex.reference]},
 {chapter:'literatur',title:t('Literatur und Zitate','Bibliography and citations'),rules:[latex.bibliography,latex.citation]},
 {chapter:'eigene-befehle',title:t('Einen Befehl definieren','Define a command'),rules:[latex.command]},
 {chapter:'fehlerdiagnose',title:t('Eine vollständige Fehlerprobe','A complete reproduction'),rules:[latex.structure]},
 {chapter:'abschlussprojekt',title:t('Abschlussbericht prüfen','Review the final report'),rules:[latex.structure,latex.heading,latex.math,latex.label,latex.reference]},
 {chapter:'projektpruefung',title:t('Korrigierten Projektstand prüfen','Review the corrected project'),rules:[latex.structure,latex.heading,latex.label,latex.reference]},
];
const typstTasks:Entry[]=[
 {chapter:'start',title:t('Das erste Typst-Dokument','The first Typst document'),rules:[typst.heading]},
 {chapter:'markup',title:t('Ein gegliedertes Dokument','A structured document'),rules:[typst.heading]},
 {chapter:'gestaltung',title:t('Gestaltungsregeln anwenden','Apply styling rules'),rules:[typst.style]},
 {chapter:'mathematik',title:t('Mathematik und Berechnung','Math and calculations'),rules:[typst.math,typst.function]},
 {chapter:'tabellen-grafiken',title:t('Tabelle und Grafik','Table and image'),rules:[typst.table,typst.image]},
 {chapter:'literatur',title:t('Literatur und Zitate','Bibliography and citations'),rules:[typst.bibliography,typst.reference]},
 {chapter:'vorlagen',title:t('Wiederverwendbare Gestaltung','Reusable styling'),rules:[typst.function,typst.style]},
 {chapter:'abschluss',title:t('Einen Abschlussbericht prüfen','Review a final report'),rules:[typst.heading,typst.math,typst.table,typst.label,typst.reference]},
 {chapter:'programmieren',title:t('Eine abgesicherte Funktion','A guarded function'),rules:[typst.function,typst.assert]},
 {chapter:'module-pakete',title:t('Ein lokales Modul einbinden','Include a local module'),rules:[typst.module]},
 {chapter:'datenberichte',title:t('Einen Datenbericht prüfen','Review a data report'),rules:[typst.data,typst.table]},
 {chapter:'kontext',title:t('Kontext verwenden','Use context'),rules:[typst.context]},
 {chapter:'publizieren',title:t('Einen wissenschaftlichen Bericht prüfen','Review a scholarly report'),rules:[typst.heading,typst.label,typst.reference]},
 {chapter:'praesentationen',title:t('Seiten für Präsentationen','Pages for presentations'),rules:[typst.page]},
 {chapter:'automatisieren',title:t('Buildparameter dokumentieren','Document build parameters'),rules:[typst.inputs,typst.assert]},
 {chapter:'projektpruefung',title:t('Korrigierten Projektstand prüfen','Review the corrected project'),rules:[typst.heading,typst.label,typst.reference]},
];
export const documentTasks:DocumentTask[]=(['latex','typst'] as const).flatMap(format=>(format==='latex'?latexTasks:typstTasks).map(entry=>({id:`${format}-${entry.chapter}`,progressId:`${format}-${entry.chapter}`,format,chapter:entry.chapter,title:entry.title,requirements:entry.rules})));
documentTasks.push({id:'typst-verweis',progressId:'typst-tabellen-grafiken',format:'typst',chapter:'tabellen-grafiken',title:t('Praxisaufgabe: Einen Verweis reparieren','Practice: repair a reference'),requirements:[typst.heading,typst.label,typst.reference,requirement('numbering',t('Überschriftennummerierung konfiguriert','Heading numbering configured'),t('Aktiviere mit set heading(numbering: "1.1") die Nummerierung und prüfe die Ausgabe im offiziellen Editor.','Enable numbering with set heading(numbering: "1.1") and check the output in the official editor.'),/#?\bset\s+heading\s*\(\s*numbering\s*:/)]});
