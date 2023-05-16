const { defineConfig } = require('vite');
const glob = require('fast-glob');
const path = require('path');

// Find all HTML files and build an object of names and paths to work from
const files = glob.sync(path.resolve(__dirname, '_site') + '/**/*.html').reduce((acc, cur) => {
  let name = cur.replace(path.join(__dirname) + '/_site/', '').replace('/index.html', '');
  // If name is blank, make up a name for it, like 'home'
  if (name === '') {
    name = 'home';
  }

  acc[name] = cur;
  return acc;
}, {});

module.exports = defineConfig({
  root: '_site',
  clearScreen: false, // This is to show Eleventy output in the console along with Vite output
  build: {
    outDir: '../public', // The output directory is relative to the project root, so we need to put it back one folder to work
  },
  optimizeDeps: {
    exclude: ['vanilla-lazyload']
  },
});