let {src,dest,watch} = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin');


function fnCopy(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
function fnCss(){
    return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
function fnJs(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets : ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
        suffix : '.min'
    }))
    .pipe(dest('./dist/js'));
}
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
function fnLib(){
    return src('./src/lib/*')
    .pipe(dest('./dist/lib'));
}
function fnHtml(){
    return src('./src/html/*.html')
    .pipe(dest('./dist/html'));
}
function fnWatch(){
    watch('./src/index.html',fnCopy);
    watch('./src/sass/*.scss',fnCss);
    watch('./src/js/*.js',fnJs);
    watch('./src/img/*',fnImg);
    watch('./src/html/*.html',fnHtml);
}

exports.copy = fnCopy;
exports.css = fnCss;
exports.js = fnJs;
exports.html = fnHtml;
exports.img = fnImg;
exports.lib = fnLib;
exports.default = fnWatch;