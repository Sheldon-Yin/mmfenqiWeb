/**
 * Created by sheldon on 2016/7/7.
 */
'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var babel = require("gulp-babel");
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
    gulp.run('component', 'container','service');
});


//npm install gulp-react gulp-babel babel-preset-es2015 babel-preset-react gulp-watch gulp-plumber gulp-uglify

gulp.task('container', function () {
    return watch('src/container/*.jsx', function () {
        console.log('开始编译');
        gulp.src('src/container/*.jsx')
            .pipe(plumber()) //plumber给pipe打补丁
            .pipe(babel({
                presets: ['react', 'es2015']
            }))
            .pipe(react())
            .pipe(uglify())
            .pipe(gulp.dest('build/container'))
            .on('end', function () {
                console.log('...........成功')
            });
    })
});

gulp.task('component', function () {
    return watch('src/component/*.jsx', function () {
        console.log('开始编译');
        gulp.src('src/component/*.jsx')
            .pipe(plumber()) //plumber给pipe打补丁
            .pipe(babel({
                presets: ['react', 'es2015']
            }))
            .pipe(react())
            .pipe(uglify())
            .pipe(gulp.dest('build/component'))
            .on('end', function () {
                console.log('..........成功')
            });
    })
});

gulp.task('service', function () {
    return watch('src/service/*.jsx', function () {
        console.log('开始编译');
        gulp.src('src/service/*.jsx')
            .pipe(concat('service.js'))
            .pipe(plumber()) //plumber给pipe打补丁
            .pipe(babel({
                presets: ['react', 'es2015']
            }))
            .pipe(react())
            .pipe(uglify())
            .pipe(gulp.dest('build/service'))
            .on('end', function () {
                console.log('..........成功')
            });
    })
});