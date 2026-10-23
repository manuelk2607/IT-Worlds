import { text as t, option as o, type Chapter } from './course-types.ts';
import { chapter, question as q } from './course-types.ts';
import { document } from './course-latex.ts';

export const latexTechnical: Chapter[] = [
  chapter('mathematik', t('5 · Mathematischer Grundsatz', '5 · Mathematical typesetting basics'), 'einstieg',
    [t('Text- und Mathematikmodus unterscheiden und Formeln lesbar setzen.', 'Distinguish text and math mode and typeset readable formulas.')], [
      { title: t('Inline oder abgesetzt', 'Inline or displayed'), paragraphs: [
        t('Inline-Mathematik mit \\( ... \\) gehört in eine Textzeile; abgesetzte Formeln mit \\[ ... \\] erhalten einen eigenen Block. equation erzeugt zusätzlich eine Nummer. Mathematische Buchstaben werden als Variablen interpretiert. Mehrbuchstabige Funktionsnamen brauchen Operatorbefehle wie sin oder log, sonst sehen sie wie Produkte einzelner Variablen aus.', 'Inline mathematics with \\( ... \\) belongs in a text line; display formulas with \\[ ... \\] receive their own block. equation also produces a number. Mathematical letters are interpreted as variables. Multi-letter function names need operator commands such as sin or log; otherwise they resemble products of individual variables.'),
        t('Unter- und Hochstellungen verwenden _ und ^. Klammern gruppieren mehrteilige Exponenten: x^{12} ist etwas anderes als x^12. Brüche, Wurzeln, Summen und Integrale haben eigene Befehle. Normale Leerzeichen steuern im Mathematikmodus nicht den Abstand wie im Fließtext.', 'Subscripts and superscripts use _ and ^. Braces group multi-part exponents: x^{12} differs from x^12. Fractions, roots, sums and integrals have dedicated commands. Ordinary spaces do not control math spacing as they do in prose.')
      ] },
      { title: t('Die gleiche Formel im Satz und im Quelltext', 'The same formula rendered and in source'), paragraphs: [t('Die Verlustfunktion unten verwendet einen Index und eine Summe. Interpretiere vor dem Setzen jede Variable: n ist die Anzahl der Beispiele; y_i und ŷ_i sind Ziel und Vorhersage. Saubere Notation ersetzt keine Definition.', 'The loss below uses an index and a sum. Interpret every variable before typesetting: n is the number of examples; y_i and ŷ_i are target and prediction. Clean notation does not replace definitions.')], formula: String.raw`L=\frac{1}{n}\sum_{i=1}^{n}(\hat y_i-y_i)^2`, language: 'LaTeX', code: document(String.raw`For \(n\) examples, define
\begin{equation}
  L=\frac{1}{n}\sum_{i=1}^{n}(\hat y_i-y_i)^2.
\end{equation}
The function \(\sin(x)\) differs from a product of variables.`, String.raw`\usepackage{amsmath}`) }
    ], t('Setze x hoch 12 und den Bruch (a+b)/c. Welche Klammern erscheinen in der Ausgabe, welche gruppieren nur Quelltext?', 'Typeset x to the power 12 and the fraction (a+b)/c. Which braces appear in output and which only group source?'),
    t('x^{12} und \\frac{a+b}{c}. Die geschweiften Argumentklammern erscheinen nicht. Sichtbare geschweifte Klammern benötigen eigene maskierte Zeichen.', 'x^{12} and \\frac{a+b}{c}. Braces delimiting arguments do not appear. Visible braces need their own escaped characters.'), ['latexMath'], [
      q(t('Welche Schreibweise setzt die gesamte Zahl 12 hoch?', 'Which notation raises the entire number 12?'), 'latexMath', 2, [o('x^12', 'x^12', 'Ohne Gruppierung gehört nur das nächste Token zum Exponenten.', 'Without grouping only the next token belongs to the exponent.'), o('x_12', 'x_12', 'Das beginnt eine Unterstellung.', 'This starts a subscript.'), o('x^{12}', 'x^{12}', 'Die Gruppe enthält beide Ziffern.', 'The group contains both digits.')]),
      q(t('Was unterscheidet equation von der unnummerierten abgesetzten Formel?', 'What distinguishes equation from an unnumbered display?'), 'latexMath', 0, [o('Eine automatisch erzeugte Nummer', 'An automatically generated number', 'Die Nummer kann später referenziert werden.', 'The number can later be referenced.'), o('Es ist kein Mathematikmodus', 'It is not math mode', 'equation ist eine Mathematikumgebung.', 'equation is a math environment.'), o('Es erlaubt beliebige Leerabsätze', 'It allows arbitrary blank paragraphs', 'Leerabsätze gehören nicht in diese Mathematikumgebung.', 'Blank paragraphs do not belong in this math environment.')])
    ]),
  chapter('mathematik-fortgeschritten', t('6 · Ausrichtungen, Matrizen und Definitionen', '6 · Alignments, matrices and definitions'), 'vertiefung',
    [t('Mehrzeilige Herleitungen und Fallunterscheidungen mit amsmath setzen.', 'Typeset multi-line derivations and piecewise definitions with amsmath.')], [
      { title: t('Eine Herleitung bekommt Struktur', 'Give a derivation structure'), paragraphs: [
        t('amsmath liefert align für mehrere ausgerichtete Zeilen. Ein & markiert die Ausrichtungsposition, ein doppelter Backslash beendet eine Zeile. align* unterdrückt Nummern. Für eine gemeinsame Nummer mehrerer Zeilen lässt sich aligned in equation einsetzen. Verschachtele align nicht noch einmal in equation.', 'amsmath provides align for multiple aligned lines. An & marks the alignment position and a double backslash ends a line. align* suppresses numbering. To give multiple lines one shared number, place aligned inside equation. Do not nest align inside equation.'),
        t('pmatrix setzt eine Matrix mit runden Klammern; cases eine Fallunterscheidung. text bindet lesbare Wörter in Mathematik ein. Eigene Operatornamen werden mit DeclareMathOperator definiert, statt mit zufälligen Abständen nachgebaut zu werden. So bleibt die Notation konsistent.', 'pmatrix sets a matrix with round brackets; cases a piecewise definition. text inserts readable words into mathematics. Define custom operator names with DeclareMathOperator rather than improvising spacing. This keeps notation consistent.')
      ] },
      { title: t('Ableitung, Matrix und ReLU', 'Derivative, matrix and ReLU'), paragraphs: [t('Die Schritte begründen die Kettenregel aus dem KI-Kurs. Das Ausrichtungszeichen steht vor dem Gleichheitszeichen. Achte darauf, dass Matrixzeilen gleich viele Spalten enthalten.', 'These steps illustrate the chain rule from the AI course. The alignment marker precedes the equals sign. Ensure matrix rows contain the same number of columns.')], language: 'LaTeX', code: document(String.raw`\begin{align}
  L(w) &= \tfrac12(wx-y)^2,\\
  L'(w) &= (wx-y)x.
\end{align}
\[
  A=\begin{pmatrix}1&2\\3&4\end{pmatrix},
  \qquad
  \operatorname{ReLU}(z)=
  \begin{cases}0 & \text{if }z<0,\\ z & \text{otherwise.}\end{cases}
\]`, String.raw`\usepackage{amsmath}`) }
    ], t('Ändere die zweizeilige Herleitung so, dass sie nur eine gemeinsame Gleichungsnummer erhält.', 'Change the two-line derivation to have only one shared equation number.'),
    t('Ersetze align durch equation mit einer inneren aligned-Umgebung. Die &-Positionen und Zeilenumbrüche bleiben innerhalb von aligned. Eine einzelne label-Markierung in equation referenziert die gesamte Herleitung.', 'Replace align with equation containing aligned. Keep the & markers and line breaks inside aligned. One label inside equation references the whole derivation.'), ['latexMath', 'amsmathGuide'], [
      q(t('Wozu dient & in align?', 'What does & do in align?'), 'latexMath', 1, [o('Es beendet das Dokument.', 'It ends the document.', 'Dafür ist end{document} zuständig.', 'end{document} handles that.'), o('Es markiert die Ausrichtung.', 'It marks alignment.', 'So können Gleichheitszeichen untereinander stehen.', 'This can align equals signs vertically.'), o('Es beginnt einen Kommentar.', 'It starts a comment.', 'Kommentare beginnen mit %.', 'Comments start with %.')]),
      q(t('Welche Kombination gibt mehreren ausgerichteten Zeilen eine gemeinsame Nummer?', 'Which combination gives several aligned lines one shared number?'), 'amsmathGuide', 2, [o('align in equation', 'align inside equation', 'align ist selbst eine äußere Mathematikumgebung.', 'align is itself an outer math environment.'), o('Mehrere unabhängige equation-Umgebungen', 'Several independent equation environments', 'Diese erhalten jeweils eigene Nummern.', 'These each receive their own number.'), o('aligned in equation', 'aligned inside equation', 'aligned gruppiert die Zeilen innerhalb einer nummerierten Gleichung.', 'aligned groups the lines within one numbered equation.')])
    ]),
  chapter('tabellen', t('7 · Tabellen lesbar gestalten', '7 · Designing readable tables'), 'vertiefung',
    [t('Spaltentypen, Umbrüche und die Trennung von Tabelle und Gleitobjekt verstehen.', 'Understand column types, wrapping and the distinction between tabular data and floats.')], [
      { title: t('tabular ist der Inhalt, table der Rahmen', 'tabular is the content, table the container'), paragraphs: [
        t('tabular legt Spalten und Zellen fest. l, c und r richten links, mittig und rechts aus; diese Spalten umbrechen lange Texte nicht automatisch. p{Breite} setzt einen Absatz in fester Breite. & trennt Zellen, ein doppelter Backslash beendet Zeilen. table ist dagegen ein Gleitobjekt, das Beschriftung und Platzierung organisiert.', 'tabular defines columns and cells. l, c and r align left, centre and right; these columns do not automatically wrap long text. p{width} sets a paragraph at fixed width. & separates cells and a double backslash ends rows. table is instead a float organising caption and placement.'),
        t('booktabs bietet top-, mid- und bottomrule für sparsame horizontale Linien. Einheiten gehören in die Überschrift. Runde Werte konsistent und vermeide eine Genauigkeit, die deine Messung nicht trägt. Für seitenlange Tabellen reicht ein normales tabular nicht; dafür ist etwa longtable vorgesehen.', 'booktabs supplies top, middle and bottom rules for restrained horizontal lines. Put units in headings. Round values consistently and avoid precision unsupported by measurements. An ordinary tabular is insufficient for tables spanning pages; longtable is designed for that use.')
      ] },
      { title: t('Ein Ergebnisvergleich', 'A results comparison'), paragraphs: [t('Die Zahlen sind ausdrücklich didaktische Beispieldaten, keine gemessenen Modellresultate. Beschriftung und label sind so angeordnet, dass Verweise später die Tabellennummer erhalten.', 'These numbers are explicitly teaching examples, not measured model results. Caption and label are placed so later references receive the table number.')], language: 'LaTeX', code: document(String.raw`\begin{table}[tbp]
\centering
\caption{Illustrative values, not measurements}
\label{tab:example}
\begin{tabular}{p{0.4\linewidth}rr}
\toprule
Model & Accuracy & Time (s)\\
\midrule
Baseline & 0.50 & 0.1\\
Small network & 0.90 & 2.0\\
\bottomrule
\end{tabular}
\end{table}
See Table~\ref{tab:example}.`, String.raw`\usepackage{array}
\usepackage{booktabs}`) }
    ], t('Eine lange Beschreibung läuft in einer l-Spalte über den Rand. Löse das strukturell, ohne die gesamte Tabelle extrem zu verkleinern.', 'A long description overflows in an l column. Solve this structurally without shrinking the entire table excessively.'),
    t('Verwende eine p-Spalte mit sinnvoller Breite oder eine flexible tabularx-Spalte. Prüfe danach verbleibende Spaltenbreiten und Zellabstände. Kürze unnötige Inhalte statt die Schrift unlesbar zu skalieren.', 'Use a p column of suitable width or a flexible tabularx column. Then check remaining column widths and cell spacing. Remove unnecessary content instead of scaling text until unreadable.'), ['latexTables', 'latexReferences', 'latexLongtable', 'latexGraphics'], [
      q(t('Welche Spalte erlaubt Absatzumbruch bei fester Breite?', 'Which column allows paragraph wrapping at fixed width?'), 'latexTables', 0, [o('p{5cm}', 'p{5cm}', 'Sie setzt Absätze innerhalb der angegebenen Breite.', 'It sets paragraphs within the specified width.'), o('l', 'l', 'Diese Spalte hat natürliche Breite ohne automatischen Absatzumbruch.', 'This column has natural width without automatic paragraph wrapping.'), o('r', 'r', 'Rechtsausrichtung löst das Umbruchproblem nicht.', 'Right alignment does not solve wrapping.')]),
      q(t('Was unterscheidet table von tabular?', 'What distinguishes table from tabular?'), 'latexGraphics', 1, [o('table ist immer eine Matrix.', 'table is always a matrix.', 'Eine mathematische Matrix ist etwas anderes.', 'A mathematical matrix is different.'), o('table organisiert ein Gleitobjekt; tabular die Zellen.', 'table organises a float; tabular organises cells.', 'Beide können gemeinsam verwendet werden.', 'They can be used together.'), o('tabular benötigt zwingend table.', 'tabular necessarily requires table.', 'tabular kann auch direkt im Text stehen.', 'tabular can also appear directly in the text.')])
    ]),
  chapter('grafiken', t('8 · Grafiken und Gleitobjekte', '8 · Graphics and floats'), 'vertiefung',
    [t('Bilder relativ zur verfügbaren Breite skalieren und Platzierungshinweise verstehen.', 'Scale images relative to available width and understand placement hints.')], [
      { title: t('Bilddatei und Platzierung', 'Image file and placement'), paragraphs: [
        t('graphicx stellt includegraphics bereit. PDF eignet sich für Vektorgrafiken, PNG für verlustfreie Rasterbilder, JPEG häufig für Fotos. Nutze Pfade relativ zum Projekt, etwa images/plot.pdf. linewidth bezeichnet die aktuell verfügbare Zeilenbreite und kann in Listen oder Spalten kleiner als textwidth sein.', 'graphicx provides includegraphics. PDF suits vector graphics, PNG lossless raster images and JPEG often photographs. Use paths relative to the project, such as images/plot.pdf. linewidth is the currently available line width and can be smaller than textwidth inside lists or columns.'),
        t('figure erlaubt dem Satzsystem, Bild und Beschriftung passend zu platzieren. h, t, b und p erlauben hier, oben, unten und eine eigene Gleitobjektseite; sie sind Möglichkeiten, keine exakten Koordinaten. Der Text muss deshalb mit einer Nummer auf die Grafik verweisen, nicht mit „direkt unten“.', 'figure lets the typesetter place image and caption appropriately. h, t, b and p permit here, top, bottom and a float page; these are options, not exact coordinates. Refer to the graphic by number rather than saying “directly below”.')
      ] },
      { title: t('Ein ohne zusätzliche Bilddatei kompilierbarer Test', 'A compilable test without an additional image file'), paragraphs: [t('Der Code verwendet die mit vielen TeX-Installationen verfügbare Beispieldatei example-image-a.pdf aus mwe. Installiere dieses Paket, falls die Datei fehlt. Im eigenen Projekt ersetzt du den Dateinamen durch deine exportierte Grafik; die Beschriftung beschreibt deren Aussage.', 'This code uses example-image-a.pdf from mwe, available in many TeX installations. Install that package if the file is missing. In your own project replace the filename with your exported graphic; the caption describes its message.')], language: 'LaTeX', code: document(String.raw`\begin{figure}[tbp]
  \centering
  \includegraphics[width=0.65\linewidth]{example-image-a}
  \caption{A demonstration image for checking the layout}
  \label{fig:layout}
\end{figure}
Figure~\ref{fig:layout} demonstrates relative scaling.`, String.raw`\usepackage{graphicx}
\usepackage{mwe}`) }
    ], t('Warum kann ein Bild mit width=\\textwidth innerhalb einer schmalen Spalte überstehen? Welche Einstellung passt dort besser?', 'Why can an image with width=\\textwidth overflow inside a narrow column? Which setting is more appropriate?'),
    t('textwidth beschreibt die gesamte Textbreite, nicht zwingend die lokale Spalte. width=\\linewidth orientiert sich an der aktuellen Umgebung. Nur eine Größenrichtung vorzugeben erhält normalerweise das Seitenverhältnis.', 'textwidth describes the overall text width, not necessarily the local column. width=\\linewidth follows the current environment. Specifying only one dimension normally preserves aspect ratio.'), ['latexGraphics', 'latexReferences'], [
      q(t('Bedeutet [h] eine garantierte exakte Bildposition?', 'Does [h] guarantee an exact image position?'), 'latexGraphics', 2, [o('Ja, auf jedem Dokumentlayout', 'Yes, in every document layout', 'Gleitobjekte werden nach Platzierungsregeln gesetzt.', 'Floats follow placement rules.'), o('Ja, es ignoriert den Seitenrand', 'Yes, it ignores page boundaries', 'Die verfügbaren Flächen bleiben relevant.', 'Available space remains relevant.'), o('Nein, es ist ein Platzierungswunsch.', 'No, it is a placement request.', 'Weitere zulässige Positionen geben dem Satzsystem Spielraum.', 'Additional permitted positions give the typesetter flexibility.')]),
      q(t('Welche Breite ist in verschachtelten Umgebungen meist die passende Bezugsgröße?', 'Which width is usually the appropriate reference in nested environments?'), 'latexGraphics', 0, [o('linewidth', 'linewidth', 'Sie folgt der aktuell verfügbaren Zeilenbreite.', 'It follows the currently available line width.'), o('Immer paperwidth', 'Always paperwidth', 'Die Papierbreite ignoriert Ränder und Spalten.', 'Paper width ignores margins and columns.'), o('Immer 100 cm', 'Always 100 cm', 'Eine feste übergroße Breite passt nicht zum Layout.', 'An oversized fixed width does not fit the layout.')])
    ]),
];

