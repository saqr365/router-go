/* runs before first paint: language + theme, no flash.
   Language priority: saved manual choice (rqa-lang) > system/browser language (Arabic -> ar, anything else -> en) */
try{var d=document.documentElement,
sys=function(){var L=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||"ar"];return /^ar($|[-_])/i.test(L[0]||"")?"ar":"en"},
s=localStorage.getItem("rqa-lang"),l=(s==="ar"||s==="en")?s:sys(),t=localStorage.getItem("rqa-theme");
window.rqaSysLang=sys;d.lang=l;d.dir=l==="ar"?"rtl":"ltr";if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}
