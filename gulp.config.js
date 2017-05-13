const path = require('path');

/*
 * paths to main directories
 */
const dirPaths = {
  src: 'src',
  temp: '.tmp'
};

/*
 * paths to source files
 */
const srcFiles = {
  sass: path.join(dirPaths.src, '/styles/**/*.scss'),
  js: path.join(dirPaths.src, '/**/*.js')
};

/*
 * file extensions for different builds
 */
const fileTypesForBuilds = {
  dev: {
    css: 'styles.css',
    js: 'scripts.js'
  }
};

/*
 * notify plugin config--error handler
 */
let notifyConfig = (fileType) => {
  let config = {
    message: `ERROR ON ${fileType}: <%= error.message %>`,
    sound: false
  };

  return config;
};

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
  ignorePath: '../..'
};

/*
 * export module properties/functions
 */
export default { 
  dirPaths,
  fileTypesForBuilds,
  notifyConfig,
  sassAutoprefixerConfig,
  srcFiles,
  wiredepConfig
};

