'use strict';

let gulp = require('gulp');
let Sequelize = require('sequelize');

const CONFIG = require('../config/environment');
const DB_CONFIG = CONFIG.SEQUELIZE;

let sequelize;
if (DB_CONFIG.use_env_variable) {
  sequelize = new Sequelize(process.env[DB_CONFIG.use_env_variable]);
} else {
  sequelize = new Sequelize(DB_CONFIG.database, DB_CONFIG.username, DB_CONFIG.password, DB_CONFIG.options);
}

const gulpSequelize = require('gulp-sequelize')(sequelize);

// Sequelize migration tasks for Gulp:
gulp.task('up', gulpSequelize.up);
gulp.task('down', gulpSequelize.down);
gulp.task('pending', gulpSequelize.pending);
gulp.task('executed', gulpSequelize.executed);

module.exports = gulpSequelize;
