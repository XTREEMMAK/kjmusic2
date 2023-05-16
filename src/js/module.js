import mixitup from 'mixitup';
import tingle from 'tingle.js';
import LazyLoad from 'vanilla-lazyload';

import {getRecordsList, getRecordInfo,KJMAPI,ALBUMLIST} from "./music_db/kjmdb.js";

//Vanilla Lazyload
var lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
});

//MixItUp 3
const containerEl = document.querySelector (".mix-container")
var mixer = mixitup(containerEl, {
            animation: {
                effects: 'fade scale(0.5)'
            }
    });

//Tingle.js
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['kj_mods', 'sp_mods']
});
modal.addFooterBtn('Close', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    modal.close();
});

var modal2 = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['album_win'],
    beforeClose: function() {
        var scroller = document.querySelector(".tingle-modal--overflow");
        scroller.scrollTo({
        top: 0,
        behavior: "smooth"
        });
        this.setContent('')
    return true
    }
});
modal2.addFooterBtn('Close', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    modal2.close();
});



//Waypoints.js
new Waypoint({
  element: document.getElementById('New-Release'),
  handler: function () {
      var pagecheck = document.getElementById('Page-2').classList.contains('active_page');
      if (!pagecheck) {
      //setURLtoHREF ("#New-Release");
      clearNavSelect();
      document.querySelector(".latest_nav").classList.add("nav_a_clicked");
      }
  }
})

 new Waypoint({
  element: document.getElementById('Music'),
  handler: function () {
      var pagecheck = document.getElementById('Page-2').classList.contains('active_page');
      if (!pagecheck) {
      //setURLtoHREF ("#Music");
      clearNavSelect();
      document.querySelector(".music_nav").classList.add("nav_a_clicked");
      }
  },
  offset: 10
})

new Waypoint({
  element: document.getElementById('Radio'),
  handler: function () {
      var pagecheck = document.getElementById('Page-2').classList.contains('active_page');
      if (!pagecheck) {
      //setURLtoHREF ("#Radio");
      clearNavSelect();
      document.querySelector(".radio_nav").classList.add("nav_a_clicked");
      }
  },
  offset:10
})


window.mixLink = function(key) {//Record Info Links
  getRecordInfo (CDN+'/src/js/music_db/templates/info.hbs',key)
}

window.get_contact = function(){
  modal.setContent(
      `<iframe src="https://forms.keyjaycompound.com/app/form?id=2lyEsw&b=0" 
      style="border:0px #ffffff none;" 
      name="KJM Contact" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="600px" width="100%" allowfullscreen>
      </iframe>`);
  modal.open();
}

window.get_support = function(){
  modal.setContent(
      `<div class="support_modal_wrapper">
              <div class="sm_pic_box" style="width: 40%; margin-left: 5px; margin-right: 5px;"><img src="`+CDN+`src/img/pc_supp_left.webp" style="width: 100%;"/></div>
              <div class="sm_content_box">
                  <h1>More Key Jay, bigger Productions</h1>
                  <h3>Support the development of even larger KEY JAY PRODUCTIONS <br/> by:</h3>
                  <div class="sp_options_wrapper">
                      <div class="sp_option sp_option_rightb"><p>Directly supporting KEY JAY by becoming a POWER CREW VIP. Your support goes farther this way by avoiding unnecessary platform fees.</p><a class="pcsp_link" href="https://keyjayonline.com/powercrew.html" target="_blank"><img src="`+CDN+`src/img/pc_logo_small.png" alt="Join the POWER CREW VIP"/></a></div>
                      <div class="sp_option"><p>Or by Supporting KEY JAY on these other fine platforms <br/>(One-Time or by Subscription options available)</p><!--<img src="`+CDN+`src/img/patreon-logo.jpg" style="width: 250px;" alt="KEY JAY's Patreon"/>--><a href="https://ko-fi.com/keyjayhd" target="_blank"><img src="`+CDN+`src/img/kofi_logo.png" style="width: 289px;" alt="KEY JAY's Ko-Fi"/></a><a href="https://paypal.me/keyjayproductions?country.x=US&locale.x=en_US" target="_blank"><img src="`+CDN+`src/img/pp_logo.png" style="width: 289px;" alt="KEY JAY's Pay Pal"/></a>
                      
                      </div>
                  </div>
              </div>
          </div>`
      );
  modal.open();
}




//MAIN LOAD
window.onload = function() {

//GET NEW RELEASE INFO
getNewReleaseInfo();

//GENERATE THE ALBUM LIST
getRecordsList(CDN+'/src/js/music_db/templates/home.hbs',KJMAPI + ALBUMLIST,'mix-container');
  
//SET COPYRIGHT YEAR
get_copyright(YEAR);

};
           
export {
  lazyLoadInstance,
  mixer,
  modal,
  modal2,
}
