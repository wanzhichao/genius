var gulp = require("gulp");
var webpack = require("webpack");
var path = require('path');
var fs = require('fs');

// Plugins
var uglify = require('gulp-uglify');
var wrapper = require('gulp-wrapper');
var webpackConfig = require('./webpack.config.js');
var browserSync = require('browser-sync');
/**
 * [projectConfig 项目设置]
 */
var projectConfig = {
    // 项目名称
    name: '牛人慧投',
    // 项目开发者
    author: 'udc-mobile',
    // 发布路径
    releasePath: 'udc-active/2016/monkeykiss'
};

/**
 * [projectUtil 工具类]
 */
var projectUtil = {
    // 格式化路径
    fomartPath: function (pathStr) {
        return pathStr.replace(/\\/g, '\/');
    },
    // 获取当前目录
    getCurrentDir: function () {
        return fs.realpathSync('./');
    },
    // 获取release根目录
    getSvnRoot: function () {
        var currentDir = this.getCurrentDir();
        var svnRoot = currentDir.replace(/develop\S*/g, '');
        svnRoot = this.fomartPath(svnRoot);
        return svnRoot;
    },
    // 获取发布目录
    getReleasePath: function () {
        var svnRoot = this.getSvnRoot();
        var releasePath = projectConfig.releasePath;
        var targetPath = path.join(svnRoot, 'release', releasePath);
        return targetPath;
    },
    // 获取当前时间
    getNowDate: function () {
        var nowDate = new Date();
        now = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getMinutes();
        return now;
    },
    // 删除文件夹
    deleteDir: function (path) {
        var _this = this;
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    _this.deleteDir(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
};

//执行webpack
gulp.task('webpack', function() {
    webpack(webpackConfig, function(err, stats) {
       /* if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", 'webpack is  OK!');*/
        //gulp.start(['addmd5']);   //开发环境不加MD5，因为watch 监控，MD5实时打包就出错误！
    })
});
/**
 * 单步任务
 */

// css
gulp.task('css', function () {
    gulp.src([
            'build/*.css',
            '!css/**/*.min.css'
        ])
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('newbuild'))
});

// uglify javascript
gulp.task('js', function () {
    gulp.src([
            'build/js/*.js',
            'build/*.js',
            'js/*.js'
        ])
        .pipe(uglify({
            mangle: {
                except: ['jQuery', '$', 'require']
            },
            output: {
                ascii_only: true
            }
        }))
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('newbuild/js'))
});

gulp.task('js-m', function () {
    gulp.src([
            'build/js/*.js',
            'build/*.js'
        ])
        .pipe(wrapper({
            header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
        }))
        .pipe(gulp.dest('newbuild/js'))
});

// html
gulp.task('html', function () {
    gulp.src([
            'build/html/*.html'
        ])
        .pipe(gulp.dest('newbuild/html'))
});
//data
gulp.task('html', function () {
    gulp.src([
            'build/html/*.html'
        ])
        .pipe(gulp.dest('newbuild/html'))
});

//移动文件
gulp.task('moveFiles', function () {
    gulp.src([
            'build/css/img/*.png',
            'build/css/img/*.jpg'
        ])
        .pipe(gulp.dest('newbuild/css/img'));
    gulp.src([
            'build/css/fonts/*.*'
        ])
        .pipe(gulp.dest('newbuild/css/fonts'));
    gulp.src([
            'images/*.*'
        ])
        .pipe(gulp.dest('newbuild/images'));
    gulp.src([
            'data/*.*'
        ])
        .pipe(gulp.dest('newbuild/data'));
});


/*

// 发布到发布目录
gulp.task('releaseBuild', function () {
    // 删除发布目录
    projectUtil.deleteDir(projectUtil.getReleasePath());
    // 复制build至 发布目录
    gulp.src([
        'build/css/!**!/!*.*'
    ]).pipe(gulp.dest(projectUtil.getReleasePath() + '/css'));
    gulp.src([
        'build/js/!**!/!*.*'
    ]).pipe(gulp.dest(projectUtil.getReleasePath() + '/js'));
    gulp.src([
        'build/images/!**!/!*.*'
    ]).pipe(gulp.dest(projectUtil.getReleasePath() + '/images'));

    gulp.src([
            'build/html/!*.*'
        ])
        .pipe(gulp.dest(projectUtil.getReleasePath() + '/html'));
});

*/

// task build 打包流程
gulp.task('build', function () {
    gulp.run([ 'css', 'js', 'moveFiles', 'html']);
});

/*// task build-m 打包流程
gulp.task('build-m', function () {
    gulp.run(['deleteBuild', 'css', 'js-m', 'moveFiles', 'html']);
});

// task release 发布流程
gulp.task('release', function () {
    gulp.run(['releaseBuild']);
});*/
gulp.task('server', function () {
    var files = [
        'newbuild/html/*.html',
        'newbuild/*.css',
        'newbuild/css/img/*.*',
        'newbuild/js/*.js',
        'app/data/*.json'
    ];
    /*gulp.run(['tmod']);
     gulp.watch(files, ['tmod']);*/
    browserSync.init(files, {
        server: {
            baseDir: './',
            directory: true
        }
    });
});

