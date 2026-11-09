(function(){
  var d=document.documentElement,lb=document.getElementById("langBtn"),cp=document.getElementById("copy");
  var T={ar:["سياسة الخصوصية · Router Go","محمود صقر","الرئيسية",". جميع الحقوق محفوظة."],en:["Privacy Policy · Router Go","Mahmoud Saqr","Home",". All rights reserved."]};
  function setLang(l){
    d.lang=l;d.dir=l==="ar"?"rtl":"ltr";
    var en=l==="ar";
    lb.textContent=en?"EN":"AR";lb.lang=en?"en":"ar";
    lb.setAttribute("aria-label",en?"Switch to English":"التبديل إلى العربية");lb.setAttribute("data-tip",en?"English":"العربية");
    document.title=T[l][0];
    cp.textContent="© 2026 "+T[l][1]+T[l][3];
    var h=document.querySelector(".home");h.textContent=T[l][2];
  }
  lb.addEventListener("click",function(){
    var l=d.lang==="ar"?"en":"ar";
    try{localStorage.setItem("rqa-lang",l)}catch(e){}
    setLang(l);
  });
  var bs=document.querySelectorAll(".all");
  for(var i=0;i<bs.length;i++)bs[i].addEventListener("click",function(){
    var ds=this.closest("article").querySelectorAll("details"),any=false,j;
    for(j=0;j<ds.length;j++)if(!ds[j].open)any=true;
    for(j=0;j<ds.length;j++)ds[j].open=any;
    this.textContent=this.getAttribute(any?"data-close":"data-open");
  });
  var cps=document.querySelectorAll(".cp");
  for(var c=0;c<cps.length;c++)cps[c].addEventListener("click",function(){
    var btn=this,v=btn.getAttribute("data-copy");
    function done(){btn.classList.add("ok");btn.setAttribute("data-tip",btn.getAttribute("data-l2"));btn.setAttribute("aria-label",btn.getAttribute("data-l2"));setTimeout(function(){btn.classList.remove("ok");btn.setAttribute("data-tip",btn.getAttribute("data-l1"));btn.setAttribute("aria-label",btn.getAttribute("data-l1"))},1800)}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(done,function(){})}
    else{var t=document.createElement("textarea");t.value=v;document.body.appendChild(t);t.select();try{document.execCommand("copy");done()}catch(e){}t.remove()}
  });
  /* keep in sync when the main page changes language or theme in another tab */
  addEventListener("storage",function(e){
    if(e.key==="rqa-lang"&&(e.newValue==="ar"||e.newValue==="en"))setLang(e.newValue);
    if(e.key==="rqa-theme"){
      if(e.newValue==="light"||e.newValue==="dark")d.setAttribute("data-theme",e.newValue);else d.removeAttribute("data-theme");
      var dk=e.newValue?e.newValue==="dark":matchMedia("(prefers-color-scheme:dark)").matches,m=document.querySelector('meta[name="theme-color"]');
      if(m)m.setAttribute("content",dk?"#0A1026":"#F4F6FB");
    }
  });
  setLang(d.lang==="en"?"en":"ar");
})();
