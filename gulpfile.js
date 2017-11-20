/*
 * @gulp：自动化任务
 */
var gulp = require('gulp');
var rm = require('del'); //删除文件
var browserSync = require('browser-sync');
var reload = browserSync.reload; //自动刷新,从此不用F5
var htmlmin = require('gulp-htmlmin'); //压缩html
var miniCSS = require('gulp-clean-css'); //压缩css
var miniJS = require('gulp-uglify'); //压缩js
var replace = require('gulp-replace');
var cssBase64 = require('gulp-base64'); //将小图背景图转为base64的形式
var imagemin = require('gulp-imagemin');
var fileinclude  = require('gulp-file-include');

/*清除产出目录*/
gulp.task('clear-dir', function() {
    rm.sync(['dist/**']);
    rm.sync(['staticPub/**']);
})

//引入配置文件
var config = require('./config.js');
var cdn = config.cdn[0];
var cdn1 = config.cdn[1];

// 公用头部
/*
 * html压缩
 * 干掉http:和https:协议名
 * 替换掉路径
 */
 
gulp.task('mini-html', function() {
    return gulp.src('src/html/**')
        .pipe(replace('http://', '//'))
        .pipe(replace('https://', '//'))
        .pipe(replace('projeact', cdn1)) //其他的域名
        .pipe(replace(/\.\.\/(images\/\S+\.(png|gif|jpg|webp))/g, function(all, str) {
            return (cdn + str);
        }))
        .pipe(replace(/\.\.\/(css\/\S+\.(css|less|scss))/g, function(all, str) {
            return (cdn + str);
        }))
        .pipe(replace(/\.\.\/(js\/\S+\.(js))/g, function(all, str) {
            return (cdn + str);
        }))
        .pipe(htmlmin({
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS                          
        }))
        // .pipe(fileinclude({
        //     prefix: '@@',
        //     basepath: 'src/html/include'
        //   }))
        .pipe(gulp.dest('dist/html'))
})




/*图片产出*/
gulp.task('images', function() {
    return gulp.src('src/images/*')
        // 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images/'))
})



/*css压缩*/
gulp.task('mini-css', function() {
    return gulp.src('src/css/**.css')
        .pipe(cssBase64({
            maxImageSize: 8 * 1024 //小于8k的图转为base64
        }))
        .pipe(replace(/\.\.\/(images\/\S+\.(png|gif|jpg|webp))/g, function(all, str) {
            return (cdn + str);
        }))
        .pipe(miniCSS({ compatibility: 'ie6' }))
        .pipe(gulp.dest('dist/css/'))
})


/* 
 * js压缩
 * 干掉http:和https:协议名
 */
gulp.task('mini-js', function() {
    return gulp.src('src/js/**')
        .pipe(replace('http://', '//'))
        .pipe(replace('https://', '//'))
        .pipe(miniJS())
        .pipe(gulp.dest('dist/js/'))
})


/*自动刷新*/
gulp.task('server', function() {
    browserSync({
        ui: false,
        server: {
            baseDir: 'src',
            directory: true
        },
        notify: false,
        ghostMode: false,
        port: 8080,
        open: "external"
    }, function(err, arg) {
        console.log('无需再按F5刷新啦！！');
    })
})


/*开发环境*/
gulp.task('dev', [
    'server'
   
], function() {
    gulp.watch('src/html/*.html', reload);
    gulp.watch('src/js/**', reload);
   
})


/*生产环境*/
gulp.task('produce', [
    'clear-dir',
    'mini-html',   
    'mini-css',
    'mini-js',
    'images'
   
], function() {
    /*
     * 二次产出，可以做其他操作。
     */
})