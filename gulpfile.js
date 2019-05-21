
'use strict'

const gulp = require ('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const cssnano = require('gulp-cssnano');
const del = require('del');
const pug = require('gulp-pug');
const prettify = require('gulp-jsbeautifier');
const newer = require('gulp-newer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const bulkSass = require('gulp-sass-bulk-import');


gulp.task('html', function(){
return gulp.src("src/pages/*.pug")
  .pipe(pug())
  .pipe(prettify({
    braceStyle: 'expand',
    indentWithTabs: true,
    indentInnerHtml: true,
    preserveNewlines: true,
    endWithNewline: true,
    wrapLineLength: 120,
    maxPreserveNewlines: 50,
    wrapAttributesIndentSize: 1,
    unformatted: ['use'],
  }))
  .pipe(gulp.dest('dist'))
});

gulp.task('sass', function(){
    return gulp.src("src/style/main.scss")
        .pipe(sourcemaps.init())
        .pipe(bulkSass())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 10'] }))
        .pipe(cssnano({ zIndex: false }))
        .pipe(sourcemaps.write('.'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/style"))
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/resources/images/icons/*.png')
    .pipe(spritesmith({
      imgName: 'icons.png',
      cssName: 'icons.min.css',
      cssOpts: { cssSelector: function (sprite) { return '.' + sprite.name; } },
      imgPath: '../images/icons.png'
    }));

  var imgStream = spriteData.img
    .pipe(gulp.dest('dist/images'));
  var cssStream = spriteData.css
    // .pipe(replace(/^\.icon-/gm, '.'))
    .pipe(cssnano({ zIndex: false }))
    .pipe(gulp.dest('dist/style'));

  return (imgStream, cssStream);
});

gulp.task('clean', function() {
  return del('build')
});


gulp.task('resources', function() {
  return gulp.src(['src/resources/**', '!src/resources/images/icons/**.png'], {since: gulp.lastRun('resources')})
      .pipe(newer('dist/'))
      .pipe(gulp.dest('dist/'))
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**', {since: gulp.lastRun('scripts')})
      .pipe(newer('dist'))
      .pipe(gulp.dest('dist/scripts'))
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('sass','html','resources','scripts', 'sprite'))
);

gulp.task('watch', function() {
  gulp.watch('src/style', gulp.series('sass'))
  gulp.watch('src/resources/', gulp.series('resources'))
  gulp.watch('src/', gulp.series('html'))
  gulp.watch('src/scripts/', gulp.series('scripts'))
  gulp.watch('src/images', gulp.series('sprite'))
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'dist'
  });

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build',gulp.parallel('watch', 'serve')));
gulp.task('default', gulp.series('dev'));
