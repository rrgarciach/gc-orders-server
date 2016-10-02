'use strict';

const gulp = require('gulp');
const grunt = require('grunt');

const serverPath = 'server';
const paths = {};

grunt.initConfig({
    buildcontrol: {
        options: {
            dir: './',
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

grunt.loadNpmTasks('grunt-build-control');

gulp.task('deploy', (target, done) => {
    switch (target) {
        case 'testing':
        default:
            grunt.tasks(
                ['buildcontrol:testing'],    //you can add more grunt tasks in this array
                {gruntfile: false}, //don't look for a Gruntfile - there is none. :-)
                () => {done();}
            );
            break;
    }
});
