import type {APIRoute} from 'astro';
import {courses} from '../../data/courses.ts';
export function getStaticPaths(){
 return courses.filter(c=>['typst','latex'].includes(c.id)).flatMap(course=>course.chapters.flatMap(chapter=>chapter.sections.flatMap((section,index)=>section.code&&section.language===(course.id==='typst'?'Typst':'LaTeX')?[{params:{id:`${course.id}-${chapter.id}-${index}`},props:{format:course.id,code:section.code,bibliography:chapter.sections.find(s=>s.language==='BibTeX')?.code}}]:[])));
}
export const GET:APIRoute=({props})=>{
 const format=props.format==='latex'?'latex':'typst';
 const main=`main.${format==='latex'?'tex':'typ'}`;
 return Response.json({format,main,files:[{path:main,text:String(props.code)},...(typeof props.bibliography==='string'?[{path:'works.bib',text:props.bibliography}]:[])]});
};
