
var CDN = "";
const YEAR = new Date().getFullYear();
const HOSTURL = "http://music.keyjayhd.com";


//Navigation Anchor Updater
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

function clearNavSelect(){
      document.querySelector(".nav_a_clicked").classList.remove("nav_a_clicked");
}

//Cookies
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function showFirstStartCheck(){
  var firstrundone = getCookie("firstrundone");
  var el = document.querySelector('.h_play_button');

  if (firstrundone == "" || firstrundone == null){
  pgia.play(el, "PlaylistTip");
  disableScroll();
  setCookie("firstrundone", true, 30);
  }
}

//Hero Play Button
function showStart(){
    window['player1'].showPlayer();
    window['player1'].stop();
    showFirstStartCheck();
    setTimeout(function(){ 
    window['player1'].play(); 
        }, 2000)   
}

//New Release
async function getNewReleaseInfo(){
  //Put image URL's and YouTube slug in Variables
  //Use Javascript to update the background image of the CSS container
  //Change the YouTube URL slug (probably just pass the new HTML)
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
      return '<iframe src="https://www.youtube.com/embed/'+ytslug+'?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0" frameborder="0" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: auto;" allow="autoplay; encrypted-media" allowfullscreen="" ></iframe>'
    }
    document.getElementById('nr_background').setAttribute("style", "background-image: url("+background_url+")");
    document.querySelector('.res_youtube_vid').innerHTML = nr_videosection(video_slug);

	} catch (error) {
		console.warn(error);
	}
}

function recal_scroll(){//Pinegrow Position reset
    ScrollTrigger.refresh();
    
}

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}


function get_copyright(year){
var copyright = document.querySelector(".copyright");
var copytxt = "Website design by Jamaal Ephriam.</br>Copyright &copy; Jamaal Ephriam "+year+". All Rights Reserved."

copyright.innerHTML = copytxt;
}



           

