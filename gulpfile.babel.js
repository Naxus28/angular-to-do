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
    wiredep = require('wiredep').stream;

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
  let jsSource = gulp.src(config.srcFiles.js, { read: false });
  let cssSource = gulp.src(path.join(config.dirPaths.temp, 'styles', config.fileTypesForBuilds.dev.css), { read: false });
  let targetHtml = path.join(config.dirPaths.temp, 'index.html');

  return gulp.src(targetHtml)
    .pipe(plugins.inject(jsSource, config.jsInjectOptions))
    .pipe(plugins.inject(cssSource, config.cssInjectOptions))
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
gulp.task('wiredep', function () {
  return gulp.src(path.join(config.dirPaths.src, '/index.html'))
    .pipe(wiredep(config.wiredepConfig))
    .pipe(gulp.dest(config.dirPaths.temp));
});

/*
 * watch
 */
gulp.task('watch', () => {
  gulp.watch(config.srcFiles.html, () => runSequence('inject', 'reload'));
  gulp.watch(config.srcFiles.sass, () => runSequence('sass', 'inject', 'reload'));
  gulp.watch(config.srcFiles.js, () => runSequence('lint', 'inject', 'reload'));
});

/*
 * reload servers
 */
gulp.task('reload', () => browserSync.reload());

/*
 * server config and task
 */
const devServers = [
  'bower_components',
  config.dirPaths.temp,
  config.dirPaths.src
];

let browserSyncInit = (devServers) => {
  browserSync({
    server: [...devServers]
  });
};

gulp.task('serve', ['build', 'watch'], () => browserSyncInit(devServers)); 




