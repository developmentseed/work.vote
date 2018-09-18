'use strict';

var fs = require('fs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var log = require('fancy-log');
var exit = require('gulp-exit');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var SassString = require('node-sass').types.String;
var notifier = require('node-notifier');
var historyApiFallback = require('connect-history-api-fallback')

// /////////////////////////////////////////////////////////////////////////////
// --------------------------- Variables -------------------------------------//
// ---------------------------------------------------------------------------//

// The package.json
var pkg;

// /////////////////////////////////////////////////////////////////////////////
// ------------------------- Helper functions --------------------------------//
// ---------------------------------------------------------------------------//

function readPackage() {
  pkg = JSON.parse(fs.readFileSync('package.json'));
}
readPackage();

// /////////////////////////////////////////////////////////////////////////////
// ------------------------- Callable tasks ----------------------------------//
// ---------------------------------------------------------------------------//

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('serve', ['vendorScripts', 'javascript', 'styles'], function() {
  browserSync({
    port: 3000,
    server: {
      baseDir: ['.tmp', 'app'],
      middleware: [historyApiFallback()],
      routes: {
        '/node_modules': './node_modules'
      }
    }
  });

  // watch for changes
  gulp.watch(['app/*.html']).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('package.json', ['vendorScripts']);
});

gulp.task('clean', function() {
  return del(['.tmp', 'dist']).then(function() {
    $.cache.clearAll();
  });
});

// /////////////////////////////////////////////////////////////////////////////
// ------------------------- Browserify tasks --------------------------------//
// ------------------- (Not to be called directly) ---------------------------//
// ---------------------------------------------------------------------------//

// Compiles the user's script files to bundle.js.
// When including the file in the index.html we need to refer to bundle.js not
// main.js
gulp.task('javascript', function() {
  var watcher = watchify(
    browserify({
      entries: ['./app/scripts/main.js'],
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    }),
    { poll: true }
  );

  function bundler() {
    if (pkg.dependencies) {
      watcher.external(Object.keys(pkg.dependencies));
    }
    return (
      watcher
        .bundle()
        .on('error', function(e) {
          notifier.notify({
            title: 'Oops! Browserify errored:',
            message: e.message
          });
          console.log('Javascript error:', e);
          // Allows the watch to continue.
          this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        // Source maps.
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({ stream: true }))
    );
  }

  watcher.on('log', log).on('update', bundler);

  return bundler();
});

// Vendor scripts. Basically all the dependencies in the package.js.
// Therefore be careful and keep the dependencies clean.
gulp.task('vendorScripts', function() {
  // Ensure package is updated.
  readPackage();
  var vb = browserify({
    debug: true,
    require: pkg.dependencies ? Object.keys(pkg.dependencies) : []
  });
  return vb
    .bundle()
    .on('error', log.bind(log, 'Browserify Error'))
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp/scripts/'))
    .pipe(reload({ stream: true }));
});

// //////////////////////////////////////////////////////////////////////////////
// --------------------------- Helper tasks -----------------------------------//
// ----------------------------------------------------------------------------//

gulp.task('build', ['vendorScripts', 'javascript'], function() {
  gulp.start(['html', 'extras'], function() {
    return gulp
      .src('dist/**/*')
      .pipe($.size({ title: 'build', gzip: true }))
      .pipe(exit());
  });
});

gulp.task('styles', function() {
  return gulp
    .src('app/styles/main.scss')
    .pipe(
      $.plumber(function(e) {
        notifier.notify({
          title: 'Oops! Sass errored:',
          message: e.message
        });
        console.log('Sass error:', e.toString());
        // Allows the watch to continue.
        this.emit('end');
      })
    )
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: 'expanded',
        precision: 10,
        functions: {
          'urlencode($url)': function(url) {
            var v = new SassString();
            v.setValue(encodeURIComponent(url.getValue()));
            return v;
          }
        },
        includePaths: ['.'].concat(require('node-bourbon').includePaths)
      })
    )
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({ stream: true }));
});

gulp.task('html', ['styles'], function() {
  return (
    gulp
      .src('app/*.html')
      .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
      // Do not compress comparisons, to avoid MapboxGLJS minification issue
      // https://github.com/mapbox/mapbox-gl-js/issues/4359#issuecomment-286277540
      // .pipe($.if('*.js', $.uglify({ compress: { comparisons: false } })))
      .pipe($.if('*.css', $.csso()))
      .pipe($.if(/\.(css|js)$/, rev()))
      .pipe(revReplace())
      .pipe(gulp.dest('dist'))
  );
});

gulp.task('extras', function() {
  return gulp
    .src(
      [
        'app/**/*',
        '!app/*.html',
        '!app/vendor/**',
        '!app/styles/**',
        '!app/scripts/**'
      ],
      {
        dot: true
      }
    )
    .pipe(gulp.dest('dist'));
});
