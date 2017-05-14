/*
 * plugins
 */
const path = require('path');

/*
 * paths to server directories
 */
const dirPaths = {
  src: 'src',
  temp: '.tmp',
  bower: 'bower_components'
};

/*
 * paths to source files
 */
const srcFiles = {
  html: path.join(dirPaths.src, '/**/*.html'),
  sass: path.join(dirPaths.src, '/styles/**/*.scss'),
  js: path.join(dirPaths.src, '/**/*.js')
};

/*
 * file extensions for build
 */
const fileTypesForBuilds = {
  dev: {
    css: 'styles.css',
    js: 'scripts.js',
    index: 'index.html'
  }
};

/*
 * notify plugin config
 */
let notifyConfig = (fileType) => {
  let config = {
    message: `ERROR ON ${fileType}: <%= error.message %>`,
    sound: false
  };

  return config;
};

/*
 * options obj for inject task
 */
let cssInjectOptions = { addRootSlash: false, ignorePath: dirPaths.temp, relative: true };
let jsInjectOptions = { addRootSlash: false, ignorePath: 'src/', relative: false };

/*
 * auto-prefixer for sass task
 */
let sassAutoprefixerConfig = { browsers: ['last 2 versions'], cascade: false };

/*
 * wiredep config obj
 */
let wiredepConfig = {
  json: require('./bower.json'),
  directory: './bower_components',
  ignorePath: '../bower_components/'
};

/*
 * export module properties/functions
 */
export default { 
  dirPaths,
  fileTypesForBuilds,
  notifyConfig,
  cssInjectOptions,
  jsInjectOptions,
  sassAutoprefixerConfig,
  srcFiles,
  wiredepConfig
};

