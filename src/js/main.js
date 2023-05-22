import * as model from "./model.js";

let PROD = import.meta.env.PROD;
if (PROD){
var CDN ="https://cdn.music.keyjayhd.com/public/";
}
else {
var CDN = ".";
}
const YEAR = new Date().getFullYear();

window.clearNavSelect = function(){
  document.querySelector(".nav_a_clicked").classList.remove("nav_a_clicked");
}

window.recal_scroll = function(){//Pinegrow Position reset
    ScrollTrigger.refresh();
}

window.disableScroll = function() {
  document.body.classList.add("stop-scrolling");
}

window.enableScroll = function() {
  document.body.classList.remove("stop-scrolling");
}

model.showFirstStartCheck();
model.get_NewReleaseInfo();
model.get_recordList();
model.get_backgrounds();
model.get_images();
model.get_copyright(YEAR);  


export {
  YEAR,
  CDN,
}