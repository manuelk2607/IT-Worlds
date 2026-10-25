/** Shared, non-executing project intake. No file is written to disk or fetched from the network. */
export type DocumentFormat = 'latex' | 'typst';
export interface ProjectFile { path: string; bytes: Uint8Array }
export const projectLimits = { upload: 8 * 1024 * 1024, total: 8 * 1024 * 1024, file: 2 * 1024 * 1024, files: 64, ratio: 100, diagnostics: 200 } as const;
const allowed = new Set(['tex','typ','bib','sty','cls','clo','bbx','cbx','bbl','def','cfg','ltx','png','jpg','jpeg','svg','pdf','csv','json','yaml','yml','toml','txt','md','ttf','otf','ttc','bst']);
export class ProjectError extends Error {
  code: string;
  constructor(code: string) { super(code); this.code = code; this.name = 'ProjectError'; }
}
export function projectPath(path: string): string {
  const normalized = path.normalize('NFC');
  if (!normalized || normalized.length > 200 || /[\u0000-\u001f\u007f\\:]/u.test(normalized) || normalized.startsWith('/') || normalized.split('/').some(part => !part || part === '.' || part === '..' || part.startsWith('.')) || normalized.split('/').length > 8) throw new ProjectError('PATH');
  return normalized;
}
export function fileExtension(path: string): string { return path.split('.').at(-1)?.toLowerCase() ?? ''; }
export function validateProject(files: ProjectFile[]): ProjectFile[] {
  if (!files.length || files.length > projectLimits.files) throw new ProjectError('COUNT');
  let size = 0;
  const seen = new Set<string>();
  for (const file of files) {
    file.path = projectPath(file.path);
    const key = file.path.toLowerCase();
    if (seen.has(key)) throw new ProjectError('DUPLICATE');
    seen.add(key);
    if (!allowed.has(fileExtension(file.path))) throw new ProjectError('TYPE');
    if (file.bytes.length > projectLimits.file) throw new ProjectError('SIZE');
    size += file.bytes.length;
    if (size > projectLimits.total) throw new ProjectError('SIZE');
  }
  return files;
}
export function sourceText(file: ProjectFile): string {
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(file.bytes);
    if (text.includes('\0')) throw new Error('binary');
    return text;
  } catch { throw new ProjectError('ENCODING'); }
}
export function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
/** ZIP central-directory validation precedes bounded streaming decompression. ZIP64/encryption/links are rejected. */
export async function readProjectZip(bytes: Uint8Array): Promise<ProjectFile[]> {
  if (bytes.length > projectLimits.upload || bytes.length < 22) throw new ProjectError('ZIP');
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let end = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
    if (view.getUint32(i, true) === 0x06054b50 && i + 22 + view.getUint16(i + 20, true) === bytes.length) { end = i; break; }
  }
  if (end < 0 || view.getUint16(end + 4, true) || view.getUint16(end + 6, true)) throw new ProjectError('ZIP');
  const count = view.getUint16(end + 10, true), size = view.getUint32(end + 12, true), start = view.getUint32(end + 16, true);
  if (count !== view.getUint16(end + 8, true) || count > projectLimits.files || !count || start + size !== end) throw new ProjectError('ZIP');
  const entries: {path:string; method:number; begin:number; packed:number; unpacked:number; crc:number}[] = [];
  const names = new Set<string>();
  let cursor = start, total = 0;
  for (let i = 0; i < count; i++) {
    if (cursor + 46 > end || view.getUint32(cursor, true) !== 0x02014b50) throw new ProjectError('ZIP');
    const flags = view.getUint16(cursor + 8, true), method = view.getUint16(cursor + 10, true);
    const packed = view.getUint32(cursor + 20, true), unpacked = view.getUint32(cursor + 24, true);
    const nameSize = view.getUint16(cursor + 28, true), extra = view.getUint16(cursor + 30, true), comment = view.getUint16(cursor + 32, true);
    const attributes = view.getUint32(cursor + 38, true), local = view.getUint32(cursor + 42, true);
    const next = cursor + 46 + nameSize + extra + comment;
    if (next > end || flags & ~0x080e || flags & 1 || ![0,8].includes(method) || view.getUint16(cursor + 34,true) || (attributes >>> 16 & 0xf000) === 0xa000) throw new ProjectError('ZIP');
    let path: string;
    try { path = new TextDecoder('utf-8',{fatal:true}).decode(bytes.subarray(cursor + 46,cursor + 46 + nameSize)); } catch { throw new ProjectError('ENCODING'); }
    // Legacy non-ASCII filenames without UTF-8 flag are ambiguous and must be re-exported as UTF-8.
    if (!(flags & 0x800) && /[^\x20-\x7e]/u.test(path)) throw new ProjectError('ENCODING');
    const directory = path.endsWith('/');
    path = projectPath(directory ? path.slice(0,-1) : path);
    const key = path.toLowerCase();
    if (names.has(key)) throw new ProjectError('DUPLICATE');
    names.add(key);
    if (local + 30 > start || view.getUint32(local,true) !== 0x04034b50 || view.getUint16(local+6,true) !== flags || view.getUint16(local+8,true) !== method) throw new ProjectError('ZIP');
    const localName = view.getUint16(local+26,true), localExtra = view.getUint16(local+28,true);
    const begin = local + 30 + localName + localExtra;
    if (begin + packed > start || localName !== nameSize) throw new ProjectError('ZIP');
    for (let j=0;j<nameSize;j++) if(bytes[local+30+j] !== bytes[cursor+46+j]) throw new ProjectError('ZIP');
    if (!(flags & 8) && (view.getUint32(local+18,true)!==packed || view.getUint32(local+22,true)!==unpacked || view.getUint32(local+14,true)!==view.getUint32(cursor+16,true))) throw new ProjectError('ZIP');
    if (unpacked > projectLimits.file || unpacked > Math.max(1,packed) * projectLimits.ratio) throw new ProjectError('SIZE');
    total += unpacked;
    if (total > projectLimits.total) throw new ProjectError('SIZE');
    if (directory) { if (packed || unpacked) throw new ProjectError('ZIP'); }
    else {
      if (!allowed.has(fileExtension(path))) throw new ProjectError('TYPE');
      entries.push({path, method, begin, packed, unpacked, crc:view.getUint32(cursor+16,true)});
    }
    cursor = next;
  }
  if (cursor !== end) throw new ProjectError('ZIP');
  const sorted = [...entries].sort((a,b)=>a.begin-b.begin);
  for(let i=1;i<sorted.length;i++) if(sorted[i]!.begin < sorted[i-1]!.begin+sorted[i-1]!.packed) throw new ProjectError('ZIP');
  const files: ProjectFile[] = [];
  for (const entry of entries) {
    const compressed = bytes.slice(entry.begin, entry.begin + entry.packed);
    let output: Uint8Array;
    if (entry.method === 0) output = compressed;
    else {
      let reader: ReadableStreamDefaultReader<Uint8Array>;
      try { reader = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader(); } catch { throw new ProjectError('DEFLATE'); }
      const chunks: Uint8Array[] = []; let length = 0;
      try {
        while (true) {
          const {done, value} = await reader.read(); if (done) break;
          length += value.length;
          if (length > entry.unpacked || length > projectLimits.file) { await reader.cancel(); throw new ProjectError('SIZE'); }
          chunks.push(value);
        }
      } catch (error) { if (error instanceof ProjectError) throw error; throw new ProjectError('ZIP'); }
      output = new Uint8Array(length); let offset=0;
      for (const chunk of chunks) { output.set(chunk,offset); offset+=chunk.length; }
    }
    if (output.length !== entry.unpacked || crc32(output) !== entry.crc) throw new ProjectError('ZIP');
    files.push({path:entry.path,bytes:output});
  }
  return validateProject(files);
}
/** Resolve only project-local paths; ../ is permitted in source links when the result stays inside the root. */
export function resolveProjectPath(from: string, target: string): string | null {
  if (!target || /[\\:\u0000-\u001f]/u.test(target) || target.startsWith('/') || target.length > 200) return null;
  const parts = from.split('/').slice(0,-1);
  for(const part of target.split('/')) { if(part==='..') {if(!parts.length)return null; parts.pop();} else if(part && part!=='.')parts.push(part); }
  try { return projectPath(parts.join('/')); } catch { return null; }
}
