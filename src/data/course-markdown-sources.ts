import type {Source} from './content.ts';
const doc=(url:string,title:string,publisher:string,section:string,version='Living documentation · accessed 2026-10-24'):Source=>({url,evidenceUrl:url,title,publisher,section,version,reviewedAt:'2026-10-24',description:section});
const github='https://docs.github.com/en/';
export const markdownSources={
 markdownSyntax:doc(`${github}get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax`,'Basic writing and formatting syntax','GitHub','Headings; links; relative links; line breaks; images; lists'),
 markdownCode:doc(`${github}get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks`,'Creating and highlighting code blocks','GitHub','Fenced code blocks; nesting fences; syntax highlighting'),
 markdownTables:doc(`${github}get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables`,'Organizing information with tables','GitHub','Creating a table; formatting; escaping pipes'),
 markdownReadme:doc(`${github}repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes`,'About READMEs','GitHub','Purpose; contents; automatic outline; relative links'),
 markdownGfm:doc('https://github.github.com/gfm/','GitHub Flavored Markdown specification','GitHub','4.10 Tables; 5.3 Task list items; dialect and rendering boundaries','GFM 0.29-gfm · 2019-04-06'),
 markdownAlt:doc('https://www.w3.org/WAI/tutorials/images/decision-tree/','An alt decision tree','W3C Web Accessibility Initiative','Informative, functional, decorative and complex images','WAI Images Tutorial · updated 2024-05-13'),
} satisfies Record<string,Source>;
