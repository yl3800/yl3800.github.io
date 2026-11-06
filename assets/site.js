(()=>{"use strict";
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let lang="en";try{lang=localStorage.getItem("academic-language")==="zh"?"zh":"en";}catch{}
let filter="all";const content=window.SITE_CONTENT;let selected=null;
function trans(en,zh){return lang==="zh"?zh:en;}
function link(url,label){return '<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(label)+' ↗</a>';}
function art(type){
 if(type==="tokens")return '<div class="art-label">AR<br>generator</div><span class="art-arrow">→</span><div class="token-grid">'+Array(9).fill('<i></i>').join('')+'</div><span class="art-arrow">→</span><div class="art-label">Visual<br>decoder</div>';
 if(type==="film")return '<div class="film"><i></i><i></i><i></i></div><span class="art-arrow">→</span><div class="art-node">'+trans("In-context<br>editing","上下文<br>图像编辑")+'</div>';
 if(type==="alignment")return '<div class="art-node">'+trans("AR model","自回归模型")+'</div><span class="art-arrow">↔</span><div class="art-gauge"></div><div class="art-label">'+trans("Pixel<br>reward","像素级<br>奖励")+'</div>';
 return '<div class="body-view" aria-hidden="true">◉</div><span class="art-arrow">↔</span><div class="art-node">'+trans("Body & view","身体与视点")+'</div>';
}
function projects(){ $('#project-grid').innerHTML=content.projects.map(p=>'<article class="project"><div class="project-art" aria-hidden="true">'+art(p.art)+'<small>'+trans("Method schematic","方法示意")+'</small></div><div class="project-text"><span class="category">'+esc(p.label[lang])+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.description[lang])+'</p><div class="project-links">'+link(p.paper,trans("Paper","论文"))+(p.code?link(p.code,trans("Code","代码")):"")+(p.project?link(p.project,trans("Project","项目主页")):"")+'</div></div></article>').join('');}
function pubs(){const arr=content.publications.filter(p=>filter==="all"||p.area===filter);
 $('#pub-count').textContent=arr.length+trans(" selected"," 篇");
 $('#publication-list').innerHTML=arr.map(p=>'<article class="publication"><div class="pub-year">'+p.year+'</div><div><h3>'+(p.paper?'<a href="'+esc(p.paper)+'" target="_blank" rel="noopener">'+esc(p.title)+'</a>':esc(p.title))+'</h3><p class="authors">'+esc(p.authors).replaceAll("Yicong Li","<strong>Yicong Li</strong>")+'</p><div class="pub-meta"><span class="venue">'+(p.venue==="Preprint"?trans("Preprint","预印本"):esc(p.venue))+'</span>'+(p.paper?link(p.paper,trans("Paper","论文")):"")+(p.code?link(p.code,trans("Code","代码")):"")+(p.project?link(p.project,trans("Project","项目")):"")+(p.arxiv?'<button type="button" data-citation="'+esc(p.id)+'">BibTeX</button>':"")+'</div></div></article>').join('');
}
function setLang(next){lang=next;document.documentElement.lang=lang==="zh"?"zh-CN":"en";document.title=trans("Yicong Li · Efficient Intelligence · USTC","李易聪 · 高效智能研究 · 中国科学技术大学");
 document.querySelectorAll("[data-en][data-zh]").forEach(e=>{const value=e.dataset[lang];if(e.tagName==="H2"||e.tagName==="H3"){e.innerHTML=value;}else{e.textContent=value;}});
 const btn=$('#language-toggle');btn.innerHTML=lang==="en"?'中文 <span aria-hidden="true">↗</span>':'EN <span aria-hidden="true">↗</span>';btn.setAttribute("aria-label",trans("切换至中文","Switch to English"));$('#copy-status').textContent="";projects();pubs();try{localStorage.setItem("academic-language",lang);}catch{}
}
$('#language-toggle').addEventListener("click",()=>setLang(lang==="en"?"zh":"en"));
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{filter=btn.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>{b.classList.toggle("active",b===btn);b.setAttribute("aria-pressed",String(b===btn));});pubs();}));
document.addEventListener("click",e=>{const btn=e.target.closest("[data-citation]");if(!btn)return;selected=content.publications.find(p=>p.id===btn.dataset.citation);const authors=selected.authors.split(", ").join(" and ");$('#citation-text').textContent="@misc{"+selected.id+selected.year+",\n  title = {"+selected.title+"},\n  author = {"+authors+"},\n  year = {"+(selected.arxiv.startsWith("25")?2025:selected.year)+"},\n  eprint = {"+selected.arxiv+"},\n  archivePrefix = {arXiv},\n  url = {"+selected.paper+"}\n}";$('#copy-status').textContent="";$('#citation-dialog').showModal();});
$('#close-citation').addEventListener("click",()=>$('#citation-dialog').close());
$('#citation-dialog').addEventListener("click",e=>{if(e.target===$('#citation-dialog'))$('#citation-dialog').close();});
$('#copy-citation').addEventListener("click",async()=>{try{await navigator.clipboard.writeText($('#citation-text').textContent);$('#copy-status').textContent=trans("Copied.","已复制。");}catch{const range=document.createRange();range.selectNodeContents($('#citation-text'));const s=getSelection();s.removeAllRanges();s.addRange(range);$('#copy-status').textContent=trans("Citation selected. Use your browser’s Copy command.","已选中引用，请使用浏览器的复制功能。");}});
if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.hash==="#"+e.target.id));}}},{rootMargin:"-18% 0px -60% 0px"});document.querySelectorAll("main section[id]").forEach(s=>observer.observe(s));}
setLang(lang);
})();