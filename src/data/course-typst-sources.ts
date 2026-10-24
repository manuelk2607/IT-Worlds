import type {Source} from './content.ts';
const ref=(path:string,title:string,section:string):Source=>({title,publisher:'Typst',url:`https://typst.app/docs/${path}/`,evidenceUrl:`https://typst.app/docs/${path}/`,version:'Typst 0.15.1 · documentation accessed 2026-10-24',section,reviewedAt:'2026-10-24',description:section});
export const typstSources={
 typstSyntax:ref('reference/syntax','Typst syntax','Modes; markup; math; code; character escapes'),
 typstWriting:ref('tutorial/writing-in-typst','Writing in Typst','Paragraphs; headings; lists; functions; figures and references'),
 typstFormatting:ref('tutorial/formatting','Formatting','Set rules; page; text; paragraph; heading numbering'),
 typstStyling:ref('reference/styling','Styling','Set-rule scope; show-set rules; selectors; transformations'),
 typstMath:ref('reference/math','Math','Inline/block equations; variables; symbols; functions'),
 typstTable:ref('reference/model/table','Table','Semantic table versus grid; cells; headers; figure captions'),
 typstFigure:ref('reference/model/figure','Figure','Caption; label; counters; accessible descriptions'),
 typstImage:ref('reference/visualize/image','Image','Source bytes and files; width; alternative descriptions'),
 typstBibliography:ref('reference/model/bibliography','Bibliography','BibLaTeX and Hayagriva inputs; citations; styles; referenced entries'),
 typstScripting:ref('reference/scripting','Scripting','Expressions; code/content blocks; bindings; functions'),
 typstTemplates:ref('tutorial/making-a-template','Making a template','Named parameters; template function; everything show rule; scoped styles'),
 typstHeading:ref('reference/model/heading','Heading','Title versus section; numbering; labels; accessible hierarchy'),
 typstOutline:ref('reference/model/outline','Outline','Table of contents; depth; automatic page numbers'),
} satisfies Record<string,Source>;
