import type { Lesson } from './content.ts';

export const additionalEnglishLessons: Record<string, Omit<Lesson, 'sources'>> = {
  'it-grundlagen': {
    title: 'Why a character can need several bytes', curriculumIndex: 0,
    goal: 'Distinguish text from its UTF-8 encoding and count the bytes in an example.',
    paragraphs: [
      'An encoding determines how text is stored as numbers. UTF-8 uses one to four octets for a Unicode code point. An octet contains eight bits. ASCII characters fit in one octet each; other code points need more space.',
      'A needs one byte in UTF-8, while the euro sign € needs three. The string A€ therefore needs four bytes. We are counting the encoded data, excluding file headers and extra application storage.',
      'TextEncoder turns a string into UTF-8 bytes. The length of the returned Uint8Array counts those bytes. This exercise uses that encoding; other encodings can produce different byte sequences.',
    ],
    code: 'const bytes: Uint8Array = new TextEncoder().encode("A€");\nconsole.log([...bytes]); // [65, 226, 130, 172]\nconsole.log(bytes.length); // 4', language: 'TypeScript · Web API',
    takeaway: 'Text length and storage size are different measurements. The encoding determines the bytes.',
  },
  netzwerke: {
    title: 'How DNS connects names and addresses', curriculumIndex: 1,
    goal: 'Distinguish a resolver from an authoritative name server and interpret a TTL.',
    paragraphs: [
      'DNS organises names in a distributed namespace. A name can have several resource records. An Internet-class A record contains an IPv4 address; other types describe other information. DNS does not simply assign one address to every name.',
      'A resolver obtains information for a query. It can use a cached response or ask name servers. An authoritative name server knows the data for a particular zone. These are different responsibilities.',
      'A resource record’s TTL is expressed in seconds and governs its cache lifetime in the basic model. With a TTL of 300 and 120 seconds already elapsed, 180 seconds remain. This is a calculation using the basic model, not a complete description of modern DNS caches and extensions.',
    ],
    takeaway: 'Names, record types and cache lifetimes belong together. A DNS query does not transfer a web page.',
  },
  'it-sicherheit': {
    title: 'Why a password plus a PIN is not MFA', curriculumIndex: 0,
    goal: 'Classify authentication methods as knowledge, possession or biometric factors.',
    paragraphs: [
      'Multifactor authentication requires evidence from at least two different categories. Examples are knowledge such as a password, possession such as an OTP token, and biometric characteristics. Two prompts alone do not make two factors.',
      'A password and a PIN are both knowledge. A password combined with an independent TOTP token instead combines knowledge and possession. Time-based codes from an authenticator app are one example of such a token.',
      'Factors should be independent. TOTP codes can still be phished, so MFA does not make every login invulnerable. Losing and recovering a second factor also needs planning. The exercise only compares factors; it does not configure a real login.',
    ],
    takeaway: 'What matters is different, independent factors, not the number of input fields.',
  },
  'cloud-devops': {
    title: 'Tell images and containers apart', curriculumIndex: 2,
    goal: 'Distinguish an application template from its running instances.',
    paragraphs: [
      'A Docker image is a read-only template used to create containers. It can contain an application and the components it needs. A container is a runnable instance of an image; the same template can create multiple containers.',
      'A started container has a writable layer. Changes there do not simply change the underlying image. Removing the container loses state that was not stored persistently. Stopping and removing a container are different actions.',
      'Data that must outlive a container needs appropriate persistent storage. An image therefore does not replace a database backup. This introduction explains the model; it deploys nothing and starts no containers on your device.',
    ],
    takeaway: 'Image = template, container = instance. Plan the lifetime of your data explicitly.',
  },
  betriebssysteme: {
    title: 'Understand file permissions with 640', curriculumIndex: 2,
    goal: 'Read basic file permissions and translate between symbolic and octal notation.',
    paragraphs: [
      'Traditional file permissions distinguish the owner, group and others. Each category has read (r), write (w) and execute (x) permissions. Here we consider a regular file, excluding directories, special bits and extra ACL rules.',
      'In octal notation, r, w and x have the values 4, 2 and 1. Add the values within a category: 6 means read and write, 4 means read only, and 0 means none of these permissions. Thus 640 is rw-r-----: owner read/write, group read, others no access through these bits.',
      'chmod sets these mode bits. The symbolic expression u=rw,g=r,o= states the three categories explicitly. The exercise models this small subset without changing files on your device. A system’s complete access rules extend beyond this basic model.',
    ],
    code: 'chmod 640 notes.txt\n# The same basic permissions:\nchmod u=rw,g=r,o= notes.txt', language: 'Shell · GNU Coreutils 9.7',
    takeaway: 'The three digits describe different user categories, not three consecutive actions.',
  },
};

export const additionalSourceDescriptions = {
  utf8: 'UTF-8 encodes Unicode code points using one to four octets while preserving ASCII.',
  encoder: 'TextEncoder.encode returns a string’s UTF-8 bytes as a Uint8Array.',
  dns: 'DNS namespaces, resolvers, authoritative servers, resource records and TTL. A foundation, not a complete account of later extensions.',
  mfa: 'Different authentication factors, the limitations of password plus PIN, and TOTP risks.',
  coreutils: 'File permissions for owner, group and others, in symbolic and octal notation. The examined source is fixed at version 9.7.',
  docker: 'Images as templates, containers as instances, their writable layer and persistent storage.',
};

export const additionalEnglishQuestions = [
  {prompt:'How many bytes does A€ need in UTF-8, excluding extra metadata?',options:[
    ['2','Two visible characters do not mean two bytes. A needs one byte and € needs three.'],
    ['4','Correct: one byte for A plus three for € makes four bytes.'],
    ['8','UTF-8 does not reserve four bytes for every character. Here it is one plus three.'],
  ]},
  {prompt:'Which unit is used for a DNS resource record’s TTL?',options:[
    ['Seconds','Correct. In the basic DNS model, the TTL governs how long a record may remain cached.'],
    ['Bytes','Bytes measure data size. A TTL describes a duration.'],
    ['Number of queries','The TTL does not decrease per query. Elapsed time is what matters.'],
  ]},
  {prompt:'Which combination uses two different authentication factors?',options:[
    ['Password and PIN','Both are knowledge. Another knowledge prompt is not a different factor.'],
    ['Password and a different password','Two different passwords still belong to the same knowledge category.'],
    ['Password and an independent TOTP token','Correct: knowledge plus possession. This combination still does not eliminate every phishing risk.'],
  ]},
  {prompt:'How does a Docker container relate to an image?',options:[
    ['Always a complete backup of all application data','State not stored persistently may be lost on removal. A container is not a complete backup.'],
    ['A runnable instance of the image','Correct. Multiple containers can be created from the same image.'],
    ['Another name for exactly the same object','An image and a container have different roles: template and instance.'],
  ]},
  {prompt:'Which basic file permissions does mode 640 express?',options:[
    ['Owner read/write, group read, others none','Correct: 6 = 4 + 2, 4 = read, 0 = none of these permissions.'],
    ['Everyone can read and write','The categories have different permissions. 640 gives others neither read nor write.'],
    ['Owner execute, group write, others read','The values for r, w and x are 4, 2 and 1. 640 sets no execute bit.'],
  ]},
];
