'use strict';

import gulp from 'gulp';
import grunt from 'grunt';

const serverPath = 'server';
const paths = {};

grunt.initConfig({
    buildcontrol: {
        options: {
            dir: serverPath,
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

gulp.task('deploy', target => {
    switch (target) {
        case 'testing':
        default:
            runSequence('buildcontrol:testing');
            break;
    }
});
