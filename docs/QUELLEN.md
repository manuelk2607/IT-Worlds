# Quellenprotokoll

Stand der Erweiterung: **23. Oktober 2026**. Das Verzeichnis umfasst 69 Primärquellen: 19 bisherige Quellen und 50 neue Kursbelege. Die ursprünglichen 14 wurden am 20. Oktober gelesen; fünf weitere Quellen und der Docker-Stand wurden am 22. Oktober anhand der unten festgehaltenen Originale gelesen. Die HTML-Zielseiten sind die kanonischen Lesefassungen; abgerufen wurden die explizit verlinkten Quelltexte aus den offiziellen Repositories beziehungsweise die RFC-Originale. Es wurden keine fremden Artikeltexte oder Bilder übernommen. Die Lerntexte sind eigenständige Zusammenfassungen.

Die zehn bisherigen Quizfragen beziehen sich auf Python, SQL, HTML, PyTorch, OpenAPI, UTF-8, DNS-TTL, MFA-Faktoren, Image/Container und Dateirechte. Zehn eigene Editor-Aufgaben üben dieselben Grundlagen mit begrenzten lokalen Lernmodellen. Sie belegen nicht automatisch alle geplanten Profi-Lektionen. OWASP wird ausdrücklich als Ausgabe 2021 verwendet, ohne Behauptung über die aktuelle Rangfolge.

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

## Kursbelege vom 23. Oktober 2026

Die 27 Kapitel und 54 zusätzlichen Fragen verknüpfen die folgenden tatsächlich gelesenen Abschnitte. Dokumentationen, Lehrbuch und Originalarbeiten erfüllen unterschiedliche Zwecke: Framework-Verhalten, mathematische Grundlagen und konkrete Modellverfahren. Repository-Quellen verwenden feste Commits, Papers die angegebene Revision. Fortlaufende Dokumentationen können sich nach dem Lesedatum ändern. Die zentrale, auch auf der Website ausgegebene Registry liegt in `src/data/course-sources.ts`; Kapitel und Quizantworten referenzieren ihre stabilen Schlüssel.

### Dive into Deep Learning · Supervised, unsupervised, self-supervised and reinforcement learning (aiIntroduction)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Supervised, unsupervised, self-supervised and reinforcement learning
- [Dokumentation](https://d2l.ai/chapter_introduction/index.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_introduction/index.md)
- Lesedatum: 2026-10-23

### Metrics and scoring (mlEvaluation)

- Herausgeber: scikit-learn developers
- Version: 1.9.1 · accessed 2026-10-23
- Abschnitt: Classification metrics; precision, recall, F-measures
- [Dokumentation](https://scikit-learn.org/stable/modules/model_evaluation.html) · [Gelesener Beleg](https://scikit-learn.org/stable/modules/model_evaluation.html)
- Lesedatum: 2026-10-23

### Cross-validation (mlValidation)

- Herausgeber: scikit-learn developers
- Version: 1.9.1 · accessed 2026-10-23
- Abschnitt: Train/validation/test; cross-validation
- [Dokumentation](https://scikit-learn.org/stable/modules/cross_validation.html) · [Gelesener Beleg](https://scikit-learn.org/stable/modules/cross_validation.html)
- Lesedatum: 2026-10-23

### Conv2d (torchConv)

- Herausgeber: PyTorch
- Version: 2.14
- Abschnitt: Shape; parameters
- [Dokumentation](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Conv2d.html) · [Gelesener Beleg](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Conv2d.html)
- Lesedatum: 2026-10-23

### LSTM (torchLstm)

- Herausgeber: PyTorch
- Version: 2.14
- Abschnitt: Gates; inputs and outputs
- [Dokumentation](https://docs.pytorch.org/docs/2.14/generated/torch.nn.LSTM.html) · [Gelesener Beleg](https://docs.pytorch.org/docs/2.14/generated/torch.nn.LSTM.html)
- Lesedatum: 2026-10-23

### Reproducibility (torchRepro)

- Herausgeber: PyTorch
- Version: 2.14
- Abschnitt: Reproducibility; controlling sources of randomness
- [Dokumentation](https://docs.pytorch.org/docs/2.14/notes/randomness.html) · [Gelesener Beleg](https://docs.pytorch.org/docs/2.14/notes/randomness.html)
- Lesedatum: 2026-10-23

### Automatic Mixed Precision (torchAmp)

- Herausgeber: PyTorch
- Version: 2.14
- Abschnitt: Autocasting; gradient scaling
- [Dokumentation](https://docs.pytorch.org/docs/2.14/amp.html) · [Gelesener Beleg](https://docs.pytorch.org/docs/2.14/amp.html)
- Lesedatum: 2026-10-23

### Dropout (torchDropout)

- Herausgeber: PyTorch
- Version: 2.14
- Abschnitt: Training and evaluation behaviour
- [Dokumentation](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Dropout.html) · [Gelesener Beleg](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Dropout.html)
- Lesedatum: 2026-10-23

### Transfer Learning for Computer Vision (torchTransfer)

- Herausgeber: PyTorch · Sasank Chilamkurthy
- Version: Tutorial updated 2025-01-27
- Abschnitt: Fine-tuning; fixed feature extractor
- [Dokumentation](https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html) · [Gelesener Beleg](https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html)
- Lesedatum: 2026-10-23

### Deep Residual Learning for Image Recognition (resnetPaper)

- Herausgeber: He et al. · arXiv
- Version: arXiv:1512.03385v1
- Abschnitt: 3.2 · Identity mapping by shortcuts
- [Dokumentation](https://arxiv.org/abs/1512.03385v1) · [Gelesener Beleg](https://arxiv.org/html/1512.03385v1)
- Lesedatum: 2026-10-23

### Supervised Fine-Tuning (llmTraining)

- Herausgeber: Hugging Face
- Version: Living course · accessed 2026-10-23
- Abschnitt: Supervised Fine-Tuning
- [Dokumentation](https://huggingface.co/learn/llm-course/chapter11/1) · [Gelesener Beleg](https://huggingface.co/learn/llm-course/chapter11/1)
- Lesedatum: 2026-10-23

### Direct Preference Optimization (llmPreferences)

- Herausgeber: Rafailov et al. · arXiv
- Version: arXiv:2305.18290v3
- Abschnitt: Abstract
- [Dokumentation](https://arxiv.org/abs/2305.18290v3) · [Gelesener Beleg](https://arxiv.org/abs/2305.18290v3)
- Lesedatum: 2026-10-23

### LLM01:2025 Prompt Injection (owaspLlm)

- Herausgeber: OWASP Gen AI Security Project
- Version: 2025 edition
- Abschnitt: Prevention and mitigation strategies
- [Dokumentation](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) · [Gelesener Beleg](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- Lesedatum: 2026-10-23

### User’s Guide for the amsmath Package (amsmathGuide)

- Herausgeber: American Mathematical Society / LaTeX Project
- Version: Guide 2.1 · revised 2020-02-18
- Abschnitt: 3.7 · Alignment building blocks; 5 · Operator names
- [Dokumentation](https://www.latex-project.org/help/documentation/amsldoc.pdf) · [Gelesener Beleg](https://www.latex-project.org/help/documentation/amsldoc.pdf)
- Lesedatum: 2026-10-23

### Learn LaTeX · More definitions; optional arguments (latexMacros)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: More definitions; optional arguments
- [Dokumentation](https://www.learnlatex.org/en/more-06) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/more-06.md)
- Lesedatum: 2026-10-23

### longtable (latexLongtable)

- Herausgeber: LaTeX Project / CTAN
- Version: 4.27 · 2026-01-28
- Abschnitt: Tables across page boundaries
- [Dokumentation](https://ctan.org/pkg/longtable) · [Gelesener Beleg](https://ctan.org/pkg/longtable)
- Lesedatum: 2026-10-23

### Hypertext marks in LaTeX (hyperrefGuide)

- Herausgeber: LaTeX3 Project
- Version: 7.01s · 2026-10-09
- Abschnitt: Implicit behavior; package loading order
- [Dokumentation](https://tug.ctan.org/macros/latex/contrib/hyperref/doc/hyperref-doc.html) · [Gelesener Beleg](https://tug.ctan.org/macros/latex/contrib/hyperref/doc/hyperref-doc.html)
- Lesedatum: 2026-10-23

### The LaTeX Tagged PDF Project (latexAccessibility)

- Herausgeber: LaTeX Project
- Version: Project status accessed 2026-10-23
- Abschnitt: Guidelines for accessible PDF; package compatibility
- [Dokumentation](https://latex3.github.io/tagging-project/) · [Gelesener Beleg](https://latex3.github.io/tagging-project/)
- Lesedatum: 2026-10-23

### Learn LaTeX · Working with LaTeX (latexSetup)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Working with LaTeX
- [Dokumentation](https://www.learnlatex.org/en/lesson-02) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-02.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Document structure (latexSyntax)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Document structure
- [Dokumentation](https://www.learnlatex.org/en/lesson-03) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-03.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Logical structure (latexStructure)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Logical structure
- [Dokumentation](https://www.learnlatex.org/en/lesson-04) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-04.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Extending LaTeX; defining commands (latexPackages)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Extending LaTeX; defining commands
- [Dokumentation](https://www.learnlatex.org/en/lesson-06) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-06.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Using graphics; floating figures (latexGraphics)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Using graphics; floating figures
- [Dokumentation](https://www.learnlatex.org/en/lesson-07) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-07.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Tables; column types; booktabs (latexTables)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Tables; column types; booktabs
- [Dokumentation](https://www.learnlatex.org/en/lesson-08) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-08.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Cross-referencing; label and ref (latexReferences)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Cross-referencing; label and ref
- [Dokumentation](https://www.learnlatex.org/en/lesson-09) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-09.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Mathematics; amsmath; fonts (latexMath)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Mathematics; amsmath; fonts
- [Dokumentation](https://www.learnlatex.org/en/lesson-10) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-10.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Citations and references; biblatex and Biber (latexBibliography)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Citations and references; biblatex and Biber
- [Dokumentation](https://www.learnlatex.org/en/lesson-12) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-12.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Structuring longer documents; input and include (latexProjects)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Structuring longer documents; input and include
- [Dokumentation](https://www.learnlatex.org/en/lesson-13) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-13.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Fonts and Unicode engines (latexFonts)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Fonts and Unicode engines
- [Dokumentation](https://www.learnlatex.org/en/lesson-14) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-14.md)
- Lesedatum: 2026-10-23

### Learn LaTeX · Dealing with errors (latexErrors)

- Herausgeber: Learn LaTeX / LaTeX Project contributors
- Version: Commit b254d6ea14b8f97f55ef7bd1edc592526e96f560
- Abschnitt: Dealing with errors
- [Dokumentation](https://www.learnlatex.org/en/lesson-15) · [Gelesener Beleg](https://raw.githubusercontent.com/learnlatex/learnlatex.github.io/b254d6ea14b8f97f55ef7bd1edc592526e96f560/en/lesson-15.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Scalars, vectors, matrices; dot products; matrix multiplication (aiAlgebra)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Scalars, vectors, matrices; dot products; matrix multiplication
- [Dokumentation](https://d2l.ai/chapter_preliminaries/linear-algebra.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_preliminaries/linear-algebra.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Gradients; chain rule (aiCalculus)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Gradients; chain rule
- [Dokumentation](https://d2l.ai/chapter_preliminaries/calculus.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_preliminaries/calculus.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Conditional probability; Bayes; expectations (aiProbability)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Conditional probability; Bayes; expectations
- [Dokumentation](https://d2l.ai/chapter_preliminaries/probability.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_preliminaries/probability.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Linear regression; loss; stochastic gradient descent (aiRegression)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Linear regression; loss; stochastic gradient descent
- [Dokumentation](https://d2l.ai/chapter_linear-regression/linear-regression.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_linear-regression/linear-regression.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Hidden layers; activation functions (aiMlp)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Hidden layers; activation functions
- [Dokumentation](https://d2l.ai/chapter_multilayer-perceptrons/mlp.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_multilayer-perceptrons/mlp.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Forward and backward propagation; computational graphs (aiBackprop)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Forward and backward propagation; computational graphs
- [Dokumentation](https://d2l.ai/chapter_multilayer-perceptrons/backprop.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_multilayer-perceptrons/backprop.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Cross-correlation; learning a kernel (aiCnn)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Cross-correlation; learning a kernel
- [Dokumentation](https://d2l.ai/chapter_convolutional-neural-networks/conv-layer.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_convolutional-neural-networks/conv-layer.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Recurrent neural networks with hidden states (aiRnn)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Recurrent neural networks with hidden states
- [Dokumentation](https://d2l.ai/chapter_recurrent-neural-networks/rnn.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_recurrent-neural-networks/rnn.md)
- Lesedatum: 2026-10-23

### Dive into Deep Learning · Adam algorithm; moment estimates and bias correction (aiAdam)

- Herausgeber: Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola
- Version: Commit 23d7a5aecceee57d1292c56e90cce307f183bb0a
- Abschnitt: Adam algorithm; moment estimates and bias correction
- [Dokumentation](https://d2l.ai/chapter_optimization/adam.html) · [Gelesener Beleg](https://raw.githubusercontent.com/d2l-ai/d2l-en/23d7a5aecceee57d1292c56e90cce307f183bb0a/chapter_optimization/adam.md)
- Lesedatum: 2026-10-23

### Optimizing Model Parameters (aiTraining)

- Herausgeber: PyTorch
- Version: Commit c8ccbbf7fcb8cb71adda1b957bd6bab50e29c2e6
- Abschnitt: Hyperparameters; loss; optimizer; full implementation
- [Dokumentation](https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html) · [Gelesener Beleg](https://raw.githubusercontent.com/pytorch/tutorials/c8ccbbf7fcb8cb71adda1b957bd6bab50e29c2e6/beginner_source/basics/optimization_tutorial.py)
- Lesedatum: 2026-10-23

### Common pitfalls and recommended practices (mlPipeline)

- Herausgeber: scikit-learn developers
- Version: Commit 289c4d5cfa1b5c74c2c03420ed809c499ddf7287
- Abschnitt: Inconsistent preprocessing; data leakage; randomness
- [Dokumentation](https://scikit-learn.org/stable/common_pitfalls.html) · [Gelesener Beleg](https://raw.githubusercontent.com/scikit-learn/scikit-learn/289c4d5cfa1b5c74c2c03420ed809c499ddf7287/doc/common_pitfalls.rst)
- Lesedatum: 2026-10-23

### Attention Is All You Need (transformerPaper)

- Herausgeber: Vaswani et al. · arXiv
- Version: arXiv:1706.03762v7
- Abschnitt: 3 · Model architecture; scaled dot-product attention; masks
- [Dokumentation](https://arxiv.org/abs/1706.03762v7) · [Gelesener Beleg](https://arxiv.org/html/1706.03762v7)
- Lesedatum: 2026-10-23

### Decoupled Weight Decay Regularization (adamwPaper)

- Herausgeber: Loshchilov & Hutter · arXiv
- Version: arXiv:1711.05101v3
- Abschnitt: Abstract
- [Dokumentation](https://arxiv.org/abs/1711.05101v3) · [Gelesener Beleg](https://arxiv.org/abs/1711.05101v3)
- Lesedatum: 2026-10-23

### LoRA: Low-Rank Adaptation of Large Language Models (loraPaper)

- Herausgeber: Hu et al. · arXiv
- Version: arXiv:2106.09685v2
- Abschnitt: Abstract
- [Dokumentation](https://arxiv.org/abs/2106.09685v2) · [Gelesener Beleg](https://arxiv.org/abs/2106.09685v2)
- Lesedatum: 2026-10-23

### Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (ragPaper)

- Herausgeber: Lewis et al. · arXiv
- Version: arXiv:2005.11401v4
- Abschnitt: Abstract
- [Dokumentation](https://arxiv.org/abs/2005.11401v4) · [Gelesener Beleg](https://arxiv.org/abs/2005.11401v4)
- Lesedatum: 2026-10-23

### Auto-Encoding Variational Bayes (vaePaper)

- Herausgeber: Kingma & Welling · arXiv
- Version: arXiv:1312.6114v11
- Abschnitt: 2–3 · Variational bound; reparameterization
- [Dokumentation](https://arxiv.org/abs/1312.6114v11) · [Gelesener Beleg](https://arxiv.org/html/1312.6114v11)
- Lesedatum: 2026-10-23

### Generative Adversarial Networks (ganPaper)

- Herausgeber: Goodfellow et al. · arXiv
- Version: arXiv:1406.2661v1
- Abschnitt: Abstract
- [Dokumentation](https://arxiv.org/abs/1406.2661v1) · [Gelesener Beleg](https://arxiv.org/abs/1406.2661v1)
- Lesedatum: 2026-10-23

### Denoising Diffusion Probabilistic Models (diffusionPaper)

- Herausgeber: Ho, Jain & Abbeel · arXiv
- Version: arXiv:2006.11239v2
- Abschnitt: 2–3 · Forward and reverse process; noise prediction
- [Dokumentation](https://arxiv.org/abs/2006.11239v2) · [Gelesener Beleg](https://arxiv.org/html/2006.11239v2)
- Lesedatum: 2026-10-23

### Text Generation Inference with LLMs (llmInference)

- Herausgeber: Hugging Face
- Version: Living course · accessed 2026-10-23
- Abschnitt: Prefill; decode; sampling; performance metrics
- [Dokumentation](https://huggingface.co/learn/llm-course/chapter1/8) · [Gelesener Beleg](https://huggingface.co/learn/llm-course/chapter1/8)
- Lesedatum: 2026-10-23

### Bias and limitations (llmLimits)

- Herausgeber: Hugging Face
- Version: Living course · accessed 2026-10-23
- Abschnitt: Bias and limitations
- [Dokumentation](https://huggingface.co/learn/llm-course/chapter1/9) · [Gelesener Beleg](https://huggingface.co/learn/llm-course/chapter1/9)
- Lesedatum: 2026-10-23
