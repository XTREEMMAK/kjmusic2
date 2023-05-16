module.exports = function (eleventyConfig) {
 
    eleventyConfig.addPassthroughCopy('src/img');
    eleventyConfig.addPassthroughCopy('src/videos');
    eleventyConfig.addPassthroughCopy('src/audio');
    eleventyConfig.addPassthroughCopy('src/css');
    eleventyConfig.addPassthroughCopy('src/fonts');
    eleventyConfig.addPassthroughCopy('src/js');
    eleventyConfig.addPassthroughCopy('main.js');
    

    return {
        dir: {
            output: '_site',
          },
        passthroughFileCopy: true
    };
};