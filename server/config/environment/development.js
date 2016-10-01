'use strict';

const CONFIG = require('../local.env');
const DB_CONFIG = CONFIG.SEQUELIZE;

// Development environment configurations
module.exports = {

    // Sequelize connection options
    SEQUELIZE: {
        URI: 'mysql://',
        DATABASE: DB_CONFIG.MYSQL_DB,
        USERNAME: DB_CONFIG.MYSQL_USERNAME,
        PASSWORD: DB_CONFIG.MYSQL_PASSWORD,
        OPTIONS: {
            DAILECT: 'mysql',
            LOGGING: console.info,
            HOST: DB_CONFIG.MYSQL_HOST,
            DEFINE: {
                TIMESTAMPS: false
            }
        }
    },

    // Seed database on startup
    SEED_DB: true

};
