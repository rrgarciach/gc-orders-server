'use strict';

let path = require('path');
let CONFIG = require('../config/environment');
let Sequelize = require('sequelize');

var db = {
    Sequelize,
    sequelize: new Sequelize(
        CONFIG.SEQUELIZE.MYSQL_DB,
        CONFIG.SEQUELIZE.MYSQL_USERNAME,
        CONFIG.SEQUELIZE.MYSQL_PASSWORD,
        config.sequelize.options
    )
};

// Insert Sequelize models below:
db.Academy = db.sequelize.import('../api/user/user.model');

// Register associations for each model (if it does applies):
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
