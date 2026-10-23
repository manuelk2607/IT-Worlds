const outline=document.querySelector<HTMLDetailsElement>('[data-course-outline]');
if(outline){
 const media=matchMedia('(max-width:850px)');
 outline.open=!media.matches;
 media.addEventListener('change',()=>{outline.open=!media.matches;});
}
