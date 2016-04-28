/**
 * Created by sheldon on 2016/4/28.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var notify = require('gulp-notify');//提示信息

// 检查脚本
gulp.task('lint', function () {
    gulp.src('./app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//// 编译Sass
//gulp.task('sass', function () {
//    gulp.src('./app/css/*.css')
//        .pipe(sass())
//        .pipe(gulp.dest('./css'))
//});


//压缩css
gulp.task('minifycss', function () {
    return gulp.src('./app/css/*.css')      //压缩的文件
        //.pipe(gulp.dest('./build/css'))   //输出文件夹
        .pipe(concat('core.css'))
        .pipe(minifycss())  //执行压缩
        //.pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./build'))
});

// 合并，压缩文件
gulp.task('scripts', function () {
    gulp.src('./app/js/common/*.js')
        .pipe(concat('ga.js'))
        //.pipe(gulp.dest('./dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build'))
});

//gulp.task('html', function () {
//    gulp.src('./app/**/*.html')
//        //.pipe(concat('all.js'))
//        //.pipe(gulp.dest('./dist/js'))
//        //.pipe(rename('all.min.js'))
//        .pipe(htmlmin())
//        .pipe(gulp.dest('./build'))
//});

//// 压缩图片
//gulp.task('img', function () {
//    return gulp.src('app/**/*')
//        .pipe(imagemin({
//            progressive: true,
//            svgoPlugins: [{removeViewBox: false}],
//            use: [pngcrush()]
//        }))
//        .pipe(gulp.dest('./build'))
//});


// 默认任务
gulp.task('default', function () {
    gulp.run('lint',  'scripts', 'minifycss');

    // 监听文件变化
    gulp.watch('./build', function () {
        gulp.run('lint',  'scripts', 'minifycss');
    });
});