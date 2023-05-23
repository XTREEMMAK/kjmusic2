# Key Jay Music

This is the offical GitHub repository for the Key Jay Music website. This is also a rewrite of the original Key Jay Music website which now utilizes the new Key Jay Productions API, 11ty, Vite, and Node.js.
<br>
## Site Settings

### Environment Swticher

This version of the site uses VITE environment variables.
For dev, make sure to create an .env.development file with the project's root folder with VITE_CDN to the path of your choosing. For production, create a .env.production with the same variable with the path of your choosing.

<br>
### Music Database

#### Adding Albums and Album Info

Album info and Album homepage covers are now all handled by the Key Jay Productions API powered by Strapi, a lightweight headless CMS.

### **Media Player Settings**

**The site's sticky media player settings can be edited within the public js folder at**`src/public/js/mp3-sticky-player/player_settings.js`**. You'll be able to edit the master playlist from that file. Inner playlists can be found within the**`content/playlist`**folder. Audio is referenced to the**`public/audio/[genre]`**folder within each XML playlist.**