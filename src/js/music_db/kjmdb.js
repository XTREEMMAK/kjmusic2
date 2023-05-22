import mixitup from 'mixitup';
import {mixer , modal2} from "/js/model.js";


function getRecordsList (templateFile, recordsJSONFile,sortContainerID){
    setTemplate (templateFile,true)
    .then((template) => {
        setRecordsList (recordsJSONFile,template,sortContainerID)
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
}

function getRecordInfo (templateFile,api,key){
    setTemplate (templateFile,false)
    .then((template) => {
        setRecordsInfo (key,api,template)
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
}

function setRecordsList (listJSON,recordTemplate,mixContainer){
    var Request = new XMLHttpRequest();
    Request.open('GET',listJSON);
    //
    Request.onload = function(){
        if (Request.status >= 200 && Request.status < 400) {
        var inventory = JSON.parse(Request.responseText);
        var compiledTemplate = Handlebars.compile(recordTemplate);
        var ourGeneratedHTML = compiledTemplate(inventory);
        var musicLibraryContainer = document.getElementById(mixContainer);
        musicLibraryContainer.innerHTML = ourGeneratedHTML;
        mixitup('#'+mixContainer);
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

function setRecordsInfo (key,api,recordTemplate) {
    const ALBUMDEET = '&populate[frontCover]=*&fields=title&fields[0]=mainArtist&fields[1]=releaseDate&fields[2]=supportingArtists&fields[3]=description&&fields[4]=projectInvolvement&populate[distribution]=*&populate[credits]=*';
    var Request = new XMLHttpRequest();
    Request.open('GET',api +'?filters[slug][$eq]='+key+ALBUMDEET);
    //
    Request.onload = function(){
        if (Request.status >= 200 && Request.status < 400) {
        var inventory = JSON.parse(Request.responseText);
        var compiledTemplate = Handlebars.compile(recordTemplate);
        var ourGeneratedHTML = compiledTemplate(inventory);
    
        modal2.setContent(ourGeneratedHTML);
        modal2.open();
     
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
export {
    getRecordsList,
    getRecordInfo,
    setRecordsList,
    setRecordsInfo,
    setTemplate,
}