// todo - npm uninstall unused packages

import gulp from 'gulp';

import path from 'path';

import del from 'del';

import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import exorcist from 'exorcist';
import notify from 'gulp-notify';
import source from 'vinyl-source-stream';
import transform from 'vinyl-transform';
import watchify from 'watchify';

import print from 'gulp-print';
import gutil from 'gulp-util';



export const ENV = process.env.NODE_ENV || 'development';
export const DIR_SRC = path.join(__dirname, 'lib/assets/src');
export const DIR_DIST = path.join(__dirname, 'public');
export const DIR_NPM = path.join(__dirname, 'node_modules');

export const DIR_TEST = path.join(__dirname, 'client/test_legacy');
export const DIR_DIST_TEST = path.join(DIR_TEST, '.tmp');

// export const DIR_SRC_STYLES = path.join(DIR_SRC, 'styles');
export const DIR_SRC_SCRIPTS = path.join(DIR_SRC, 'scripts');
// export const DIR_SRC_IMAGES = path.join(DIR_SRC, 'images');
export const DIR_DIST_STYLES = path.join(DIR_DIST, 'stylesheets');
export const DIR_DIST_SCRIPTS = path.join(DIR_DIST, 'javascripts');
export const DIR_DIST_IMAGES = path.join(DIR_DIST, 'images');

const jsSource = {
  dev: {
    name: 'dev',
    entry: DIR_SRC_SCRIPTS,
    build: 'index.js',
    dest: DIR_DIST_SCRIPTS
  },
};



function handleErrors() {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  gutil.log(gutil.colors.yellow(err.message));
  this.emit('end'); // Keep gulp from hanging on this task
}

function bundle(env, bundler, minify, catchErrors) {
  let result = bundler.bundle();
  if (catchErrors) {
    // Display errors to the user, and don't let them propagate.
    result = result.on('error', handleErrors);
  }
  result = result
    .pipe(source(env.build))
    .pipe(buffer())
    .pipe( print((file) => `Processing script: ${env.entry}/${file}`) );

  result = result
  // Extract the embedded source map to a separate file.
    .pipe(transform(function() { return exorcist(env.dest + '/' + env.build + '.map'); }))
    // Write the finished product.
    .pipe(gulp.dest(env.dest));

  return result;
}

function build_scripts(env) {
  return bundle(env, browserify({
      entries: env.entry,
      debug: true,
      paths: [
        `${DIR_SRC}/scripts/`
      ]
    })
    // .transform({continuous: true}, eslintify)
      .transform(babelify),
    true,
    false
  );
}

function watch_scripts(env) {
  const bundler = watchify(
    browserify({
      entries: env.entry,
      debug: true,
      cache: {},
      packageCache: {},
      paths: [
        `${DIR_SRC}/scripts/`
      ]
    })
    // .transform({continuous: true}, eslintify)
      .transform(babelify),
    {poll: 1000}
  );

  function rebundle(ids) {
    // Don't rebundle if only the version changed.
    if (ids && ids.length === 1 && (/\/version\.js$/).test(ids[0])) {
      return false;
    }
    const start = new Date();
    const result = bundle(env, bundler, false, true);

    result.on('end', function() {
      print('Rebuilt SCRIPT' + env.build + ' in ' + (new Date() - start) + ' milliseconds.');
    });

    return result;
  }

  bundler.on('update', rebundle);
  return rebundle();
}

function clean(files, done) {
  return del(files, done);
}


/**
 * Tasks
 */

gulp.task('clean', (done) => {
  return clean([
    DIR_DIST_STYLES + '/**/*', // don't remove the folder
    DIR_DIST_SCRIPTS + '/**/*', // don't remove the folder
    DIR_DIST_IMAGES + '/**/*' // don't remove the folder
  ], done);
});

gulp.task('clean:tests', (done) => {
  return clean([
    DIR_DIST_TEST
  ], done);
});


gulp.task('scripts', () => build_scripts(jsSource.dev));

gulp.task('scripts_watch', () => watch_scripts(jsSource.dev));



/**
 * Workflows
 */

gulp.task('build', gulp.series('clean', gulp.parallel('scripts')));

gulp.task('watch', gulp.series('build', gulp.parallel('scripts_watch')));
