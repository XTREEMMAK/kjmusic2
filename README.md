# Key Jay Music

This is the offical GitHub repository for the Key Jay Music website. This is also a rewrite of the original Key Jay Music website which now utilizes the new Key Jay Productions API, 11ty, and Node.js.
<br>
## Site Settings

### Environment Swticher

Almost all site settings are handled within the settings.php file.
Here is where you'd typically modify the HOST source path for images (connecting to the CDN). I've created a switch as an environment switcher for easy modifications between development mode and production mode.

<br>
```
//Environment Switcher
//0 = CDN | 1 = LOCAL
$i=0;
```

<br>
### Music Database

#### Adding Albums to Homepage

The music database does not rely on any backend database technology like MySQL. Instead, the database is a culmination of JSON files that utilize AJAX, and Handlebars to retrieve and format what is needed.

To add new albums, you will first need to create a new entry in the **kjmbdb.json** within the `js/music_db` folder
Example:
<br>
```
{
"name": "Final Fantasy VIIR: Beneath a Stolen Sky",
"key": "2020_pm_ff7bass",
"sort_as": [
"covers"
      ]
},
```
<br>
* **name**: The name of the album
* **key**: The physical folder to which the album art and **info.json** will reside.
* **sort\_as**: Used to filter the albums on the homepage.
    * *Options*: covers, singles, albums.

#### Adding Albums Info

Once the homepage entry is added, create a folder using the **key** from above as the folder name within the `js/music_db/albums/` folder. Navigate inside and insert your an image for the coverart naming it **front.jpg.**

Create an info.json file and copy this structure to is:
<br>
```
{
"name": "[INSERT ALBUM NAME]",
"artist": "[NAME OF HEAD OF PROJECT]",
"additional_credits": "[ADDITIONAL CREDITS (optional)]",
"release": "[PROJECT RELEASE DATE]",
"platforms": [
    {
"youtube": "[YOUTUBE URL (optional)]",
"spotify": "[SPOTIFY URL (optional)]",
"bandcamp": "[BANDCAMP URL (optional)]",
"applemusic": "[APPLE MUSIC URL (optional)]",
"amazonmusic": "[AMAZON MUSIC URL (optional)]",
"direct_dl": "[DIRECT DOWNLOAD URL (optional)]",
"weblink_1": "[OTHER WEBSITE URL (optional)]",
"weblink_2": "[OTHER WEBSITE 2 URL (optional)]"
    }
  ],
"general_description": "[GENERAL DESCRIPTION]",
"project_involvement": "[PROJECT INVOLVEMENT INFO]",
"credits": [
    [
      {
"name": "Key Jay",
"role": "Mixing/Composer/Production/Writer/Vocals"
      }
    ],
    [
      {
"name": "Ms.Blak (Hope Greene)",
"role": "Vocalist"
      },
      {
"name": "Mac Dog",
"role": "Rapper"
      }
    ],
    [
      {
"name": "Paolo A",
"role": "Guitars"
      }
    ],
    [
      {
"name": "Danielle M.",
"role": "Voice Actor"
      }
    ],
    [
      {
"name": "Carlos H.",
"role": "Album Artwork"
      }
    ]
  ]
}
```
<br>
As a note for credits, separate each major category as another array of objects. This adds a space in the credits list on the frontend.

Also note that the **description** and **project\_involvement fields can accept HTML. However, you need to escape double quotes and you need to make sure the HTML in question is on one line. To do both, use Visual Studio Code with extensions (press F1) that can handle both jobs (Ex. JSON Escaper).**
<br>
### **Media Player Settings**

**The site's sticky media player settings can be edited within**`js/mp3-sticky-player/player_settings.js`**. You'll be able to edit the master playlist from that file. Inner playlists can be found within the**`content/playlist`**folder. Audio is referenced to the**`public/audio/[genre]`**folder within each XML playlist.**