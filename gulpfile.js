'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const grunt = require('grunt');
const runSequence = require('run-sequence');
const babel = require('gulp-babel');

const serverPath = 'server';
const paths = {
    server: {
        scripts: [
            `${serverPath}/**/!(*.spec|*.integration).js`,
            `!${serverPath}/config/local.env.sample.js`,
            `!${serverPath}/config/local.env.js`,
            `!${serverPath}/config/production.env.js`
        ],
        json: [`${serverPath}/**/*.json`],
    },
    dist: 'dist'
};

gulp.task('transpile:server', () => {
    return gulp.src(_.union(paths.server.scripts, paths.server.json))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(`${paths.dist}/${serverPath}`));
});

gulp.task('copy:server', () => {
    return gulp.src([
        'package.json'
    ], {cwdbase: true})
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build', cb => {
    runSequence([
        'transpile:server',
        'copy:server'
    ], cb);
});

grunt.loadNpmTasks('grunt-build-control');

grunt.initConfig({
    buildcontrol: {
        options: {
            dir: 'dist',
            commit: true,
            push: true,
            connectCommits: false,
            message: 'Build %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        testing: {
            options: {
                remote: 'https://git.heroku.com/gc-orders-testing.git',
                branch: 'master'
            }
        }
    }
});

gulp.task('deploy', done => {
    grunt.tasks(
        ['buildcontrol:testing'], // you can add more grunt tasks in this array
        {gruntfile: false}, // don't look for a Gruntfile - there is none. :-)
        () => {
            done();
        }
    );
});
