var gulp = require('gulp');
var  browserify = require('browserify');
var sequence = require('run-sequence').use(gulp);
var watchify = require('watchify');
var babel = require("gulp-babel");
var fs = require('fs');

gulp.task('default', function () {
  // console.log(gulp)
  sequence('babel', 'authorize', 'babelWatch')
})
gulp.task('design',function () {
  var b = browserify({
    entries: ['bulid/js/main.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  function bundle() {
    b.bundle().on('error', console.error).pipe(fs.createWriteStream('Workbench.js'));
    gulp.src('WebRoot/index.html').pipe(connect.reload())
  }
  bundle()
  b.on('update', bundle);
});
gulp.task('babel', function () {
  gulp.src(['./WebRoot/resource/js/main.js', './WebRoot/resource/design/js/*.js', './WebRoot/resource/page/js/setData.js', './WebRoot/resource/page/js/component/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('./bulid/js'))
});
gulp.task('authorize', function () {
  gulp.src(['./WebRoot/resource/plugins/authorize/authorize.js'])
  .pipe(babel())
  .pipe(gulp.dest('./bulid/authorize'))
});
gulp.task('babelWatch', function () {
  gulp.watch(['WebRoot/resource/js/main.js', 'WebRoot/index.html'], function () {
    sequence('babel', 'authorize')
  })
});