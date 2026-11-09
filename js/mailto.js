/* email links: open a ready message addressed to the developer, no menu
   phone (Android) -> Gmail app; iPhone/iPad -> Gmail app, else the mail app
   computer (Windows, Mac...) -> Gmail compose in a new browser tab */
(function(){
  var ua=navigator.userAgent||"",android=/Android/i.test(ua),
      ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="mailto:"]');
    if(!a||e.defaultPrevented||e.button||e.ctrlKey||e.metaKey||e.shiftKey)return;
    var addr=a.getAttribute("href").slice(7).split("?")[0],
        web="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(addr);
    e.preventDefault();
    if(android){
      location.href="intent:mailto:"+addr+"#Intent;scheme=mailto;package=com.google.android.gm;S.browser_fallback_url="+encodeURIComponent(web)+";end";
      return;
    }
    if(ios){
      var left=false,m=function(){left=true};
      document.addEventListener("visibilitychange",m);window.addEventListener("pagehide",m);
      location.href="googlegmail:///co?to="+encodeURIComponent(addr);
      setTimeout(function(){
        document.removeEventListener("visibilitychange",m);window.removeEventListener("pagehide",m);
        if(!left)location.href="mailto:"+addr;
      },900);
      return;
    }
    var w=window.open(web,"_blank");
    if(w){try{w.opener=null}catch(x){}}else location.href=web;
  });
})();
