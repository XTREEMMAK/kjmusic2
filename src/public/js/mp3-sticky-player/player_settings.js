const host = ""; 
const playlists = [   
    {
        genre: "STARTER",
        display_title: "STARTER KIT",
        playlist_type: "XML",
        description: "Your journey into KEY JAY Music starts here!"
    },
    {
        genre: "ORCHESTRAL",
        display_title: "ORCHESTRAL",
        playlist_type: "XML",
        description: "These are my classical and modern orchestral samples playlist."
    },
    {
        genre: "EDM",
        display_title: "EDM",
        playlist_type: "XML",
        description: "A collection of some of my Electronic Dance Music including House, DnB, Dubstep and More."},
    {
        genre: "HIPHOP",
        display_title: "HIP-HOP",
        playlist_type: "XML",
        description: "A collection of some of my Hip-Hop tracks."
    },
    {
        genre: "POP",
        display_title: "POP",
        playlist_type: "XML",
        description: "Pop music, with all the fun and flare!"
    },
    {
        genre: "VGM",
        display_title: "VGM",
        playlist_type: "XML",
        description: "Insert Quarter for Continue."
    },
    {
        genre: "ROCK",
        display_title: "ROCK",
        playlist_type: "XML",
        description: "Various Rock based tracks of different styles."
    },
    {
        genre: "ATMOSPHERE",
        display_title: "ATMOSPHERE",
        playlist_type: "XML",
        description: "Chillout and Relax to some soothing Atmosphere."
    },
];

var playlistbox = document.querySelector("#playlists");
var playlistHTML = '';  

playlists.forEach(element =>{
    playlistHTML += `
    <li data-source="`+host+`/js/mp3-sticky-player/content/playlists/`+element.genre+`.xml" data-playlist-name="`+element.genre+`" data-thumbnail-path="`+host+`/js/mp3-sticky-player/content/playlists/thumbs/`+element.genre+`.jpg">
                <p class="fwdmsp-categories-title"><span class="fwdmsp-header">Title: </span><span class="fwdmsp-title">`+element.display_title+`</span></p>
                <p class="fwdmsp-categories-type"><span class="fwdmsp-header">Type: </span>`+element.playlist_type+`</p>
                <p class="fwdmsp-categories-description"><span class="fwdmsp-header">Description: </span>`+element.description+`</p>
    </li>
    `;
});

playlistbox.innerHTML = playlistHTML;

FWDMSPUtils.onReady(function(){
        new FWDMSP({
            //main settings
            instanceName:"player1",
            playlistsId:"playlists",
            mainFolderPath: "/js/mp3-sticky-player/content",
            skinPath:"minimal_skin_dark",
            privatePassword:"428c841430ea18a70f7b06525d4b748a",
            soundCloudAPIKey:"",
            showSoundCloudUserNameInTitle:"yes",
            googleAnalyticsTrackingCode:"UA-122352201-1",
            youtubeAPIKey:"",
            proxyCors:"",
            showMainBackground:"yes",
            verticalPosition:"bottom",
            horizontalPosition:"center",
            useDeepLinking:"no",
            useYoutube:"yes",
            useVideo:"yes",
            useVectorIcons:'no',
            useContinuousPlayback:'yes',
            useHEXColorsForSkin:"no",
            normalHEXButtonsColor:"#FF0000",
            normalHEXButtonsColor2:"#00FF00",
            rightClickContextMenu:"disabled",
            showButtonsToolTips:"yes",
            animate:"yes",
            addKeyboardSupport:"yes",
            autoPlay:"no",
            loop:"no",
            shuffle:"no",
            maxWidth:"100%",
            volume:.8,
            toolTipsButtonsHideDelay:1.5,
            toolTipsButtonsBackgroundColor:"#FFFFFF",
            toolTipsButtonFontColor:"#000000",
            //controller settings
            showControllerByDefault:"no",
            showThumbnail:"yes",
            showFullScreenButton:"no",
            showNextAndPrevButtons:"yes",
            showLoopButton:"yes",
            showShuffleButton:"yes",
            showDownloadMp3Button:"yes",
            showBuyButton:"yes",
            showShareButton:"yes",
            showMainScrubberAndVolumeScrubberToolTipLabel:"yes",
            expandBackground:"no",
            titleColor:"#FFFFFF",
            timeColor:"#888888",
            scrubbersToolTipLabelBackgroundColor:"#FFFFFF",
            scrubbersToolTipLabelFontColor:"#5a5a5a",
            //controller align and size settings (described in detail in the documentation!)
            controllerHeight:76,
            startSpaceBetweenButtons:9,
            spaceBetweenButtons:8,
            separatorOffsetOutSpace:5,
            separatorOffsetInSpace:9,
            lastButtonsOffsetTop:14,
            allButtonsOffsetTopAndBottom:14,
            titleBarOffsetTop:13,
            mainScrubberOffsetTop:47,
            spaceBetweenMainScrubberAndTime:10,
            startTimeSpace:10,
            scrubbersOffsetWidth:2,
            scrubbersOffestTotalWidth:0,
            volumeButtonAndScrubberOffsetTop:47,
            spaceBetweenVolumeButtonAndScrubber:6,
            volumeScrubberOffestWidth:4,
            scrubberOffsetBottom:10,
            equlizerOffsetLeft:1,
            //playlists window settings
            showPlaylistsSearchInput:"yes",
            usePlaylistsSelectBox:"yes",
            showPlaylistsSelectBoxNumbers:"yes",
            showPlaylistsButtonAndPlaylists:"yes",
            showPlaylistsByDefault:"no",
            useID3ForFolderPlaylist:"yes",
            thumbnailSelectedType:"opacity",
            startAtPlaylist:0,
            startAtTrack:0,
            startAtRandomTrack:"no",
            playlistSelectorHeight: 37,
            buttonsMargins:15,
            thumbnailMaxWidth:330, 
            thumbnailMaxHeight:330,
            horizontalSpaceBetweenThumbnails:40,
            verticalSpaceBetweenThumbnails:40,
            mainSelectorBackgroundSelectedColor:"#FFFFFF",
            mainSelectorTextNormalColor:"#FFFFFF",
            mainSelectorTextSelectedColor:"#000000",
            mainButtonTextNormalColor:"#888888",
            mainButtonTextSelectedColor:"#FFFFFF",
            //playlist settings
            playTrackAfterPlaylistLoad:"no",
            showPlayListButtonAndPlaylist:"yes",
            showPlayListOnMobile:"yes",
            showPlayListByDefault:"no",
            showPlaylistItemPlayButton:"yes",
            showPlaylistItemDownloadButton:"yes",
            showPlaylistItemBuyButton:"yes",
            forceDisableDownloadButtonForPodcast:"yes",
            forceDisableDownloadButtonForOfficialFM:"yes",
            forceDisableDownloadButtonForFolder:"yes",
            addScrollBarMouseWheelSupport:"yes",
            showTracksNumbers:"yes",
            disableScrubber:"no",
            randomizePlaylist:"no",
            playlistBackgroundColor:"#000000",
            trackTitleNormalColor:"#888888",
            trackTitleSelectedColor:"#FFFFFF",
            trackDurationColor:"#888888",
            playlistItemHeight:33,
            maxPlaylistItems:100,
            nrOfVisiblePlaylistItems:9,
            trackTitleOffsetLeft:0,
            playPauseButtonOffsetLeftAndRight:11,
            durationOffsetRight:9,
            downloadButtonOffsetRight:11,
            scrollbarOffestWidth:7,
            //playback rate / speed
            showPlaybackRateButton:"yes",
            playbackRateButtonsMargins:7,
            defaultPlaybackRate:1, //min - 0.5 / max - 3
            playbackRateWindowTextColor:"#FFFFFF",
            //visualizer
            useVisualizer:'yes',
            visualizerRandomPreset:"yes",
            visualizerPreset:"wave1",
            visualizerColor:["#AAAAAA", "#999999", "#888888", "#777777", "#666666"],
            visualizerCapColor: "#FF3FFF",
            //login
            playIfLoggedIn:"no",
            playIfLoggedInMessage:"Please <a href='https://google.com' target='_blank'>login</a> to access this track.",
            //search bar settings
            showSearchBar:"yes",
            showSortButtons:"yes",
            searchInputColor:"#999999",
            searchBarHeight:38,
            inputSearchTextOffsetTop:1,
            inputSearchOffsetLeft:0,
            //password window
            borderColor:"#333333",
            mainLabelsColor:"#FFFFFF",
            secondaryLabelsColor:"#a1a1a1",
            textColor:"#5a5a5a",
            inputBackgroundColor:"#000000",
            inputColor:"#FFFFFF",
            //opener settings
            showOpener:"yes",
            openerAlignment:"right",
            openerEqulizerOffsetLeft:3,
            openerEqulizerOffsetTop:-1,
            //popup settings
            showPopupButton:"no",
            openPopupOnPlay:"no",
            popupWindowBackgroundColor:"#878787",
            popupWindowWidth:850,
            popupWindowHeight:451,
            //a to b loop
            atbTimeTextColorNormal:"#888888",
            atbTimeTextColorSelected:"#FFFFFF",
            atbButtonTextNormalColor:"#888888",
            atbButtonTextSelectedColor:"#FFFFFF",
            atbButtonBackgroundNormalColor:"#FFFFFF",
            atbButtonBackgroundSelectedColor:"#000000"
        });
    });