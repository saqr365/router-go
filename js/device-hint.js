/* device hint: relabel download buttons and put the matching build first */
(function(){
  var ua=navigator.userAgent||"",os=/Android/i.test(ua)?"android":(/Windows/i.test(ua)&&!/Phone/i.test(ua)?"windows":"");
  if(!os)return;
  var tx={android:["حمّل لأندرويد","Get for Android"],windows:["حمّل لويندوز","Get for Windows"]}[os];
  var bs=document.querySelectorAll('[data-ar="حمّل التطبيق"]');
  for(var i=0;i<bs.length;i++){bs[i].setAttribute("data-ar",tx[0]);bs[i].setAttribute("data-en",tx[1]);}
  var p=document.querySelector('.port[data-os="'+os+'"]');
  if(p){p.classList.add("rec");var b=document.createElement("span");b.className="badge rec-b";b.setAttribute("data-ar","مناسب لجهازك");b.setAttribute("data-en","For your device");p.querySelector(".port-h").appendChild(b);}
})();
