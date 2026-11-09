/* motion: scroll reveal + header shadow */
(function(){
  var h=document.querySelector("header");
  var tt=document.getElementById("toTop"),idle=0;function sc(){h.classList.toggle("is-scrolled",window.scrollY>8)}
  /* back-to-top: hidden while the page is moving, shown once scrolling has stopped (and only after 700px) */
  function showTop(){if(tt)tt.classList.toggle("show",window.scrollY>700)}
  function onScroll(){sc();if(!tt)return;tt.classList.remove("show");clearTimeout(idle);idle=setTimeout(showTop,250)}
  if(tt)tt.addEventListener("click",function(){window.scrollTo({top:0});var b=document.querySelector(".brand");if(b)b.focus({preventScroll:true})});
  window.addEventListener("scroll",onScroll,{passive:true});sc();showTop();
  if(matchMedia("(prefers-reduced-motion:reduce)").matches||!("IntersectionObserver" in window))return;
  var sel=".band li,main .eyebrow,main section.s h2,main .sub,.port,.tile,.steps li,.priv li,.faq details,.final-g>*,.f-col,.f-brand";
  var els=document.querySelectorAll(sel);
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;io.unobserve(e.target);
    var t=e.target;t.classList.add("in");
    setTimeout(function(){t.classList.remove("rv","in");t.style.removeProperty("--d")},1000);
  })},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  els.forEach(function(el){
    var i=Array.prototype.indexOf.call(el.parentNode.children,el);
    el.style.setProperty("--d",Math.min(i,4)*70+"ms");
    el.classList.add("rv");io.observe(el);
  });
})();
