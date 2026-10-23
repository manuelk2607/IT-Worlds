import { text as t, option as o, type Chapter } from './course-types.ts';
import { chapter, question as q } from './course-types.ts';
import { document } from './course-latex.ts';

export const latexAdvanced: Chapter[] = [
  chapter('verweise', t('9 · Verweise und stabile Nummerierung', '9 · References and stable numbering'), 'vertiefung',
    [t('Abschnitte, Formeln und Abbildungen ohne manuelle Nummern verknüpfen.', 'Link sections, equations and figures without manual numbers.')], [
      { title: t('Label an das richtige Objekt binden', 'Attach a label to the right object'), paragraphs: [
        t('label merkt sich die zuletzt gesetzte relevante Nummer; ref gibt sie aus. Ein Abschnittslabel gehört hinter den Gliederungsbefehl, ein Formellabel in die nummerierte Formel. Bei figure und table muss label nach caption stehen, weil erst die Beschriftung den richtigen Zähler setzt.', 'label records the most recently established relevant number; ref prints it. Put a section label after its section command and an equation label inside the numbered equation. In figure and table, label must follow caption because the caption establishes the appropriate counter.'),
        t('Präfixe wie sec:, eq: und fig: sind Konventionen für Menschen, keine automatische Typerkennung durch LaTeX. Wähle eindeutige, stabile Schlüssel. Nach Änderungen können mehrere Läufe nötig sein; dauerhaftes ?? deutet auf einen fehlenden oder falsch geschriebenen Schlüssel hin.', 'Prefixes such as sec:, eq: and fig: are human conventions, not automatic type detection by LaTeX. Choose unique, stable keys. Changes may require several runs; persistent ?? can indicate a missing or misspelled key.')
      ] },
      { title: t('Klickbare Verweise', 'Clickable references'), paragraphs: [t('hyperref ergänzt PDF-Verknüpfungen. Lade es bei einfachen Projekten spät in der Präambel und beachte paketabhängige Ausnahmen. eqref aus amsmath setzt die Gleichungsnummer in Klammern. Geschützte Leerzeichen halten Bezeichnung und Nummer zusammen.', 'hyperref adds PDF links. In simple projects load it late in the preamble and observe package-specific exceptions. eqref from amsmath puts the equation number in parentheses. Nonbreaking spaces keep labels and numbers together.')], language: 'LaTeX', code: document(String.raw`\section{Model}\label{sec:model}
\begin{equation}\label{eq:linear}
  \hat y=wx+b
\end{equation}
Section~\ref{sec:model} introduces Equation~\eqref{eq:linear}.`, String.raw`\usepackage{amsmath}
\usepackage[hidelinks]{hyperref}`) }
    ], t('Ein Abbildungsverweis zeigt die letzte Abschnittsnummer. Die Schreibweise stimmt. Welchen Ort prüfst du zuerst?', 'A figure reference shows the last section number. Spelling is correct. Which location do you check first?'),
    t('Prüfe, ob label vor caption steht. Verschiebe es hinter caption innerhalb der figure-Umgebung und kompiliere erneut, bis die Verweise stabil sind.', 'Check whether label precedes caption. Move it after caption inside figure and rebuild until references stabilise.'), ['latexReferences', 'hyperrefGuide'], [
      q(t('Wo steht label bei einer Abbildung?', 'Where should label go for a figure?'), 'latexReferences', 1, [o('Vor caption', 'Before caption', 'Dann kann noch ein vorheriger Zähler aktiv sein.', 'A previous counter may still be active then.'), o('Nach caption innerhalb von figure', 'After caption inside figure', 'Die Beschriftung hat die Abbildungsnummer gesetzt.', 'The caption has established the figure number.'), o('Immer in der Präambel', 'Always in the preamble', 'Dort existiert die Abbildungsnummer noch nicht.', 'The figure number does not yet exist there.')]),
      q(t('Woran erkennt LaTeX den Typ eines Labels?', 'How does LaTeX determine a label’s associated number?'), 'latexReferences', 2, [o('Immer am Präfix fig:', 'Always from the fig: prefix', 'Das Präfix ist nur eine Namenskonvention.', 'The prefix is only a naming convention.'), o('Am Dateinamen des PDFs', 'From the PDF filename', 'Der Dateiname bestimmt keine lokale Objektnummer.', 'The filename determines no local object number.'), o('Am zuletzt gesetzten relevanten Zähler', 'From the most recently established relevant counter', 'Deshalb ist der Platz des label-Befehls entscheidend.', 'That is why label placement matters.')])
    ]),
  chapter('literatur', t('10 · Literatur mit BibLaTeX und Biber', '10 · Bibliographies with BibLaTeX and Biber'), 'vertiefung',
    [t('Literaturdaten von Zitierstil trennen und den vollständigen Build ausführen.', 'Separate bibliography data from citation style and run the complete build.')], [
      { title: t('Daten, Schlüssel und Stil', 'Data, keys and style'), paragraphs: [
        t('Eine .bib-Datei enthält strukturierte Einträge. Der Zitatschlüssel verbindet Text und Daten; er ist keine fertige Quellenangabe. Namen mehrerer Personen werden mit and getrennt. Prüfe Autorenschaft, Titel, Jahr und dauerhafte Kennung gegen die Originalquelle. Ein vorhandener Eintrag belegt nicht automatisch die konkrete Aussage im Text.', 'A .bib file contains structured entries. The citation key links text and data; it is not a formatted reference. Multiple authors are separated with and. Check authorship, title, year and persistent identifier against the original source. Having an entry does not automatically support the specific claim in the text.'),
        t('biblatex steuert Zitate und Verzeichnis im Dokument; Biber verarbeitet die Literaturdaten. Ein üblicher Ablauf ist pdfLaTeX → Biber → pdfLaTeX → pdfLaTeX. Bei main.tex wird biber main aufgerufen. Verwende nicht gleichzeitig einen unpassenden klassischen BibTeX-/natbib-Ablauf; Verlage können einen bestimmten Workflow verlangen.', 'biblatex controls citations and the bibliography in the document; Biber processes bibliographic data. A typical sequence is pdfLaTeX → Biber → pdfLaTeX → pdfLaTeX. For main.tex run biber main. Do not simultaneously use an incompatible classical BibTeX/natbib workflow; publishers may require a particular one.')
      ] },
      { title: t('Ein eigenständiges Zitierbeispiel', 'A self-contained citation example'), paragraphs: [t('filecontents* schreibt hier zur Demonstration die zusätzliche .bib-Datei. In größeren Projekten pflegst du diese als separate Datei. Der gezeigte Datensatz verweist auf das Transformer-Paper; eine Seiten- oder Abschnittsangabe im Text grenzt den Beleg bei Bedarf ein.', 'filecontents* writes the additional .bib file for this demonstration. In larger projects maintain it as a separate file. The entry references the transformer paper; a page or section reference in the text can narrow the evidence where needed.')], language: 'LaTeX', code: String.raw`\begin{filecontents*}{references.bib}
@article{attention2017,
  author = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki
    and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N.
    and Kaiser, Lukasz and Polosukhin, Illia},
  title = {Attention Is All You Need},
  year = {2017},
  eprint = {1706.03762},
  eprinttype = {arxiv}
}
\end{filecontents*}
\documentclass{article}
\usepackage[T1]{fontenc}
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{references.bib}
\begin{document}
\textcite{attention2017} describe a Transformer architecture.
\printbibliography
\end{document}` }
    ], t('Der Zitatschlüssel erscheint, aber das Verzeichnis bleibt leer. Welche drei Dinge prüfst du?', 'The citation key appears but the bibliography stays empty. Which three things do you check?'),
    t('Stimmen Dateiname und addbibresource? Wurde Biber für den richtigen Hauptdateinamen ohne .tex ausgeführt? Wurden danach die erforderlichen LaTeX-Läufe ausgeführt? Lies auch .blg und .log auf konkrete Fehler.', 'Do the filename and addbibresource match? Was Biber run for the correct main filename without .tex? Were the required LaTeX passes run afterwards? Also inspect .blg and .log for specific errors.'), ['latexBibliography'], [
      q(t('Welche Rolle übernimmt Biber?', 'What role does Biber perform?'), 'latexBibliography', 0, [o('Literaturdaten für biblatex verarbeiten', 'Process bibliography data for biblatex', 'Der Textsatz erfolgt weiterhin durch die LaTeX-Engine.', 'Typesetting is still performed by the LaTeX engine.'), o('Alle Textabsätze als PDF rendern', 'Render all prose as PDF', 'Das ist Aufgabe der Engine.', 'That is the engine’s job.'), o('Zitate fachlich verifizieren', 'Verify citations factually', 'Die inhaltliche Belegprüfung bleibt eine eigene Aufgabe.', 'Checking factual support remains a separate task.')]),
      q(t('Wie trennt man mehrere Autoren im .bib-Eintrag?', 'How are multiple authors separated in a .bib entry?'), 'latexBibliography', 2, [o('Nur durch ein beliebiges Komma', 'Only by an arbitrary comma', 'Kommas können zur Namenssyntax einer Person gehören.', 'Commas can belong to one person’s name syntax.'), o('Mit HTML-Zeilenumbrüchen', 'With HTML line breaks', 'Das ist keine BibTeX-Namenssyntax.', 'That is not BibTeX name syntax.'), o('Mit and zwischen den Namen', 'With and between names', 'So erkennt die Literaturverarbeitung mehrere Personen.', 'This lets bibliography processing recognise multiple people.')])
    ]),
  chapter('eigene-befehle', t('11 · Pakete und eigene Abstraktionen', '11 · Packages and custom abstractions'), 'profi',
    [t('Wiederkehrende Bedeutung als Befehle und Umgebungen ausdrücken.', 'Express recurring meaning as commands and environments.')], [
      { title: t('Eine kleine Schnittstelle statt Kopieren', 'A small interface instead of copying'), paragraphs: [
        t('Pakete erweitern Funktionen; lade nur, was das Dokument benötigt, und lies die jeweilige Dokumentation. newcommand definiert einen neuen Befehl und meldet eine Kollision statt eine bestehende Definition still zu überschreiben. renewcommand verändert einen vorhandenen Befehl bewusst. Das vermeidet schwer sichtbare Seiteneffekte.', 'Packages extend functionality; load what the document needs and read the relevant documentation. newcommand defines a new command and reports a collision rather than silently overwriting an existing definition. renewcommand deliberately changes an existing command. This avoids hard-to-see side effects.'),
        t('Argumente werden mit #1, #2 usw. angesprochen. Bei newcommand kann das erste Argument einen optionalen Standardwert erhalten. Eine eigene Umgebung bündelt Beginn und Ende eines wiederkehrenden Blocks. Gruppen begrenzen viele lokale Formatänderungen. Entwirf Namen nach Bedeutung, etwa result, statt nach Farbe oder Schriftgröße.', 'Arguments are referenced with #1, #2 and so on. With newcommand the first argument can have an optional default. A custom environment bundles the beginning and end of a recurring block. Groups limit many local formatting changes. Name abstractions by meaning, such as result, rather than colour or font size.')
      ] },
      { title: t('Optionale Argumente und eine Ergebnisumgebung', 'Optional arguments and a result environment'), paragraphs: [t('Der Befehl metric hat zwei Argumente: eine optionale Bezeichnung mit Standardwert L und ein verpflichtendes Argument. Dadurch lässt sich dieselbe Notation an einer zentralen Stelle ändern. Definiere solche Befehle in der Präambel oder später in einer eigenen .sty-Datei.', 'The metric command has two arguments: an optional label defaulting to L and one required argument. This allows notation to change centrally. Define such commands in the preamble or later in a custom .sty file.')], language: 'LaTeX', code: document(String.raw`\begin{result}
The objective is \(\metric{w}\); the alternative is \(\metric[J]{w}\).
\end{result}`, String.raw`\usepackage{amsmath}
\newcommand{\metric}[2][L]{#1\!\left(#2\right)}
\newenvironment{result}
  {\begin{quote}\textbf{Result.}\ }
  {\end{quote}}`) }
    ], t('Wie unterscheiden sich metric{w} und metric[J]{w}? Warum wäre renewcommand ohne Kenntnis der bestehenden Definition riskant?', 'How do metric{w} and metric[J]{w} differ? Why would renewcommand be risky without understanding the existing definition?'),
    t('Die Ausgaben sind L(w) und J(w). Der optionale Wert überschreibt nur die Bezeichnung. Ein unbedachtes renewcommand kann Paket- oder Klassenfunktionen verändern, von denen andere Stellen abhängen.', 'Outputs are L(w) and J(w). The optional value overrides only the label. Careless renewcommand can change package or class functions on which other parts depend.'), ['latexPackages', 'latexMacros'], [
      q(t('Was bedeutet [2][L] bei der gezeigten newcommand-Definition?', 'What does [2][L] mean in the shown newcommand definition?'), 'latexMacros', 1, [o('Zwei optionale Argumente ohne Standard', 'Two optional arguments without defaults', 'Nur das erste erhält hier einen Standardwert.', 'Only the first gets a default here.'), o('Zwei Argumente, das erste optional mit Standard L', 'Two arguments, the first optional with default L', 'Das zweite bleibt verpflichtend.', 'The second remains required.'), o('Zwei Schriftgrößen', 'Two font sizes', 'Die Angaben beschreiben die Argumentschnittstelle.', 'These specify the argument interface.')]),
      q(t('Warum ist newcommand für einen neuen Namen hilfreich?', 'Why is newcommand helpful for a new name?'), 'latexPackages', 0, [o('Es meldet eine bereits vorhandene Definition.', 'It reports an already existing definition.', 'So wird ein unbeabsichtigtes Überschreiben sichtbar.', 'This exposes accidental overwriting.'), o('Es überschreibt jeden Paketbefehl still.', 'It silently overwrites every package command.', 'Gerade das soll vermieden werden.', 'That is precisely what it avoids.'), o('Es verhindert alle Satzfehler.', 'It prevents all typesetting errors.', 'Die Definition muss weiterhin korrekt sein.', 'The definition must still be correct.')])
    ]),
  chapter('fehlerdiagnose', t('12 · Fehler systematisch eingrenzen', '12 · Diagnose errors systematically'), 'profi',
    [t('Fehler und Warnungen unterscheiden und ein minimales Beispiel herstellen.', 'Distinguish errors from warnings and construct a minimal example.')], [
      { title: t('Die erste Ursache suchen', 'Find the first cause'), paragraphs: [
        t('Lies die erste relevante Fehlermeldung im Log. Spätere Meldungen können Folgefehler sein. Undefined control sequence deutet auf einen unbekannten Befehl: Tippfehler, fehlendes Paket oder ungeeignete Engine sind mögliche Ursachen. Die gemeldete Zeile kann die Verwendung eines fehlerhaft definierten Makros zeigen; die Ursache liegt dann in seiner Definition.', 'Read the first relevant error in the log. Later messages can be consequences. Undefined control sequence indicates an unknown command: a typo, missing package or unsuitable engine are possible causes. The reported line may show use of a badly defined macro; the cause then lies in its definition.'),
        t('Missing $ inserted kann durch mathematische Zeichen im Textmodus entstehen. Klammerfehler verändern, welche Eingabe als Argument gelesen wird. Ein erzeugtes PDF allein beweist daher keinen fehlerfreien Build. Overfull hbox ist dagegen eine Layoutwarnung: Inhalt ragt aus der vorgesehenen Breite.', 'Missing $ inserted can result from mathematical characters in text mode. Brace errors change which input is read as an argument. A generated PDF alone therefore does not prove a clean build. Overfull hbox is instead a layout warning: content exceeds its intended width.')
      ] },
      { title: t('Reproduzierbar verkleinern', 'Reduce reproducibly'), paragraphs: [
        t('Kopiere das Projekt in einen Diagnoseordner, erhalte die ursprünglichen Dateien und reduziere dort Inhalt und Pakete schrittweise. Nach jedem Schritt neu bauen. Ein minimales Beispiel enthält die kleinste Kombination, die den Fehler weiterhin auslöst. Dokumentiere Engine, Paketversionen und den vollständigen ersten Fehler.', 'Copy the project into a diagnostic directory, preserve the originals and gradually reduce content and packages there. Rebuild after each step. A minimal example contains the smallest combination that still reproduces the failure. Document engine, package versions and the complete first error.'),
        t('Der folgende korrigierte Text maskiert den Unterstrich und nutzt einen vorhandenen Fettdruckbefehl. Vergleiche bewusst mit den fehlerhaften Varianten project_one und textbold. Lösche Hilfsdateien nur gezielt, etwa nach einer inkompatiblen Änderung; das ersetzt keine Quelltextkorrektur.', 'The following corrected text escapes the underscore and uses an existing bold command. Deliberately compare with the broken variants project_one and textbold. Remove auxiliary files selectively, for example after an incompatible change; doing so does not replace correcting source.')
      ], language: 'LaTeX', code: document(String.raw`The file is \texttt{project\_one}.
A \textbf{clear result} needs a clean build.`, String.raw`\listfiles`) }
    ], t('Ein PDF existiert, aber das Log enthält Undefined control sequence. Darf der Build als bestanden gelten? Beschreibe den nächsten Schritt.', 'A PDF exists but the log contains Undefined control sequence. Has the build passed? Describe the next step.'),
    t('Nein. Prüfe den unbekannten Befehl und dessen Definition beziehungsweise Paket. Korrigiere die erste Ursache, baue erneut und kontrolliere Fehler sowie relevante Layoutwarnungen.', 'No. Inspect the unknown command and its definition or package. Correct the first cause, rebuild and check errors and relevant layout warnings.'), ['latexErrors'], [
      q(t('Warum beginnt man bei der ersten relevanten Fehlermeldung?', 'Why start with the first relevant error?'), 'latexErrors', 2, [o('Weil spätere Meldungen immer bedeutungslos sind', 'Because later messages are always meaningless', 'Sie können zusätzliche Ursachen haben, aber auch Folgefehler sein.', 'They may have additional causes, but can also be consequences.'), o('Weil nur die letzte PDF-Seite zählt', 'Because only the last PDF page matters', 'Die Ausgabe ersetzt keine Diagnose.', 'Output does not replace diagnosis.'), o('Weil Folgefehler die ursprüngliche Ursache verdecken können', 'Because cascading errors can obscure the original cause', 'Die erste Korrektur kann mehrere spätere Meldungen beseitigen.', 'The first correction can remove several later messages.')]),
      q(t('Was beweist eine vorhandene PDF-Datei?', 'What does an existing PDF file prove?'), 'latexErrors', 1, [o('Dass keine Fehler existieren', 'That no errors exist', 'TeX kann trotz Fehlern eine Ausgabe erzeugen.', 'TeX can produce output despite errors.'), o('Nur, dass eine Ausgabe erzeugt wurde', 'Only that output was generated', 'Log und Darstellung müssen zusätzlich geprüft werden.', 'The log and appearance also require checking.'), o('Dass alle Quellenangaben korrekt sind', 'That all references are factually correct', 'Inhaltliche Belege werden nicht automatisch geprüft.', 'Factual evidence is not checked automatically.')])
    ]),
  chapter('abschlussprojekt', t('13 · Komplexe Dokumente und Abschlussbericht', '13 · Complex documents and final report'), 'profi',
    [t('Ein mehrteiliges Projekt reproduzierbar bauen und seine Abgabequalität prüfen.', 'Build a multi-file project reproducibly and check submission quality.')], [
      { title: t('Hauptdatei, Kapitel und Abhängigkeiten', 'Main file, chapters and dependencies'), paragraphs: [
        t('Die Hauptdatei besitzt Klasse und Präambel. input fügt eine Datei an der aktuellen Stelle ein; include beginnt und beendet mit Seitenwechseln und führt eigene Hilfsdateien. includeonly erlaubt Kapitelteilbauten unter Nutzung vorhandener Verweisdaten. Ein abschließender vollständiger Build bleibt nötig.', 'The main file owns the class and preamble. input inserts a file at the current location; include begins and ends with page breaks and maintains separate auxiliary files. includeonly allows partial chapter builds using existing reference data. A final complete build remains necessary.'),
        t('Trenne Kapitel, Abbildungen, Literatur und gemeinsame Makros in sinnvolle Dateien. Pfade bleiben relativ zum Projekt. Versioniere Quellen und erforderliche Assets, dokumentiere die Engine und den Buildablauf. Verlagsklassen können eigene Regeln für Literatur und Pakete vorgeben; ändere deren Schnittstellen nicht blind.', 'Separate chapters, figures, references and shared macros into sensible files. Keep paths relative to the project. Version sources and required assets, and document the engine and build procedure. Publisher classes can prescribe bibliography and package conventions; do not blindly change their interfaces.')
      ] },
      { title: t('Ein vollständiges Projekt als Ausgangspunkt', 'A complete project as a starting point'), paragraphs: [
        t('Speichere diesen Code als main.tex in einem leeren Projektordner. Die filecontents-Blöcke erzeugen für den ersten Versuch zwei Kapiteldateien; danach bearbeitest du diese separat und entfernst die Erzeugungsblöcke aus main.tex. Kompiliere zweimal. Die Ergebnisse sind ein didaktischer Bericht, keine behaupteten Messungen.', 'Save this code as main.tex in an empty project directory. The filecontents blocks create two chapter files for the first run; afterwards edit them separately and remove the generation blocks from main.tex. Compile twice. The results form a teaching report, not claimed measurements.'),
        t('Für den Abschluss ersetzt du die qualitative Diskussion durch deinen eigenen KI-Modellvergleich mit echten Messwerten und dokumentierten Grenzen. Ergänze Literatur aus Kapitel 10, eine selbst erzeugte Grafik und den Anhang mit Konfiguration. Prüfe zusätzlich Lesereihenfolge, sinnvolle Überschriften und zugängliche Alternativen zu Grafiken; ein visuell gutes PDF ist nicht automatisch barrierefrei.', 'For the final project replace the qualitative discussion with your own AI model comparison using actual measurements and documented limits. Add references from chapter 10, a self-created graphic and an appendix with configuration. Also inspect reading order, meaningful headings and accessible alternatives to graphics; a visually good PDF is not automatically accessible.')
      ], language: 'LaTeX', code: String.raw`\begin{filecontents*}{method.tex}
\chapter{Method}\label{ch:method}
We compare a linear baseline with a nonlinear model.
Data partitions are fixed before model selection.
\begin{equation}\label{eq:loss}
L=\frac{1}{n}\sum_{i=1}^{n}(\hat y_i-y_i)^2.
\end{equation}
\end{filecontents*}
\begin{filecontents*}{discussion.tex}
\chapter{Discussion}
Chapter~\ref{ch:method} defines the protocol.
Equation~\eqref{eq:loss} measures squared prediction error.
No real-world performance is established by this demonstration.
\end{filecontents*}
\documentclass[a4paper,11pt]{report}
\usepackage[T1]{fontenc}
\usepackage[english]{babel}
\usepackage{amsmath}
\usepackage[hidelinks]{hyperref}
\title{A Reproducible Model Comparison}
\author{IT-Worlds}
\date{}
\begin{document}
\maketitle
\tableofcontents
\include{method}
\include{discussion}
\appendix
\chapter{Configuration}
Record the engine, library versions, data split and random seeds.
\end{document}` }
    ], t('Lege einen neuen Ordner nur mit den benötigten Quelldateien an. Baue dort den vollständigen Bericht. Welche Probleme findet dieser Test, die dein bestehender Arbeitsordner verdecken kann?', 'Create a fresh directory containing only required source files. Build the complete report there. Which problems can this expose that the working directory hides?'),
    t('Fehlende Abbildungen, nicht versionierte Kapitel, absolute lokale Pfade, veraltete Hilfsdateien und undokumentierte Schrift-/Paketabhängigkeiten. Prüfe danach Verweise, Inhaltsverzeichnis, Literatur, Seitenränder und Textauswahl im PDF. Halte offene Einschränkungen fest.', 'Missing figures, unversioned chapters, absolute local paths, stale auxiliary files and undocumented font/package dependencies. Then check references, contents, bibliography, margins and text selection in the PDF. Record remaining limitations.'), ['latexProjects', 'latexBibliography', 'latexErrors', 'latexAccessibility'], [
      q(t('Was ist ein wesentlicher Unterschied zwischen input und include?', 'What is a key difference between input and include?'), 'latexProjects', 0, [o('include setzt Seitengrenzen und unterstützt includeonly.', 'include introduces page boundaries and supports includeonly.', 'input fügt Material unmittelbar an der aktuellen Stelle ein.', 'input inserts material directly at the current location.'), o('input funktioniert nur für Bilder.', 'input works only for images.', 'input liest LaTeX-Quelltext.', 'input reads LaTeX source.'), o('include erzeugt automatisch Literaturdaten.', 'include automatically creates bibliography data.', 'Literaturverwaltung ist eine andere Aufgabe.', 'Bibliography management is a different task.')]),
      q(t('Warum ist ein vollständiger Build in einem frischen Ordner sinnvoll?', 'Why is a complete build in a fresh directory useful?'), 'latexProjects', 2, [o('Damit Quelltext nicht mehr nötig ist', 'So source is no longer needed', 'Die Quellen sind gerade die Grundlage des Builds.', 'The source files are precisely the basis of the build.'), o('Damit Verweise absichtlich falsch bleiben', 'So references deliberately stay wrong', 'Verweise sollen vollständig aufgelöst werden.', 'References should be fully resolved.'), o('Um versteckte Abhängigkeiten und fehlende Dateien zu entdecken', 'To detect hidden dependencies and missing files', 'Der Build soll mit den dokumentierten Eingaben reproduzierbar sein.', 'The build should be reproducible from documented inputs.')])
    ]),
];

