import { defineConfig } from 'vite';
import glob from 'fast-glob';
import path from 'path';

//const glob = import('fast-glob');
//const path = import('path');

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


export default defineConfig({
  base: './',
  root: 'src',
  clearScreen: false, // This is to show Eleventy output in the console along with Vite output
  build: {
    outDir: '../public', // The output directory is relative to the project root, so we need to put it back one folder to work
  },
  
  optimizeDeps: {
    exclude: ['vanilla-lazyload'
  ]
  },
});