import mixitup from 'mixitup';
import {mixer , modal2} from "/src/js/module.js";

const KJMAPI = 'https://apir.keyjayproductions.com/music-projects';
const ALBUMLIST = '?fields[0]=title&fields[1]=slug&populate[frontCover][fields]=formats&populate[mp_categories][fields][0]=type&sort[0]=releaseDate:desc';
const ALBUMDEET = '&populate[frontCover]=*&fields=title&fields[0]=mainArtist&fields[1]=releaseDate&fields[2]=supportingArtists&fields[3]=description&&fields[4]=projectInvolvement&populate[distribution]=*&populate[credits]=*';

const HOME = CDN+'/src/js/music_db/'
const ALBUMS_HOME = HOME+'albums/';

function getRecordsList (templateFile, recordsJSONFile,sortContainerID){
    setTemplate (templateFile,true)
    .then((template) => {
        setRecordsList (recordsJSONFile,template,sortContainerID)
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
}

function getRecordInfo (templateFile,key){
    setTemplate (templateFile,false)
    .then((template) => {
        setRecordsInfo (key,template)
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
}
function setTemplate (templateFile,mixerDestroy){
    return new Promise((resolve,reject) =>{
    var Request = new XMLHttpRequest();
    Request.open('GET',templateFile);

    Request.onload = function(){
        
        if (Request.status >= 200 && Request.status < 400) {
            let data = Request.responseText;
            if (typeof mixer !== 'undefined' || mixerDestroy == true) {
                mixer.destroy();
             }
            resolve(data);
        }
        else
        {
            reject("We connected to the server, but it an error was returned.");
        }
    
    };

    Request.onerror = function(){
        console.log("Connection Error Charlie!")
    };

    Request.send();
});
}
function setRecordsList (listJSON,recordTemplate,mixContainer){
    var Request = new XMLHttpRequest();
    Request.open('GET',listJSON);
    //
    Request.onload = function(){
        if (Request.status >= 200 && Request.status < 400) {
        var inventory = JSON.parse(Request.responseText);
    
        //var rawTemplate = document.getElementById(recordTemplate).innerHTML;
        var compiledTemplate = Handlebars.compile(recordTemplate);
        var ourGeneratedHTML = compiledTemplate(inventory);
        var musicLibraryContainer = document.getElementById(mixContainer);
        musicLibraryContainer.innerHTML = ourGeneratedHTML;
        var mixer = mixitup('#'+mixContainer);
        }
        else
        {
            console.log("We connected to the server, but it an error was returned.")
        }
    };

    Request.onerror = function(){
        console.log("Connection Error Charlie!")
    };

    Request.send();
}

function setRecordsInfo (key,recordTemplate) {
    
    var Request = new XMLHttpRequest();
    //Request.open('GET',ALBUMS_HOME+key+'/info.json');
    Request.open('GET',KJMAPI +'?filters[slug][$eq]='+key+ALBUMDEET);
    //
    Request.onload = function(){
        if (Request.status >= 200 && Request.status < 400) {
        var inventory = JSON.parse(Request.responseText);
    
        //var rawTemplate = document.getElementById(recordTemplate).innerHTML;
        var compiledTemplate = Handlebars.compile(recordTemplate);
        var ourGeneratedHTML = compiledTemplate(inventory);
        //var musicLibraryContainer = document.getElementById(mixContainer);
        modal2.setContent(ourGeneratedHTML);
        modal2.open();
        
        
        //musicLibraryContainer.innerHTML = ourGeneratedHTML;
        }
        else
        {
            console.log("We connected to the server, but it an error was returned.")
        }
    };

    Request.onerror = function(){
        console.log("Connection Error Charlie!")
    };

    Request.send();
}

export {
    getRecordsList,
    getRecordInfo,
    setTemplate,
    setRecordsList,
    setRecordsInfo,
    KJMAPI,
    ALBUMLIST,
}