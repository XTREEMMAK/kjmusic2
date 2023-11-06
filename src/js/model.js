import mixitup from 'mixitup';
import tingle from 'tingle.js';
import LazyLoad from 'vanilla-lazyload';

import * as kjmdb from "./music_db/kjmdb.js";
import * as main from "./main.js";

//Vanilla Lazyload------------------
var lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
});

//MixItUp 3------------------
const containerEl = document.querySelector (".mix-container")
var mixer = mixitup(containerEl, {
            animation: {
                effects: 'fade scale(0.5)'
            }
    });

//Tingle.js------------------
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



//Waypoints.js------------------
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

//Navigation Anchor Updater------------------
var btns = document.getElementsByClassName("nav_a");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (event) { 
            event.preventDefault();   
            const anchor = event.target.closest("a")              
			var href = anchor.getAttribute('href');
            setURLtoHREF (href)      
        });
    }

function setURLtoHREF (href) {
if(history.pushState) {
                history.pushState(null, null, href);
            }
            else {
                location.hash = href;
            }         
}



function showFirstStartCheck(){
  var firstrundone = get_Cookie("firstrundone");

  if (firstrundone == "" || firstrundone == null){
    set_Cookie("firstrundone", true, 30);
  }
}

//New Release------------------
async function get_NewReleaseInfo(){
  var baseURL = "https://apir.keyjayproductions.com/kjm";
  var apiquery = "?fields[0]=nr_video_slug&populate[new_release_background][fields][1]=url";
  try {

		// Get the post data
		let response = await fetch(baseURL + apiquery);

		// If the call failed, throw an error
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Otherwise, get the post JSON
		let nr_data = await response.json();
    // Log the data to the console
		//console.log(nr_data);
    
    //Fetch what you want from JSON object
    let video_slug = nr_data.data.attributes.nr_video_slug;
    let background_url = nr_data.data.attributes.new_release_background.data.attributes.url;
		function nr_videosection(ytslug){
      return '<iframe src="https://www.youtube.com/embed/'+ytslug+'?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/'+ytslug+'?autoplay=0><img src=https://img.youtube.com/vi/'+ytslug+'/maxresdefault.jpg alt=\'BRAND NEW KEY JAY!\'><span>▶</span></a>" frameborder="0" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: auto;" allow="autoplay; encrypted-media" allowfullscreen="" loading="lazy"></iframe>'
    }
    document.getElementById('nr_background').setAttribute("style", "background-image: url("+background_url+")");
    document.querySelector('.res_youtube_vid').innerHTML = nr_videosection(video_slug);

	} catch (error) {
		console.warn(error);
	}
}

//Record List---------------------
function get_recordList(){
  const ALBUMLIST = '?fields[0]=title&fields[1]=slug&populate[frontCover][fields]=formats&populate[mp_categories][fields][0]=type&sort[0]=releaseDate:desc';
  kjmdb.getRecordsList(main.CDN+'/js/music_db/templates/home.hbs','https://apir.keyjayproductions.com/music-projects' + ALBUMLIST,'mix-container');
}

//Record Info---------------------
window.mixLink = function(key) {
  kjmdb.getRecordInfo (main.CDN+'/js/music_db/templates/info.hbs','https://apir.keyjayproductions.com/music-projects',key)
}

//Contact Page---------------------
window.get_contact = function(){
  modal.setContent(
      `<iframe src="https://forms.keyjaycompound.com/app/form?id=2lyEsw&b=0" 
      style="border:0px #ffffff none;" 
      name="KJM Contact" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="600px" width="100%" allowfullscreen>
      </iframe>`);
  modal.open();
}

//Production Page------------------
window.get_support = function(){
  window.open("https://keyayproductions.com", "_blank")
//  modal.setContent(
//      `<div class="support_modal_wrapper">
//              <div class="sm_pic_box" style="width: 40%; margin-left: 5px; margin-right: 5px;"><img src="`+main.CDN+`/img/pc_supp_left.webp" style="width: 100%;"/></div>
//              <div class="sm_content_box">
//                  <h1>More Key Jay, bigger Productions</h1>
//                  <h3>Support the development of even larger KEY JAY PRODUCTIONS <br/> by:</h3>
//                  <div class="sp_options_wrapper">
//                      <div class="sp_option sp_option_rightb"><p>Directly supporting KEY JAY by becoming a POWER CREW VIP. Your support goes farther this way by avoiding unnecessary platform fees.</p><a class="pcsp_link" href="https://keyjayonline.com/powercrew.html" target="_blank"><img src="`+main.CDN+`/img/pc_logo_small.png" alt="Join the POWER CREW VIP"/></a></div>
//                      <div class="sp_option"><p>Or by Supporting KEY JAY on these other fine platforms <br/>(One-Time or by Subscription options available)</p><!--<img src="`+main.CDN+`/img/patreon-logo.jpg" style="width: 250px;" alt="KEY JAY's Patreon"/>--><a href="https://ko-fi.com/keyjayhd" target="_blank"><img src="`+main.CDN+`/img/kofi_logo.png" style="width: 289px;" alt="KEY JAY's Ko-Fi"/></a><a href="https://paypal.me/keyjayproductions?country.x=US&locale.x=en_US" target="_blank"><img src="`+main.CDN+`/img/pp_logo.png" style="width: 289px;" alt="KEY JAY's Pay Pal"/></a>
//                      
//                      </div>
//                  </div>
//              </div>
//          </div>`
//      );
//  modal.open();
}

function get_backgrounds() {
let root = document.documentElement;
  root.style.setProperty('--headerimg_bg','url("'+main.CDN+'/../img/J_Header.jpg")')
  root.style.setProperty('--headerimg_4k_bg','url("'+main.CDN+'/../img/J_Header_5k.webp")')
  root.style.setProperty('--radio_bg','url("'+main.CDN+'/../img/keyjayside.webp")')
  root.style.setProperty('--studio_bg','url("'+main.CDN+'/../img/old_studio.jpg")')
  root.style.setProperty('--studio_4k_bg','url("'+main.CDN+'/../img/old_studio_4k.jpg")')
}


function get_copyright(year){
var copyright = document.querySelector(".copyright");
var copytxt = "Website design by Jamaal Ephriam.</br>Copyright &copy; Jamaal Ephriam "+year+". All Rights Reserved."

copyright.innerHTML = copytxt;
}


export {
  lazyLoadInstance,
  mixer,
  modal,
  modal2,
  showFirstStartCheck,
  get_NewReleaseInfo,
  get_recordList,
  get_backgrounds,
  get_copyright
}
