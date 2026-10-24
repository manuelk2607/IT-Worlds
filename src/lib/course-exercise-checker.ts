import type { ExerciseResult } from './exercise-checker.ts';
import { translate, type Locale } from './locale.ts';
type Result = (passed: boolean, output: unknown) => ExerciseResult;
/** A deliberately small, non-executing model for each documented task format. */
export function checkCourseExercise(id: string, code: string, locale: Locale, result: Result): ExerciseResult | undefined {
  const t = translate(locale);
  if (id === 'typescript-filter') {
    const match = code.match(/^const\s+result\s*:\s*number\s*\[\s*\]\s*=\s*minutes\.filter\(\s*(?:([A-Za-z_$][\w$]*)|\(\s*([A-Za-z_$][\w$]*)\s*\))\s*=>\s*([A-Za-z_$][\w$]*)\s*(>=|<=|===|!==|>|<)\s*(-?\d+(?:\.\d+)?)\s*\)\s*;?$/);
    const reserved = new Set('await break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield'.split(' '));
    if (!match || (match[1] ?? match[2]) !== match[3] || reserved.has(match[3]) || /^-?0\d/.test(match[5])) return result(false, t('Unterstützt: const result: number[] = minutes.filter(value => value >= 30);', 'Supported: const result: number[] = minutes.filter(value => value >= 30);'));
    const boundary = Number(match[5]);
    const values = [15, 30, 45].filter(value => {
      switch (match[4]) {
        case '>=': return value >= boundary;
        case '<=': return value <= boundary;
        case '>': return value > boundary;
        case '<': return value < boundary;
        case '===': return value === boundary;
        default: return value !== boundary;
      }
    });
    return result(values.length === 2 && values[0] === 30 && values[1] === 45, {minutes:[15,30,45], result:values, expected:[30,45]});
  }
  if (id === 'python-summe') {
    const match = code.match(/^result\s*=\s*(sum|min|max|len)\(\s*minutes\s*(,\s*(?:start\s*=\s*)?0\s*)?\)$/);
    if (!match || (match[2] && match[1] !== 'sum')) return result(false, t('Unterstützt: result = sum(minutes), min(minutes), max(minutes) oder len(minutes). Nur sum erlaubt hier einen Startwert 0.', 'Supported: result = sum(minutes), min(minutes), max(minutes) or len(minutes). Only sum accepts a starting value of 0 here.'));
    const values = [15, 25, 0];
    const value = match[1] === 'sum' ? values.reduce((sum, item) => sum + item, 0) : match[1] === 'min' ? Math.min(...values) : match[1] === 'max' ? Math.max(...values) : values.length;
    return result(value === 40, {minutes:values, result:value, expected:40});
  }
  if (id === 'markdown-gliederung') {
    const lines = code.split(/\r?\n/).filter(line => line.trim());
    const headings = lines.map(line => line.match(/^ {0,3}(#{1,6})[\t ]+([^<>]+?)\s*$/));
    if (headings.some(heading => !heading)) return result(false, t('Nur drei nicht leere ATX-Überschriften mit Leerzeichen nach #; keine weiteren Zeilen oder HTML-Tags.', 'Only three non-empty ATX headings with a space after #; no additional lines or HTML tags.'));
    const outline = headings.map(heading => ({level:heading![1].length, text:heading![2].replace(/(?:^|[\t ]+)#+[\t ]*$/, '').trim()}));
    const valid = outline.length === 3 && outline.every((heading, index) => heading.level === index + 1 && heading.text.length > 0) && new Set(outline.map(heading => heading.text)).size === 3;
    return result(valid, {outline, expectedLevels:[1,2,3]});
  }
  if (id === 'typst-verweis') {
    const match = code.match(/^#set\s+heading\(\s*numbering\s*:\s*"1\.1"\s*\)\s*\n=\s+([^<>\n]+?)\s+<([A-Za-z][A-Za-z0-9-]*)>\s*\nRead\s+@([A-Za-z][A-Za-z0-9-]*)\.$/);
    if (!match) return result(false, t('Behalte die drei Zeilen der Vorlage bei: Set-Regel, Überschrift mit Label, Read @label.', 'Keep the template’s three lines: set rule, heading with label, Read @label.'));
    return result(match[2] === match[3], {heading:match[1], label:match[2], reference:match[3], resolved:match[2] === match[3]});
  }
  if (id === 'sql-null-zaehlen') {
    const match = code.match(/^SELECT\s+COUNT\s*\(\s*(\*|learner)\s*\)\s+FROM\s+enrolments(?:\s+WHERE\s+course_id\s*=\s*(\d+))?\s*;?$/i);
    if (!match) return result(false, 'SELECT COUNT(*) FROM enrolments WHERE course_id = 1;');
    const rows = [{course_id:1, learner:'Ada'}, {course_id:1, learner:null}, {course_id:1, learner:'Lin'}, {course_id:2, learner:'Bo'}].filter(row => match[2] === undefined || row.course_id === Number(match[2]));
    const count = match[1] === '*' ? rows.length : rows.filter(row => row.learner !== null).length;
    return result(match[1] === '*' && Number(match[2]) === 1 && count === 3, {rows, count, expected:3});
  }
  if (id === 'web-formularlabel') {
    const match = code.match(/^<label\s+([^<>]+)>([^<>]+)<\/label>\s*<input\s+([^<>]+?)\s*\/?\s*>$/i);
    const attributes = (text: string, allowed: readonly string[]): Record<string, string> | undefined => {
      const attrs: Record<string, string> = Object.create(null) as Record<string, string>;
      let rest = text.trim();
      while (rest) {
        const attr = rest.match(/^([a-z]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?(?=\s|$)\s*/i);
        if (!attr) return;
        const name = attr[1].toLowerCase();
        if (!allowed.includes(name) || Object.hasOwn(attrs, name) || (name !== 'required' && attr[2] === undefined && attr[3] === undefined)) return;
        attrs[name] = attr[2] ?? attr[3] ?? '';
        rest = rest.slice(attr[0].length);
      }
      return attrs;
    };
    const label = match && attributes(match[1], ['for']);
    const input = match && attributes(match[3], ['id','type','required','name']);
    if (!match || !label || !input) return result(false, t('Unterstützt sind nur label[for] mit Text und input[id,type,required,name?], ohne weitere Tags oder Attribute.', 'Supported: label[for] with text, then input[id,type,required,name?], without other tags or attributes.'));
    const associated = !!input.id && !/\s/.test(input.id) && label.for === input.id;
    return result(associated && !!match[2].trim() && input.type?.toLowerCase() === 'email' && Object.hasOwn(input,'required'), {label:match[2].trim(), for:label.for, id:input.id, associated, type:input.type, required:Object.hasOwn(input,'required')});
  }
  if (id === 'bash-pipefail') {
    const match = code.match(/^set\s+([-+])o\s+pipefail\s*\n\s*false\s*\|\s*true$/);
    if (!match) return result(false, t('Genau zwei Zeilen: set -o pipefail oder set +o pipefail, danach false | true.', 'Exactly two lines: set -o pipefail or set +o pipefail, followed by false | true.'));
    const enabled = match[1] === '-';
    return result(enabled, {individualStatuses:[1,0], pipefail:enabled, pipelineStatus:enabled ? 1 : 0});
  }
  if (!['json-typen','api-versionskonflikt','ipv4-netzadresse','paging-adresse','objekt-berechtigung','sli-ziel'].includes(id)) return undefined;
  let data:Record<string,unknown>;
  try {
    const parsed:unknown = JSON.parse(code);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('object required');
    data = parsed as Record<string,unknown>;
  } catch {return result(false, t('Gib ein gültiges JSON-Objekt mit den Feldern aus der Vorlage ein.', 'Enter a valid JSON object with the template’s fields.'));}
  if (id === 'json-typen') {
    const fields = Object.keys(data);
    return result(fields.length === 2 && data.minutes === 30 && data.done === false, {minutes:{value:data.minutes,type:typeof data.minutes,expectedType:'number'},done:{value:data.done,type:typeof data.done,expectedType:'boolean'}});
  }
  if (id === 'api-versionskonflikt') {
    return result(data.ifMatch === 'v1' && data.currentEtag === 'v2' && data.status === 412 && data.applied === false, {ifMatch:'"v1"', currentEtag:'"v2"', conditionMatches:false, expected:{status:412,applied:false}});
  }
  if (id === 'ipv4-netzadresse') {
    const address = [192,0,2,17];
    const prefix = 28;
    const value = address.reduce((sum,octet)=>sum * 256 + octet,0);
    const blockSize = 2 ** (32 - prefix);
    const networkValue = Math.floor(value / blockSize) * blockSize;
    const network = [24,16,8,0].map(shift=>(networkValue >>> shift) & 255).join('.');
    return result(data.address === address.join('.') && data.prefix === prefix && data.network === network, {address:address.join('.'), prefix, hostBits:32-prefix, addressesPerBlock:blockSize, expectedNetwork:network});
  }
  if (id === 'paging-adresse') {
    const virtualAddress=69, pageSize=16, frame=3;
    const virtualPage=Math.floor(virtualAddress/pageSize), offset=virtualAddress%pageSize;
    const physicalAddress=frame*pageSize+offset;
    return result(data.virtualAddress===virtualAddress && data.pageSize===pageSize && data.frame===frame && data.virtualPage===virtualPage && data.offset===offset && data.physicalAddress===physicalAddress, {given:{virtualAddress,pageSize,frame},expected:{virtualPage,offset,physicalAddress}});
  }
  if (id === 'objekt-berechtigung') return result(data.authenticated === true && data.user === 'Lin' && data.owner === 'Ada' && data.allowed === false, {authenticated:true, user:'Lin', owner:'Ada', ownerMatches:false, expectedAllowed:false});
  if (id === 'sli-ziel') {
    const requests=1000, successful=992, targetPercent=99;
    const successPercent=successful/requests*100;
    const meetsTarget=successPercent>=targetPercent;
    return result(data.requests===requests && data.successful===successful && data.targetPercent===targetPercent && data.successPercent===successPercent && data.meetsTarget===meetsTarget, {window:{requests,successful},expected:{successPercent,targetPercent,meetsTarget}});
  }
  return undefined;
}
