import {guidedLearningPaths} from './learning-paths.ts';
import { additionalEnglishLessons, additionalSourceDescriptions, additionalEnglishQuestions } from './expansion.en.ts';
import { topics as originalTopics, sources as originalSources, questions as originalQuestions, levels as originalLevels, type Topic, type Lesson, type SourceId } from './content.ts';

type TopicText = Pick<Topic, 'title' | 'short' | 'description' | 'tags' | 'prerequisites' | 'curriculum'> & { lesson?: Omit<Lesson, 'sources'>; subareas?: Topic['subareas'] };
const text: Record<string, TopicText> = {
  programmiersprachen: {
    title: 'Programming languages', short: 'From your first line to thoughtful code.',
    description: 'Learn to break problems into small steps and express solutions in code. Python and TypeScript have their own course sequences; Java, C/C++, Go and Rust extend the future language map. A complementary section covers LaTeX, Typst and Markdown for documents and typesetting.',
    tags: ['Python', 'TypeScript', 'LaTeX'], prerequisites: 'Curiosity is enough to get started. Further lessons build on variables, functions and basic data structures.',
    curriculum: {
      einstieg: ['Variables & arithmetic operators', 'Conditions, loops & functions', 'First steps with Python and TypeScript', 'Structuring documents: Markdown, LaTeX & Typst'],
      vertiefung: ['Data structures & algorithms', 'Type systems, error handling & tests', 'Comparing Java, C/C++, Go & Rust', 'Typesetting: equations, cross-references & bibliographies'],
      profi: ['Concurrency & memory models', 'Compilers, runtimes & profiling', 'Software architecture & design patterns', 'Document workflows: LaTeX macros, Typst functions & templates'],
    },
    subareas: [{ title: 'Markup & typesetting languages', description: 'LaTeX prepares documents for typesetting. Typst combines markup and typesetting with functions and scripting. Markdown is a plain-text format for structured documents. Here, these languages complement programming with document structure and publishing. LaTeX and Markdown have their own course sequences; Typst lessons remain planned.', languages: ['LaTeX', 'Typst', 'Markdown'], sources: ['latex', 'typst', 'markdown'] }],
    lesson: { title: 'How does Python calculate?', goal: 'You can distinguish /, // and % using a simple example.', paragraphs: ['Python can calculate directly with numbers. Whole numbers such as 17 have the type int. Dividing these numbers with / returns a floating-point number (float).', 'The // operator gives the quotient rounded down; % gives the remainder. For positive integers, think of it as “How many times does this number fit, and what is left over?” This example uses positive integers.'], code: '17 / 3   # 5.666666666666667\n17 // 3  # 5\n17 % 3   # 2', language: 'Python 3.14', takeaway: 'Division, the quotient rounded down and the remainder are three different operations.' },
  },
  datenbanken: {
    title: 'Databases', short: 'Organise data. Find the right answers.',
    description: 'Understand how data is modelled, stored and queried. The planned route leads from a first SQL query to transactions, distributed databases and informed architectural decisions.',
    tags: ['SQL', 'PostgreSQL', 'Data models'], prerequisites: 'Familiarity with tables is enough to start. Further lessons assume you know SELECT, keys and relationships.',
    curriculum: { einstieg: ['Tables, rows & data types', 'SELECT & WHERE', 'Keys & relationships'], vertiefung: ['JOINs, aggregations & normalisation', 'Transactions & indexes', 'Relational databases and NoSQL'], profi: ['Query plans & performance', 'Isolation, replication & consistency', 'Backups, recovery & data architecture'] },
    lesson: { title: 'Select specific data with SQL', goal: 'You recognise what SELECT, FROM and WHERE do.', paragraphs: ['A SELECT query reads data from tables. The desired columns follow SELECT; FROM names the table. WHERE lets you specify a condition for the returned rows.', 'In this original example, an imaginary courses table contains the columns title and level. The query returns only the titles of rows whose level is Beginner. This is an illustration; the website does not execute it.'], code: "SELECT title\nFROM courses\nWHERE level = 'Beginner';", language: 'SQL · PostgreSQL', takeaway: 'The column list follows SELECT; WHERE restricts the rows.' },
  },
  'website-bauen': {
    title: 'Build a website', short: 'From an idea to your own place on the web.',
    description: 'Build an accessible website step by step. Get to know HTML, CSS and TypeScript, connect interfaces to data and develop an understanding of performance and web design.',
    tags: ['HTML & CSS', 'TypeScript', 'Accessibility'], prerequisites: 'HTML requires no programming knowledge. TypeScript basics are helpful when you move on to interactive interfaces.',
    curriculum: { einstieg: ['HTML: structure content', 'CSS: layouts & responsive design', 'TypeScript: first interactions'], vertiefung: ['Semantic HTML & accessibility', 'Components, forms & API connections', 'Git, hosting & publishing'], profi: ['Rendering strategies & web performance', 'Design systems & automated tests', 'Web security & scalable frontends'] },
    lesson: { title: 'HTML gives content structure', goal: 'You can mark up a heading and a paragraph with HTML.', paragraphs: ['HTML stands for HyperText Markup Language. It is a markup language used to structure the content of a web page. An element often consists of an opening tag, content and a closing tag.', 'In this example, h1 marks a top-level heading. The p element marks a paragraph. Not every HTML element has a closing tag; these two do.'], code: '<h1>Hello, IT world!</h1>\n<p>This is where my learning journey begins.</p>', language: 'HTML', takeaway: 'HTML describes the structure and meaning of your content.' },
  },
  'ki-neuronale-netze': {
    title: 'AI & neural networks', short: 'Understand what is behind the models.',
    description: 'Explore how AI, machine learning and neural networks relate. The course connects Python and mathematical foundations to models, transformers, generative AI, evaluation and a critical view of limitations and risks.',
    tags: ['Machine learning', 'PyTorch', 'Models'], prerequisites: 'Python classes and functions are helpful for the PyTorch example. Planned introductory lessons will first explain the terminology and necessary mathematics.',
    curriculum: { einstieg: ['Understanding AI, machine learning & deep learning', 'Data, vectors & the training principle', 'A neural network as a model of layers'], vertiefung: ['Training, gradients & backpropagation', 'Training, validation & test data', 'Overfitting, metrics & model comparison'], profi: ['Transformers & model architectures', 'Evaluation, robustness & bias', 'Inference, MLOps & responsible use'] },
    lesson: { title: 'Build a network from modules', goal: 'You can name the role of nn.Module in the PyTorch tutorial.', paragraphs: ['The official PyTorch tutorial describes a neural network as a composition of modules and layers. Its example model is a subclass of nn.Module.', 'Layers are created in __init__. The forward method describes operations on the input data. The shortened structural example below defines only one linear layer; it does not train a model or demonstrate prediction quality.'], code: 'from torch import nn\n\nclass TinyNetwork(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.layer = nn.Linear(3, 1)\n\n    def forward(self, x):\n        return self.layer(x)', language: 'Python · PyTorch', takeaway: 'nn.Module is the foundation of the PyTorch model shown here. An architecture alone is not a trained model.' },
  },
  apis: {
    title: 'APIs & interfaces', short: 'Connect applications. Open up possibilities.',
    description: 'Discover how applications work together through interfaces. Move from HTTP and JSON to reliable contracts, authentication and robust API design.',
    tags: ['HTTP', 'REST', 'OpenAPI'], prerequisites: 'A basic understanding of web pages and clients/servers helps. Building your own API clients then requires a programming language.',
    curriculum: { einstieg: ['Interfaces, clients & servers', 'HTTP requests, responses & JSON', 'Describe APIs with OpenAPI'], vertiefung: ['REST, GraphQL & webhooks', 'Authentication, errors & pagination', 'API contracts & integration tests'], profi: ['Versioning & backwards compatibility', 'Idempotency, rate limits & reliability', 'API security & distributed systems'] },
    lesson: { title: 'What does OpenAPI describe?', goal: 'You can distinguish an API description from its implementation.', paragraphs: ['The OpenAPI Specification defines a standardised, language-independent way to describe HTTP APIs. People and tools can understand the capabilities of an interface without knowing its source code.', 'A description can document paths, operations, parameters and responses, for example. It does not replace the application that actually processes requests. OpenAPI is also not synonymous with every kind of API.'], takeaway: 'An API contract describes the interface. The implementation carries out its functions.' },
  },
  'it-grundlagen': {
    title: 'IT fundamentals', short: 'A solid foundation for every direction.', description: 'Start with the building blocks: data, hardware, software and logical thinking. This area will provide background for the other topics.', tags: ['Bits & bytes', 'Hardware', 'Data'], prerequisites: 'No prior knowledge required. This area is planned as a starting point for the whole platform.',
    curriculum: { einstieg: ['Bits, bytes & number systems', 'Hardware, software & files', 'Logical thinking & first algorithms'], vertiefung: ['Data representation & character encoding', 'Processors, memory & input/output', 'Complexity & abstraction'], profi: ['Computer architecture & memory hierarchy', 'Floating-point numbers & numerical limits', 'System design & technical trade-offs'] },
  },
  netzwerke: {
    title: 'Internet & networks', short: 'Discover the connections behind the web.', description: 'Follow a request and understand how devices communicate. The course connects IP and DNS with transport, TLS, IPv6, routing and verifiable responses.', tags: ['IP & DNS', 'HTTP', 'Routing'], prerequisites: 'No networking knowledge is needed to start. Advanced topics assume familiarity with layered models and basic protocols.',
    curriculum: { einstieg: ['Clients/servers, IP addresses & ports', 'DNS, HTTP & HTTPS', 'Understand your home network'], vertiefung: ['TCP, UDP & routing', 'Subnets & network diagnostics', 'TLS, proxies & caching'], profi: ['HTTP/2, HTTP/3 & protocol analysis', 'Load balancing & resilience', 'Network design & observability'] },
  },
  'it-sicherheit': {
    title: 'IT security', short: 'Recognise risks. Protect systems thoughtfully.', description: 'Learn to consider security from the start. The planned route moves from account protection and phishing to secure development and systematic risk analysis.', tags: ['Privacy', 'OWASP', 'Secure coding'], prerequisites: 'Everyday knowledge is enough to start. Secure coding builds on programming, HTTP and databases.',
    curriculum: { einstieg: ['Passwords, MFA & phishing', 'Security goals & privacy', 'Handling data safely'], vertiefung: ['Injection & safe input handling', 'Authentication & permissions', 'Understanding encryption'], profi: ['Threat modelling & security architecture', 'Security testing in your own test systems', 'Incident response & supply-chain security'] },
  },
  'cloud-devops': {
    title: 'Cloud & DevOps', short: 'Turn your project into a reliable service.', description: 'Connect development and operations. Planned lessons provide a clear route from a first deployment and containers to automated, observable systems.', tags: ['Docker', 'CI/CD', 'Deployment'], prerequisites: 'Command-line experience and a small project of your own help you get started. Further lessons assume Git and networking basics.',
    curriculum: { einstieg: ['Hosting, servers & cloud terminology', 'Git & first deployments', 'Get to know images & containers'], vertiefung: ['CI/CD & infrastructure as code', 'Container networking & configuration', 'Logs, metrics & monitoring'], profi: ['Orchestration & platform architecture', 'SLOs, resilience & recovery', 'Costs, security & operating models'] },
  },
  betriebssysteme: {
    title: 'Operating systems & Linux', short: 'Understand the system beneath your applications.', description: 'Explore processes, files, permissions and the command line. Two courses connect practical Linux skills with traceable operating-system concepts.', tags: ['Linux', 'Shell', 'Processes'], prerequisites: 'No Linux experience is needed to start. Advanced systems topics build on programming and computer fundamentals.',
    curriculum: { einstieg: ['Operating systems, kernels & applications', 'Files & first shell commands', 'Users, groups & permissions'], vertiefung: ['Processes, services & package management', 'Shell scripts & automation', 'File systems & system diagnostics'], profi: ['Memory management & scheduling', 'System calls & isolation', 'Kernel concepts & performance analysis'] },
  },
};
export const topics: Topic[] = originalTopics.map(topic => {
  const base = text[topic.id];
  const translation = base && { ...base, lesson: additionalEnglishLessons[topic.id] ?? base.lesson };
  if (!translation) throw new Error(`Missing English topic: ${topic.id}`);
  return { ...topic, ...translation, lesson: translation.lesson && topic.lesson ? { ...translation.lesson, sources: topic.lesson.sources } : undefined };
});
const sourceDescriptions: Partial<Record<SourceId, string>> = {
  ...additionalSourceDescriptions,
  python: 'Numbers, arithmetic operators and variables in the official Python tutorial.',
  postgres: 'SELECT, column selection and filtering rows with WHERE.', html: 'HTML as a markup language and the parts of an HTML element.',
  pytorch: 'Build neural networks from modules: nn.Module, layers and forward.', openapi: 'The language-independent standard for describing HTTP APIs.',
  http: 'The meaning of HTTP methods and the precise definition of safe methods.', owasp: 'Separate data from commands; parameterised interfaces against injection. Historical edition; no claim about the latest ranking.',
  docker: additionalSourceDescriptions.docker, linux: 'Official introduction to the Linux kernel and further documentation.',
  git: 'Git’s snapshot model, local operations and version control.', typescript: 'An introduction to TypeScript, static type checking and the JavaScript runtime.',
  latex: 'LaTeX as a document-preparation and typesetting system, including equations, cross-references and bibliographies.',
  typst: 'A markup-based typesetting system with functions and integrated scripting; examples of headings, equations and layout rules.',
  markdown: 'Markdown as a plain-text format for structured documents and the precise CommonMark syntax.',
};
const versionTranslations: Record<string, string> = { 'Fortlaufende Dokumentation': 'Continuously updated documentation', 'Fortlaufendes Tutorial': 'Continuously updated tutorial', 'RFC 9110 · Juni 2022': 'RFC 9110 · June 2022', 'Top 10 · Ausgabe 2021': 'Top 10 · 2021 edition', 'Kernel-Dokumentation · fortlaufend': 'Kernel documentation · continuously updated', 'Pro Git · 2. Auflage': 'Pro Git · second edition', 'Fortlaufendes Handbook': 'Continuously updated handbook', 'Fortlaufende Projekteinstiegsseite': 'Continuously updated project introduction', 'Fortlaufende Projektbeschreibung': 'Continuously updated project description', 'CommonMark 0.31.2 · 28. Januar 2024': 'CommonMark 0.31.2 · 28 January 2024' };
export const sources = Object.fromEntries(Object.entries(originalSources).map(([id, source]) => [id, { ...source, description: sourceDescriptions[id as SourceId] ?? source.description, version: versionTranslations[source.version] ?? source.version }])) as typeof originalSources;
const quizText = [
  { prompt: 'What is the value of 17 // 3 in Python 3.14?', options: [ ['5', 'Correct. // returns the quotient rounded down. 3 fits completely into 17 five times.'], ['5.666666666666667', 'That would be the result of 17 / 3. Here, // gives the integer quotient 5.'], ['2', '2 is the remainder of 17 % 3. The question asked for the quotient of 17 // 3, which is 5.'] ] },
  { prompt: 'Which part of a SELECT query restricts the returned rows using a condition?', options: [ ['FROM', 'FROM names the table. The condition for returned rows is specified in WHERE.'], ['WHERE', 'Correct. WHERE contains a condition; only rows for which it is true are returned.'], ['The column list after SELECT', 'The column list determines the output columns. WHERE filters rows.'] ] },
  { prompt: 'According to the MDN introduction, what does HTML do?', options: [ ['Run database queries', 'HTML does not run database queries. It marks up content and structures web pages.'], ['Structure the content of a web page', 'Correct. HTML is a markup language that describes the structure of content to the browser.'], ['Encrypt network connections', 'HTML does not encrypt connections. Its role is to mark up and structure content.'] ] },
  { prompt: 'Which base class does the neural network in the PyTorch tutorial inherit from?', options: [ ['DataLoader', 'The model shown inherits from nn.Module, not DataLoader.'], ['nn.Module', 'Correct. The NeuralNetwork class inherits from nn.Module and describes its computation in forward.'], ['nn.Softmax', 'Softmax is applied to the model’s output in the tutorial. The network itself inherits from nn.Module.'] ] },
  { prompt: 'What is the purpose of the OpenAPI Specification 3.1.1?', options: [ ['Describe HTTP APIs in a standardised, language-independent way', 'Correct. OpenAPI describes the capabilities of an HTTP API without assuming its implementation language.'], ['Automatically operate an API server', 'The specification describes the interface. It does not operate a server or replace an implementation.'], ['Model databases exclusively', 'OpenAPI describes HTTP APIs. It is not a specification exclusively for database models.'] ] },
];
quizText.push(...additionalEnglishQuestions);
import { courseQuestions, courseLearningPaths } from './courses.ts';
export const questions = [...originalQuestions.filter(question => !question.course).map((question, index) => ({ ...question, prompt: quizText[index].prompt, options: quizText[index].options.map(([text, explanation]) => ({ text, explanation })) })), ...courseQuestions('en')];
export const paths = [...guidedLearningPaths('en'), ...courseLearningPaths('en')];
export const levels = originalLevels.map((level, index) => ({ ...level, name: ['Beginner', 'Intermediate', 'Advanced'][index], description: ['Understand the terminology. Take your first steps.', 'Connect ideas. Build independently.', 'Weigh architectures. Question systems.'][index] }));
