/*
 * import config
 */
import config from './gulp.config';

/*
 * plugins
 */
const browserSync = require('browser-sync'),
    del = require('del'),
    gulp = require('gulp'),
    path = require('path'),
    plugins = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    wiredep = require('wiredep').stream,
    spa = require('browser-sync-spa');

/*
 * build
 */
gulp.task('build', ['lint', 'clean-temp', 'sass', 'wiredep', 'inject']);

/*
 * clean
 */
gulp.task('clean-temp', () => {
  let dir = path.join(config.dirPaths.temp, '/**/*');
  return del.sync(dir);
});

/*
 * copy-index-html
 */
gulp.task('copy-index-html', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest(config.dirPaths.temp));
});

/*
 * sass
 */
gulp.task('sass', () => {
  return gulp.src([config.srcFiles.sass])
    .pipe(plugins.sourcemaps.init({ loadMaps: true })) 
    .pipe(plugins.sass().on('error', plugins.notify.onError(config.notifyConfig('SASS'))))
    .pipe(plugins.autoprefixer(config.sassAutoprefixerConfig))
    .pipe(plugins.concat(config.fileTypesForBuilds.dev.css))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(config.dirPaths.temp, 'styles')));
});

/*
 * inject
 */
gulp.task('inject', ['sass'], () => {
  let injectCss = gulp.src(path.join(config.dirPaths.temp, 'styles', config.fileTypesForBuilds.dev.css), { read: false });
  let targetHtml = path.join(config.dirPaths.temp, 'index.html');
  var injectScripts = gulp.src([
    path.join(config.dirPaths.src, 'app/**/*.module.js'),
    path.join(config.dirPaths.src, 'app/**/*.config.js'),
    path.join(config.dirPaths.src, 'app/**/*.js')
  ]);
  
  return gulp.src(targetHtml)
    .pipe(plugins.inject(injectScripts, config.jsInjectOptions))
    .pipe(plugins.inject(injectCss, config.cssInjectOptions))
    .pipe(gulp.dest(config.dirPaths.temp));
}); 

/*
 * lint js
 */
gulp.task('lint', () => {
  return gulp.src(config.srcFiles.js)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

/*
 * wiredep
 */
gulp.task('wiredep', () => {
  return gulp.src(path.join(config.dirPaths.src, '/index.html'))
    .pipe(wiredep(config.wiredepConfig))
    .pipe(gulp.dest(config.dirPaths.temp));
});

/*
 * watch
 */
gulp.task('watch', () => {
  gulp.watch('src/index.html', () => runSequence('copy-index-html', 'sass', 'wiredep', 'inject', 'reload'));
  gulp.watch(config.srcFiles.html, () => runSequence('reload'));
  gulp.watch(config.srcFiles.sass, () => runSequence('sass', 'inject', 'reload'));
  gulp.watch(config.srcFiles.js, () => runSequence('lint', 'inject', 'reload'));
});

/*
 * reload server
 */
gulp.task('reload', () => browserSync.reload());

/*
 * server config and task
 */
browserSync.use(spa({ selector: '[ng-app]' })); // needed for angular apps--manages history API

const devServers = [
  config.dirPaths.bower,
  config.dirPaths.temp,
  config.dirPaths.src
];

let browserSyncInit = (servers) => {
  browserSync({
    startPath: '/',
    server: servers
  });
};

gulp.task('serve', ['build', 'watch'], () => browserSyncInit(devServers)); 


