import type {Source} from './content.ts';
const typst=(path:string,title:string,section:string):Source=>({title,publisher:'Typst',url:`https://typst.app/docs/${path}/`,evidenceUrl:`https://typst.app/docs/${path}/`,version:'Typst 0.15.1 · documentation accessed 2026-10-25',section,reviewedAt:'2026-10-25',description:section});
export const documentSources={
 typstFunctions:typst('reference/foundations/function','Functions','Function calls; named arguments; trailing content; definitions'),
 typstControl:typst('reference/scripting','Scripting and modules','Bindings; conditionals; loops; modules; packages'),
 typstContext:typst('reference/context','Context','Contextual expressions; style context; evaluation at document locations'),
 typstQuery:typst('reference/introspection/query','Query','Finding document elements; context; convergence'),
 typstCsv:typst('reference/data-loading/csv','CSV data','Rows as arrays of strings; headers; delimiter'),
 typstPage:typst('reference/layout/page','Page layout','Page dimensions; body; headers and footers; accessibility'),
 typstAssert:typst('reference/foundations/assert','Assertions','assert; assert.eq; failures and output'),
 typstSystem:typst('reference/foundations/sys','System inputs','sys.inputs; string values; command-line input'),
 typstAccessible:typst('guides/accessibility','Accessibility guide','Universal Access; semantic information; assistive technology'),
 typstMigration:typst('guides/for-latex-users','Guide for LaTeX users','Markup equivalents; commands; code versus markup'),
 typstExport:typst('web-app/export-and-preview','Export and Preview','Previewed file; Project archive; excluded private packages and fonts'),
 overleafExport:{title:'Exporting your work from Overleaf',publisher:'Overleaf',url:'https://www.overleaf.com/learn/how-to/Exporting_your_work_from_Overleaf',evidenceUrl:'https://www.overleaf.com/learn/how-to/Exporting_your_work_from_Overleaf',version:'Web documentation accessed 2026-10-25',section:'Introduction; downloading source ZIP; PDF downloaded separately',reviewedAt:'2026-10-25',description:'Project export contains source files, not the generated PDF.'},
} satisfies Record<string,Source>;
