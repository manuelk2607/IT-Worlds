import type{Source}from'./content.ts';
function source(url:string,title:string,publisher:string,section:string):Source{return{url,evidenceUrl:url,title,publisher,version:'Living documentation · accessed 2026-10-23',section,reviewedAt:'2026-10-23',description:section};}
export const webSources={
 webDisclosure:source('https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/','Disclosure pattern','W3C WAI · ARIA Authoring Practices','Keyboard interaction; aria-expanded and aria-controls'),
 webStructure:source('https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents','Structuring documents','MDN Web Docs','Basic sections; HTML layout elements'),
 webBox:source('https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model','The box model','MDN Web Docs','Standard and alternative box models; padding; border'),
 webResponsive:source('https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design','Responsive web design','MDN Web Docs','Media queries; flexible layouts; viewport meta'),
 webForm:source('https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form','Your first form','MDN Web Docs','Label, input and textarea; sending form data'),
 webLabels:source('https://www.w3.org/WAI/tutorials/forms/labels/','Labeling controls','W3C Web Accessibility Initiative','Associating labels explicitly; labeling buttons'),
 webHeadings:source('https://www.w3.org/WAI/tutorials/page-structure/headings/','Headings','W3C Web Accessibility Initiative','Heading ranks; organizing content'),
 webKeyboard:source('https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard','Keyboard accessible','MDN Web Docs','Interactive semantics; focus order; focus styling'),
 webDom:source('https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model','Document Object Model','MDN Web Docs','Concepts; tree structure; creating nodes and events'),
 webVitals:source('https://web.dev/articles/vitals','Web Vitals','Google · web.dev · Philip Walton','LCP, INP and CLS; lab versus field measurements'),
 webAssets:source('https://developers.cloudflare.com/workers/static-assets/','Workers Static Assets','Cloudflare','How it works; routing; custom 404 pages'),
} satisfies Record<string,Source>;
