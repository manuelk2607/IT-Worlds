# Quellenprotokoll

Stand der Erweiterung: **22. Oktober 2026**. Das Verzeichnis umfasst 19 offizielle Quellen. Die ursprünglichen 14 wurden am 20. Oktober gelesen; fünf weitere Quellen und der Docker-Stand wurden am 22. Oktober anhand der unten festgehaltenen Originale gelesen. Die HTML-Zielseiten sind die kanonischen Lesefassungen; abgerufen wurden die explizit verlinkten Quelltexte aus den offiziellen Repositories beziehungsweise die RFC-Originale. Es wurden keine fremden Artikeltexte oder Bilder übernommen. Die Lerntexte sind eigenständige Zusammenfassungen.

Die zehn Quizfragen beziehen sich auf Python, SQL, HTML, PyTorch, OpenAPI, UTF-8, DNS-TTL, MFA-Faktoren, Image/Container und Dateirechte. Zehn eigene Editor-Aufgaben üben dieselben Grundlagen mit begrenzten lokalen Lernmodellen. Sie belegen nicht automatisch alle geplanten Profi-Lektionen. OWASP wird ausdrücklich als Ausgabe 2021 verwendet, ohne Behauptung über die aktuelle Rangfolge.

Quellenabgleich bedeutet hier: die konkreten Aussagen und Frageantworten mit den gelesenen Abschnitten vergleichen. Ein unabhängiges Fachreview, eine umfassende wissenschaftliche Literaturrecherche und eine erneute Prüfung in einer neuen Cloud-Instanz sind damit nicht behauptet.

Die Prüfsumme dokumentiert die tatsächlich gelesene Datei. Bei fortlaufenden Branch-URLs kann eine spätere Fassung abweichen; die Prüfsumme ist kein Ersatz für ein unveränderliches Archiv.

## Python Software Foundation – An Informal Introduction to Python

- Version/Ausgabe: Python 3.14
- Abschnitt: Numbers
- [Kanonische Dokumentation](https://docs.python.org/3.14/tutorial/introduction.html#numbers)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/python/cpython/3.14/Doc/tutorial/introduction.rst)
- Lesedatum: 2026-10-20
- Zweck: Zahlen, Rechenoperatoren und Variablen im offiziellen Python-Tutorial.
- SHA-256 der gelesenen Datei: `44868375a1505a1d23d2915527fa8941632ccaaf8e6e090d7a3009df73b90d9e`

## PostgreSQL Global Development Group – Querying a Table

- Version/Ausgabe: PostgreSQL 18
- Abschnitt: Tutorial · 2.5
- [Kanonische Dokumentation](https://www.postgresql.org/docs/18/tutorial-select.html)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/postgres/postgres/REL_18_STABLE/doc/src/sgml/query.sgml)
- Lesedatum: 2026-10-20
- Zweck: SELECT, Spaltenauswahl und das Filtern von Zeilen mit WHERE.
- SHA-256 der gelesenen Datei: `a2b20155802ca82f4ae77d84552b2df4f85f0b7491836208809e3a3bfe7b3052`

## MDN Web Docs – Basic HTML syntax

- Version/Ausgabe: Fortlaufende Dokumentation
- Abschnitt: What is HTML?
- [Kanonische Dokumentation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/mdn/content/main/files/en-us/learn_web_development/core/structuring_content/basic_html_syntax/index.md)
- Lesedatum: 2026-10-20
- Zweck: HTML als Auszeichnungssprache und die Bestandteile eines HTML-Elements.
- SHA-256 der gelesenen Datei: `bd5e80fbf1bf33618696da5ff009bd1507d8599e8a424d72b04e8ba62b610236`

## PyTorch – Build the Neural Network

- Version/Ausgabe: Fortlaufendes Tutorial
- Abschnitt: Define the Class
- [Kanonische Dokumentation](https://docs.pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/pytorch/tutorials/main/beginner_source/basics/buildmodel_tutorial.py)
- Lesedatum: 2026-10-20
- Zweck: Neuronale Netze aus Modulen aufbauen: nn.Module, Schichten und forward.
- SHA-256 der gelesenen Datei: `d5c3abf918cd9e23a16497d3e04985e75372f75040ecf8b64721caef96c64e31`

## OpenAPI Initiative – OpenAPI Specification

- Version/Ausgabe: OpenAPI 3.1.1
- Abschnitt: Introduction
- [Kanonische Dokumentation](https://spec.openapis.org/oas/v3.1.1.html#introduction)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/OAI/OpenAPI-Specification/3.1.1/versions/3.1.1.md)
- Lesedatum: 2026-10-20
- Zweck: Der sprachunabhängige Standard zur Beschreibung von HTTP-APIs.
- SHA-256 der gelesenen Datei: `a612d2b72d422925616b2cabfa7acc0419ffaaf4b0eb42bfb11dc9b804f92749`

## IETF · HTTP Working Group – HTTP Semantics

- Version/Ausgabe: RFC 9110 · Juni 2022
- Abschnitt: 9.2.1 · Safe Methods
- [Kanonische Dokumentation](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.1)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/httpwg/http-core/main/rfc9110.xml)
- Lesedatum: 2026-10-20
- Zweck: Die Bedeutung von HTTP-Methoden und die genaue Definition sicherer Methoden.
- SHA-256 der gelesenen Datei: `22797e1c392d3a08cca9dca4d8affd7f3461fe574b333658c97b397627efb4d1`

## OWASP Foundation – A03:2021 – Injection

- Version/Ausgabe: Top 10 · Ausgabe 2021
- Abschnitt: How to Prevent
- [Kanonische Dokumentation](https://owasp.org/Top10/2021/A03_2021-Injection/)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/OWASP/Top10/master/2021/docs/en/A03_2021-Injection.md)
- Lesedatum: 2026-10-20
- Zweck: Daten und Befehle trennen; parametrisierte Schnittstellen gegen Injection. Historische Ausgabe, keine Aussage zur aktuellen Rangfolge.
- SHA-256 der gelesenen Datei: `c660dd06c1d62d634f41607b243708f5bef1d2865d883065e4601332911a0060`

## Docker – What is Docker?

- Version/Ausgabe: Docker Docs · b98c400647c7
- Abschnitt: Docker objects · Images · Containers
- [Kanonische Dokumentation](https://docs.docker.com/get-started/docker-overview/)
- [Tatsächlich gelesener Beleg](https://raw.githubusercontent.com/docker/docs/b98c400647c70f3e2177d513802d5d785aef232e/content/get-started/docker-overview.md)
- Lesedatum: 2026-10-22
- Zweck: Images als Vorlagen, Container als Instanzen sowie ihre beschreibbare Schicht und persistente Speicherung.
- SHA-256 der gelesenen Datei: `9624ef1839c96183b6d71ca5c513c52dc6fa90da78d62e482adba3710a5e7243`

## Linux-Kernel-Projekt – Linux kernel release 6.x

- Version/Ausgabe: Kernel-Dokumentation · fortlaufend
- Abschnitt: What is Linux?
- [Kanonische Dokumentation](https://www.kernel.org/doc/html/latest/admin-guide/README.html)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/torvalds/linux/master/Documentation/admin-guide/README.rst)
- Lesedatum: 2026-10-20
- Zweck: Offizielle Einführung in den Linux-Kernel und weiterführende Dokumentation.
- SHA-256 der gelesenen Datei: `f23b47d66a6bea64044743276b9f94c2d83dc3e4c95fea65cd539cc08e98ebc4`

## Scott Chacon & Ben Straub · Pro Git – Getting Started – What is Git?

- Version/Ausgabe: Pro Git · 2. Auflage
- Abschnitt: Snapshots, Not Differences
- [Kanonische Dokumentation](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/progit/progit2/master/book/01-introduction/sections/what-is-git.asc)
- Lesedatum: 2026-10-20
- Zweck: Das Snapshot-Modell von Git, lokale Operationen und Versionierung.
- SHA-256 der gelesenen Datei: `a839cd52f7038e1bcccc05f6c55c36f71405bc7e416ef6712c4cb8bb7c637d0f`

## Microsoft · TypeScript Handbook – TypeScript for the New Programmer

- Version/Ausgabe: Fortlaufendes Handbook
- Abschnitt: TypeScript: A Static Type Checker
- [Kanonische Dokumentation](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/microsoft/TypeScript-Website/v2/packages/documentation/copy/en/get-started/TS%20for%20the%20New%20Programmer.md)
- Lesedatum: 2026-10-20
- Zweck: Einstieg in TypeScript, statische Typprüfung und das Verhältnis zur JavaScript-Laufzeit.
- SHA-256 der gelesenen Datei: `d928388e246c033933bd863e1d9a938cad1bfe080b9e62e8be29961e1d4e1e6e`

## The LaTeX Project – An introduction to LaTeX

- Version/Ausgabe: Fortlaufende Projekteinstiegsseite
- Abschnitt: An introduction to LaTeX · LaTeX Features
- [Kanonische Dokumentation](https://www.latex-project.org/about/)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/latex3/latex3.github.io/main/about/index.md)
- Lesedatum: 2026-10-20
- Zweck: LaTeX als System zur Dokumentaufbereitung und zum Textsatz, einschließlich Formeln, Querverweisen und Literaturverzeichnissen.
- SHA-256 der gelesenen Datei: `50678bcef075e65733a6c5bdb983a4cca87bb732c65daa6da8183c5ff45ea45c`

## Typst – Typst – README

- Version/Ausgabe: Fortlaufende Projektbeschreibung
- Abschnitt: Introduction · Example
- [Kanonische Dokumentation](https://github.com/typst/typst#readme)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/typst/typst/main/README.md)
- Lesedatum: 2026-10-20
- Zweck: Markup-basiertes Satzsystem mit Funktionen und integriertem Scripting; Beispiele für Überschriften, Formeln und Layoutregeln.
- SHA-256 der gelesenen Datei: `ddaf0de156f6a442c7f831202cd55583614df4cc3cfb4b16e95162c7eb11e653`

## John MacFarlane · CommonMark – CommonMark Spec

- Version/Ausgabe: CommonMark 0.31.2 · 28. Januar 2024
- Abschnitt: Introduction · What is Markdown?
- [Kanonische Dokumentation](https://spec.commonmark.org/0.31.2/#what-is-markdown-)
- [Tatsächlich gelesener Dokumentationsquelltext](https://raw.githubusercontent.com/commonmark/commonmark-spec/0.31.2/spec.txt)
- Lesedatum: 2026-10-20
- Zweck: Markdown als Klartextformat für strukturierte Dokumente und die präzisierte CommonMark-Syntax.
- SHA-256 der gelesenen Datei: `257c41ad946f7a1414a499aca402a1aa8fdac3678532266611348c1cf54f4b80`

## IETF · RFC Editor – UTF-8, a transformation format of ISO 10646

- Version/Ausgabe: RFC 3629 · 2003-11
- Abschnitt: 3 · UTF-8 definition
- [Kanonische Dokumentation](https://www.rfc-editor.org/rfc/rfc3629.html#section-3)
- [Tatsächlich gelesener Beleg](https://www.rfc-editor.org/rfc/rfc3629.txt)
- Lesedatum: 2026-10-22
- Zweck: UTF-8 codiert Unicode-Codepunkte mit einem bis vier Oktetten; ASCII bleibt erhalten.
- SHA-256 der gelesenen Datei: `a2a3a39457d30420c812f87a38cc2b9194832f6982ef17e619de7d816879d6a6`

## MDN Web Docs – TextEncoder: encode() method

- Version/Ausgabe: MDN · ccd1540ad8c5
- Abschnitt: Return value · Examples
- [Kanonische Dokumentation](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode)
- [Tatsächlich gelesener Beleg](https://raw.githubusercontent.com/mdn/content/ccd1540ad8c51242b318bf437dfabe2e5315b3fa/files/en-us/web/api/textencoder/encode/index.md)
- Lesedatum: 2026-10-22
- Zweck: TextEncoder.encode gibt die UTF-8-Bytes einer Zeichenkette als Uint8Array zurück.
- SHA-256 der gelesenen Datei: `1c325db10eca3ed4f4eb04f3a396182216a21b4c150331728fb8b2ddc1a863f7`

## IETF · RFC Editor – Domain names – concepts and facilities

- Version/Ausgabe: RFC 1034 · 1987-11
- Abschnitt: 2.4 · Elements of the DNS; 3.6 · Resource Records
- [Kanonische Dokumentation](https://www.rfc-editor.org/rfc/rfc1034.html#section-3.6)
- [Tatsächlich gelesener Beleg](https://www.rfc-editor.org/rfc/rfc1034.txt)
- Lesedatum: 2026-10-22
- Zweck: DNS-Namensraum, Resolver, autoritative Nameserver sowie Resource Records und TTL. Grundlage, keine vollständige Darstellung späterer Erweiterungen.
- SHA-256 der gelesenen Datei: `d6b10a71441df879cc2817d23f2dad120c8a5f87e74eba1e4ed4b743a76a891a`

## OWASP Foundation – Multifactor Authentication Cheat Sheet

- Version/Ausgabe: OWASP Cheat Sheet · ec35f68a0d06
- Abschnitt: Introduction · Something You Know · Software OTP Tokens
- [Kanonische Dokumentation](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html)
- [Tatsächlich gelesener Beleg](https://raw.githubusercontent.com/OWASP/CheatSheetSeries/ec35f68a0d06fe5279051525c9a9f654b407c1dc/cheatsheets/Multifactor_Authentication_Cheat_Sheet.md)
- Lesedatum: 2026-10-22
- Zweck: Unterschiedliche Authentifizierungsfaktoren, Grenzen von Passwort plus PIN und Risiken von TOTP.
- SHA-256 der gelesenen Datei: `aa0c03c9d10c1facfaef0ace5f61536aab46e2a8ea409cf8527086d0d11132f2`

## GNU Project · Free Software Foundation – File permissions

- Version/Ausgabe: GNU Coreutils 9.7
- Abschnitt: Mode Structure · Setting Permissions · Numeric Modes
- [Kanonische Dokumentation](https://github.com/coreutils/coreutils/blob/v9.7/doc/perm.texi)
- [Tatsächlich gelesener Beleg](https://raw.githubusercontent.com/coreutils/coreutils/v9.7/doc/perm.texi)
- Lesedatum: 2026-10-22
- Zweck: Dateirechte für Eigentümer, Gruppe und andere; symbolische und oktale Schreibweise. Untersucht wurde die festgehaltene Version 9.7.
- SHA-256 der gelesenen Datei: `d70e14a4b8259b81348a5f1b40edb5794bc2f34516541d00253afc07b8d08490`

## Grenzen der Erweiterung

RFC 1034 dient als Grundlage für DNS-Rollen und TTL; spätere Erweiterungen werden damit nicht vollständig erklärt. Die Coreutils-Übung behandelt reguläre Dateien ohne ACLs, Sonderbits oder Verzeichnisregeln. MFA- und Container-JSON sind eigene Lernmodelle, keine echten Konfigurationen. Die Editoren führen weder Python noch SQL, HTML oder Shell-Code aus. Die Beispiele und Prüfer sind eigene Entwicklungen.

Die UTF-8-Beispielbytes und alle zehn Musterlösungen sind automatisiert geprüft. Ein unabhängiges Fachreview steht weiterhin aus.
