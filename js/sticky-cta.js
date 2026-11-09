/* sticky download bar (mobile): after the hero button scrolls away, hidden while the downloads section is on screen */
(function(){
  var bar=document.getElementById("stickyCta"),hero=document.querySelector(".hero .cta"),dl=document.getElementById("downloads");
  if(!bar||!hero||!dl||!("IntersectionObserver" in window))return;
  var gone=false,dlv=false;
  function up(){bar.classList.toggle("show",gone&&!dlv)}
  new IntersectionObserver(function(e){var r=e[0];gone=!r.isIntersecting&&r.boundingClientRect.top<0;up()}).observe(hero);
  new IntersectionObserver(function(e){dlv=e[0].isIntersecting;up()},{rootMargin:"0px 0px -30% 0px"}).observe(dl);
})();
