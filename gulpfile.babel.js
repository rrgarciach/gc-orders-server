'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const grunt = require('grunt');
import gulpLoadPlugins from 'gulp-load-plugins';
const runSequence = require('run-sequence');
const babel = require('gulp-babel');

var plugins = gulpLoadPlugins();

const serverPath = 'server';
const paths = {
    server: {
        productionEnv: [`${serverPath}/config/production.env.js`],
        scripts: [
            `${serverPath}/**/!(*.spec|*.integration).js`,
            `!${serverPath}/config/local.env.sample.js`,
            `!${serverPath}/config/local.env.js`,
            `!${serverPath}/config/production.env.js`
        ],
        migrations: ['migrations/**/*.js'],
        json: [`${serverPath}/**/*.json`],
        test: {
            integration: [`${serverPath}/**/*.integration.js`, 'mocha.global.js'],
            unit: [`${serverPath}**/*.spec.js`, 'mocha.global.js'],
            coverage: [`${serverPath}/**/*.spec.js`]
        }
    },
    karma: 'karma.conf.js',
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

gulp.task('copy:migrations', () => {
    return gulp.src(paths.server.migrations)
        .pipe(gulp.dest(`${paths.dist}/migrations`));
});

gulp.task('copy:productionenv', () => {
    return gulp.src(paths.server.productionEnv)
        .pipe(plugins.rename(`server/config/local.env.js`))
        .pipe(gulp.dest("./dist"));
});

gulp.task('build', cb => {
    runSequence([
        'transpile:server',
        'copy:server',
        'copy:migrations',
        'copy:productionenv'
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
                remote: 'https://git.heroku.com/gc-orders-development.git',
                branch: 'master'
            }
        }
    }
});

gulp.task('deploy', ['build'], done => {
    grunt.tasks(
        ['buildcontrol:testing'], // you can add more grunt tasks in this array
        {gruntfile: false}, // don't look for a Gruntfile - there is none. :-)
        () => {
            done();
        }
    );
});
