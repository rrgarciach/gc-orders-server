'use strict';

let path = require('path');
let Sequelize = require('sequelize');
const CONFIG = require('../config/environment');

var db = {
    Sequelize,
    sequelize: new Sequelize(
        CONFIG.SEQUELIZE.DATABASE,
        CONFIG.SEQUELIZE.USERNAME,
        CONFIG.SEQUELIZE.PASSWORD,
        CONFIG.SEQUELIZE.OPTIONS
    )
};

// Insert Sequelize models below:
db.User = db.sequelize.import('../api/user/user.model');
db.Profile = db.sequelize.import('../api/profile/profile.model');
db.Role = db.sequelize.import('../api/role/role.model');

// Register associations for each model (if it does applies):
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
