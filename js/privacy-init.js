/* same keys as index.html: language and theme chosen there are used here.
   Language priority: ?lang= > saved manual choice > system/browser language */
try{var d=document.documentElement,q=location.search.match(/[?&]lang=(ar|en)/),
L=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||"ar"],
s=localStorage.getItem("rqa-lang"),
l=(q&&q[1])||((s==="ar"||s==="en")?s:(/^ar($|[-_])/i.test(L[0]||"")?"ar":"en")),
t=localStorage.getItem("rqa-theme");d.lang=l;d.dir=l==="ar"?"rtl":"ltr";if(t==="light"||t==="dark")d.setAttribute("data-theme",t);
var dk=t?t==="dark":matchMedia("(prefers-color-scheme:dark)").matches,m=document.querySelector('meta[name="theme-color"]');
if(m)m.setAttribute("content",dk?"#0A1026":"#F4F6FB")}catch(e){}
