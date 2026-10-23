import { text as t, option as o, type Course } from './course-types.ts';
import { chapter, question as q } from './course-types.ts';

export const document = (body: string, packages = '') => String.raw`\documentclass[a4paper,11pt]{article}
\usepackage[T1]{fontenc}
\usepackage[english]{babel}
${packages}
\begin{document}
${body}
\end{document}`;

export const latexCourse: Course = {
  id: 'latex', topic: 'programmiersprachen', slug: 'latex',
  title: t('LaTeX · Dokumente systematisch setzen', 'LaTeX · typeset documents systematically'),
  description: t('Vom ersten kompilierbaren Dokument über Mathematik, Tabellen und Literatur bis zu eigenen Befehlen und einem mehrteiligen wissenschaftlichen Bericht.', 'From your first compilable document through mathematics, tables and references to custom commands and a multi-file scientific report.'),
  prerequisites: t('Keine LaTeX-Vorkenntnisse erforderlich. Du brauchst einen Texteditor und eine TeX-Distribution oder einen Online-Editor mit LaTeX-Compiler. Beispiele verwenden pdfLaTeX, sofern nicht anders angegeben.', 'No prior LaTeX knowledge required. You need a text editor and TeX distribution or an online editor with a LaTeX compiler. Examples use pdfLaTeX unless stated otherwise.'),
  chapters: [
    chapter('einrichtung', t('1 · Einrichtung und erstes PDF', '1 · Setup and first PDF'), 'einstieg',
      [t('Editor, Distribution und Engine unterscheiden und ein Dokument kompilieren.', 'Distinguish editor, distribution and engine and compile a document.')], [
        { title: t('Vom Quelltext zum Satz', 'From source to typeset output'), paragraphs: [
          t('LaTeX beschreibt Dokumentstruktur und Textsatz. Anders als ein allgemeines Python-Programm steht hier ein gesetztes Dokument im Mittelpunkt. Markdown bietet leichte Dokumentauszeichnung; Typst und LaTeX besitzen weitergehende Satzfunktionen. Alle gehören auf dieser Website zum Unterbereich Auszeichnungs- & Satzsprachen, nicht zu einer zusätzlichen Hauptwelt.', 'LaTeX describes document structure and typesetting. Unlike a general Python program, its focus is a typeset document. Markdown provides lightweight document markup; Typst and LaTeX offer more extensive typesetting features. On this site all belong to the markup and typesetting subarea, not an additional main world.'),
          t('Die Distribution liefert Programme, Pakete und Schriften: etwa TeX Live, unter macOS MacTeX, alternativ MiKTeX. Der Editor bearbeitet .tex-Dateien; die Engine verarbeitet sie. Ein Editor allein installiert nicht automatisch einen Compiler. Online-Editoren können beides bündeln. Speichere den Quelltext als UTF-8.', 'The distribution supplies programs, packages and fonts: for example TeX Live, MacTeX on macOS, or MiKTeX. The editor edits .tex files; the engine processes them. An editor alone does not automatically install a compiler. Online editors can bundle both. Save source as UTF-8.')
        ] },
        { title: t('Ein vollständiges Minimaldokument', 'A complete minimal document'), paragraphs: [
          t('Speichere den Code als main.tex. Wähle pdfLaTeX im Editor oder starte pdflatex -halt-on-error main.tex im Projektordner. main.pdf ist das Ergebnis, main.log das Diagnoseprotokoll. Hilfsdateien wie .aux unterstützen spätere Verweise. Für deutsche Silbentrennung ändere die babel-Option english zu ngerman.', 'Save this as main.tex. Select pdfLaTeX in the editor or run pdflatex -halt-on-error main.tex in the project directory. main.pdf is the result, main.log the diagnostic log. Auxiliary files such as .aux support later references. For German hyphenation change babel’s english option to ngerman.')
        ], language: 'LaTeX', code: document(String.raw`\section{My first document}
A sentence with \emph{emphasis}.
A second sentence in the same paragraph.`) }
      ], t('Kompiliere das Dokument, ändere den Abschnittstitel und baue erneut. Benenne die Datei mit der eigentlichen Textquelle.', 'Compile the document, change its section title and rebuild. Identify the file containing the actual text source.'),
      t('main.tex enthält die bearbeitbare Quelle. main.pdf wird daraus erzeugt. Bei „pdflatex not found“ prüfst du Distribution und PATH; das ist noch kein Fehler im Dokument.', 'main.tex contains the editable source. main.pdf is generated from it. For “pdflatex not found”, check the distribution and PATH; this is not yet an error in the document.'), ['latexSetup', 'latexSyntax', 'latexErrors', 'latex', 'typst', 'markdown'], [
        q(t('Was fehlt, wenn ein Editor installiert ist, aber pdflatex nicht gefunden wird?', 'What is missing when an editor is installed but pdflatex cannot be found?'), 'latexErrors', 1, [o('Immer eine schließende Klammer', 'Always a closing brace', 'Der Quelltext wurde noch gar nicht verarbeitet.', 'The source has not been processed yet.'), o('Eine erreichbare TeX-Installation beziehungsweise korrekter PATH', 'An accessible TeX installation or correct PATH', 'Das Betriebssystem muss das Compilerprogramm finden.', 'The operating system must find the compiler executable.'), o('Zwingend ein Account auf dieser Website', 'Necessarily an account on this site', 'LaTeX lässt sich unabhängig vom Account verwenden.', 'LaTeX can be used independently of an account.')]),
        q(t('Welche Datei bearbeitest du als Dokumentquelle?', 'Which file do you edit as document source?'), 'latexSetup', 0, [o('main.tex', 'main.tex', 'Das ist der Textquellcode.', 'This is the text source.'), o('main.pdf', 'main.pdf', 'Das ist die erzeugte Ausgabe.', 'This is the generated output.'), o('main.log', 'main.log', 'Darin stehen Diagnosemeldungen.', 'It contains diagnostics.')])
      ]),
    chapter('syntax', t('2 · Syntax, Gruppen und Umgebungen', '2 · Syntax, groups and environments'), 'einstieg',
      [t('Befehle, Argumente und Umgebungen sicher lesen und Sonderzeichen setzen.', 'Read commands, arguments and environments and typeset special characters.')], [
        { title: t('Die Bausteine', 'The building blocks'), paragraphs: [
          t('Ein Befehl beginnt gewöhnlich mit einem Backslash. Geschweifte Klammern begrenzen Argumente oder Gruppen; eckige Klammern kennzeichnen häufig optionale Argumente. Umgebungen haben einen passenden begin-/end-Namen und müssen korrekt verschachtelt sein. Die Präambel vor begin{document} enthält Klasse, Pakete und gemeinsame Einstellungen.', 'A command normally starts with a backslash. Braces delimit arguments or groups; square brackets often mark optional arguments. Environments have matching begin/end names and must be nested correctly. The preamble before begin{document} contains the class, packages and shared settings.'),
          t('Eine Leerzeile beendet einen Absatz. Einzelne Quelltext-Zeilenumbrüche werden normalerweise wie Leerraum behandelt. Prozent startet einen Kommentar bis zum Zeilenende. Zeichen wie %, &, _, # und $ haben besondere Funktionen und müssen als Text entsprechend maskiert werden.', 'A blank line ends a paragraph. Single source line breaks are normally treated as whitespace. Percent starts a comment through the end of the line. Characters such as %, &, _, # and $ have special roles and must be escaped appropriately when used as text.')
        ] },
        { title: t('Text und Syntax trennen', 'Separate text from syntax'), paragraphs: [t('Der Beispieltext zeigt Sonderzeichen, einen neuen Absatz und eine Liste. Verwende doppelte Backslashes nicht als allgemeinen Absatzersatz; sie erzeugen nur einen Zeilenumbruch in geeigneten Kontexten.', 'The example shows special characters, a new paragraph and a list. Do not use double backslashes as a general paragraph substitute; they only create a line break in suitable contexts.')], language: 'LaTeX', code: document(String.raw`A cost of 20\%: project\_one \& project\_two.
% This comment is not typeset.

A new paragraph with \textbf{bold text}.
\begin{itemize}
  \item First item.
  \item Second item with \emph{emphasis}.
\end{itemize}`) }
      ], t('Warum verschwindet nach „20% Rabatt“ der restliche Quelltext dieser Zeile? Korrigiere ihn.', 'Why does the rest of the source line after “20% discount” disappear? Correct it.'),
      t('Das Prozentzeichen beginnt einen Kommentar. Schreibe 20\\% Rabatt. Prüfe zusätzlich, ob das kommentierte Zeilenende versehentlich eine schließende Klammer enthielt.', 'Percent starts a comment. Write 20\\% discount. Also check whether the commented-out end of line accidentally contained a closing brace.'), ['latexSyntax'], [
        q(t('Was erzeugt im normalen Fließtext einen neuen Absatz?', 'What creates a new paragraph in ordinary prose?'), 'latexSyntax', 2, [o('Jeder einzelne Zeilenumbruch im Editor', 'Every single newline in the editor', 'Ein einfacher Umbruch zählt üblicherweise als Leerraum.', 'A single newline normally counts as whitespace.'), o('Ein Prozentzeichen', 'A percent sign', 'Das startet einen Kommentar.', 'It starts a comment.'), o('Eine Leerzeile', 'A blank line', 'Eine Leerzeile trennt Absätze.', 'A blank line separates paragraphs.')]),
        q(t('Was bedeutet ein unmaskiertes % im Quelltext?', 'What does an unescaped % mean in source?'), 'latexSyntax', 0, [o('Kommentar bis zum Zeilenende', 'Comment through the end of the line', 'Für das sichtbare Zeichen wird es maskiert.', 'Escape it to print the character.'), o('Automatisch Prozentrechnung', 'Automatic percentage calculation', 'LaTeX führt hier keine Prozentrechnung aus.', 'LaTeX does not calculate a percentage here.'), o('Beginn einer Tabelle', 'Start of a table', 'Tabellen verwenden eine eigene Umgebung.', 'Tables use their own environment.')])
      ]),
    chapter('struktur', t('3 · Dokumentklasse und Gliederung', '3 · Document class and hierarchy'), 'einstieg',
      [t('Eine logische Hierarchie statt manuell formatierter Überschriften erstellen.', 'Create a logical hierarchy rather than manually formatted headings.')], [
        { title: t('Inhaltliche Bedeutung markieren', 'Mark semantic meaning'), paragraphs: [
          t('Die Dokumentklasse legt grundlegende Konventionen fest. article eignet sich für kürzere Texte mit section und subsection; report und book besitzen zusätzlich chapter. Wähle zuerst die passende Struktur oder die verlangte Verlagsvorlage. Eine große fette Zeile ist technisch noch keine Abschnittsüberschrift.', 'The document class establishes basic conventions. article suits shorter texts with section and subsection; report and book also provide chapter. First choose the appropriate structure or required publisher template. A large bold line is not technically a section heading.'),
          t('LaTeX nummeriert strukturelle Elemente und kann daraus ein Inhaltsverzeichnis erzeugen. Sternvarianten wie section* sind unnummeriert und erscheinen standardmäßig nicht automatisch im Verzeichnis. title und author speichern Metadaten; maketitle setzt den Titelbereich.', 'LaTeX numbers structural elements and can build a table of contents from them. Starred variants such as section* are unnumbered and by default do not automatically appear in the contents. title and author store metadata; maketitle typesets the title block.')
        ] },
        { title: t('Ein Bericht im Kleinen', 'A small report'), paragraphs: [t('Kompiliere mindestens zweimal, bis das Inhaltsverzeichnis aktuell ist. Ergänze Abschnitte in sinnvoller Reihenfolge: Fragestellung, Methode, Ergebnisse, Grenzen. Listen strukturieren parallele Punkte, ersetzen aber keine Erklärung.', 'Compile at least twice until the contents are current. Add sections in a meaningful order: question, method, results, limitations. Lists organise parallel points but do not replace explanation.')], language: 'LaTeX', code: document(String.raw`\title{A Small Experiment}
\author{IT-Worlds}
\date{}
\maketitle
\tableofcontents
\section{Question}
What should the experiment establish?
\subsection{Scope}
We use synthetic data.
\section{Method}
\begin{enumerate}
  \item Define a baseline.
  \item Compare on separate data.
\end{enumerate}`) }
      ], t('Du erhältst bei chapter in einer article-Datei einen undefinierten Befehl. Nenne zwei sinnvolle Lösungen.', 'You get an undefined command for chapter in an article file. Name two sensible solutions.'),
      t('Für einen kurzen Artikel verwende section. Benötigt das Werk tatsächlich Kapitel, wähle report oder book und passe die Hierarchie bewusst an.', 'For a short article use section. If the work genuinely needs chapters, choose report or book and deliberately adapt the hierarchy.'), ['latexStructure', 'latexProjects'], [
        q(t('Welche Gliederungsebene bietet article standardmäßig nicht?', 'Which sectioning level does article not provide by default?'), 'latexStructure', 1, [o('section', 'section', 'Abschnitte gehören zur article-Klasse.', 'Sections belong to the article class.'), o('chapter', 'chapter', 'Dafür kommen etwa report oder book infrage.', 'Use a class such as report or book for chapters.'), o('subsection', 'subsection', 'Unterabschnitte sind vorhanden.', 'Subsections are available.')]),
        q(t('Warum kann das Inhaltsverzeichnis einen weiteren Lauf benötigen?', 'Why can a table of contents require another run?'), 'latexProjects', 2, [o('Weil PDF keine Überschriften unterstützt', 'Because PDF cannot support headings', 'Das ist nicht der Grund.', 'That is not the reason.'), o('Weil jeder Abschnitt manuell eingetragen werden muss', 'Because every section must be entered manually', 'Die Struktur liefert die Einträge automatisch.', 'The structure supplies entries automatically.'), o('Weil Hilfsdateien Informationen zwischen Läufen speichern', 'Because auxiliary files store information between runs', 'Ein weiterer Lauf verarbeitet die aktualisierten Einträge.', 'Another run processes updated entries.')])
      ]),
    chapter('typografie', t('4 · Text, Sprache und Schriften', '4 · Text, language and fonts'), 'einstieg',
      [t('Semantische Hervorhebung und zur Engine passende Schriftwahl verwenden.', 'Use semantic emphasis and font selection appropriate to the engine.')], [
        { title: t('Bedeutung vor Aussehen', 'Meaning before appearance'), paragraphs: [
          t('emph kennzeichnet Hervorhebung; textbf verlangt Fettdruck. Das ist ein Unterschied zwischen Bedeutung und Darstellung. Eine semantische Auszeichnung lässt sich später zentral umgestalten. Manuelle Abstände und Zeilenumbrüche sind kein zuverlässiger Ersatz für Absatz- und Dokumentstruktur.', 'emph marks emphasis; textbf requests bold type. This distinguishes meaning from presentation. Semantic markup can later be restyled centrally. Manual spacing and line breaks are not a reliable substitute for paragraph and document structure.'),
          t('babel konfiguriert unter anderem sprachabhängige Trennung und Bezeichnungen. Verwende ngerman für heutige deutsche Rechtschreibung und english für englischen Text. Ein geschütztes Leerzeichen mit ~ hält etwa eine Bezeichnung und ihre Nummer zusammen.', 'babel configures language-specific hyphenation and labels among other things. Use ngerman for current German spelling and english for English text. A nonbreaking space written ~ keeps a label and its number together.')
        ] },
        { title: t('Engine und Schrift müssen zusammenpassen', 'Engine and font must match'), paragraphs: [
          t('pdfLaTeX verarbeitet moderne UTF-8-Quelltexte, nutzt aber sein traditionelles Schriftmodell. T1 ist für viele lateinische Texte eine passende Schriftkodierung. LuaLaTeX und XeLaTeX können mit fontspec OpenType-Schriften verwenden. Kopiere fontspec daher nicht unverändert in ein pdfLaTeX-Projekt.', 'pdfLaTeX processes modern UTF-8 source but uses its traditional font model. T1 is a suitable font encoding for many Latin-script texts. LuaLaTeX and XeLaTeX can use OpenType fonts through fontspec. Do not copy fontspec unchanged into a pdfLaTeX project.')
        ], language: 'LaTeX', code: String.raw`% Compile with LuaLaTeX or XeLaTeX. Install the lm font package.
\documentclass{article}
\usepackage{fontspec}
\setmainfont{lmroman10-regular.otf}[
  BoldFont=lmroman10-bold.otf,
  ItalicFont=lmroman10-italic.otf,
  BoldItalicFont=lmroman10-bolditalic.otf
]
\usepackage[ngerman,english]{babel}
\begin{document}
An \emph{important} result in Section~1.
\selectlanguage{ngerman}
Ein \textbf{deutscher} Absatz mit Silbentrennung.
\end{document}` }
      ], t('Ein Projekt benötigt OpenType-Schriften. Welche Engine-/Paketkombination wählst du? Warum genügt ein Schriftname allein nicht?', 'A project needs OpenType fonts. Which engine/package combination do you choose? Why is a font name alone insufficient?'),
      t('LuaLaTeX oder XeLaTeX mit fontspec. Die Schrift muss verfügbar sein und die benötigten Zeichen enthalten. Dokumentiere die Engine und Schriftabhängigkeit für andere Bearbeitende.', 'LuaLaTeX or XeLaTeX with fontspec. The font must be available and contain the required glyphs. Document the engine and font dependency for collaborators.'), ['latexStructure', 'latexPackages', 'latexFonts', 'latexReferences'], [
        q(t('Welche Kombination passt für das Beispiel?', 'Which combination fits this example?'), 'latexFonts', 0, [o('LuaLaTeX und fontspec', 'LuaLaTeX and fontspec', 'Diese Engine unterstützt das OpenType-Schriftmodell.', 'This engine supports the OpenType font model.'), o('pdfLaTeX und fontspec unverändert', 'pdfLaTeX and unchanged fontspec', 'fontspec setzt eine Unicode-Engine voraus.', 'fontspec requires a Unicode engine.'), o('Biber als Textsatz-Engine', 'Biber as the typesetting engine', 'Biber verarbeitet Literaturdaten.', 'Biber processes bibliography data.')]),
        q(t('Was ist der Schwerpunkt von emph?', 'What is the purpose of emph?'), 'latexStructure', 1, [o('Eine Abschnittsnummer erzeugen', 'Create a section number', 'Dafür sind Gliederungsbefehle zuständig.', 'Sectioning commands handle that.'), o('Hervorhebung semantisch kennzeichnen', 'Mark emphasis semantically', 'Die Darstellung kann vom Kontext abhängen.', 'Its appearance can depend on context.'), o('Eine Bilddatei laden', 'Load an image file', 'Dafür dient beispielsweise includegraphics.', 'Use a command such as includegraphics for that.')])
      ]),
  ]
};

