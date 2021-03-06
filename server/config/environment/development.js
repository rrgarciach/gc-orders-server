'use strict';

let development;

try {
    const CONFIG = require('../local.env');
    const DB_CONFIG = CONFIG.SEQUELIZE;

    development = {

        // Sequelize connection options
        SEQUELIZE: {
            URI: 'mysql://',
            DATABASE: DB_CONFIG.MYSQL_DB,
            USERNAME: DB_CONFIG.MYSQL_USERNAME,
            PASSWORD: DB_CONFIG.MYSQL_PASSWORD,
            OPTIONS: {
                dialect: 'mysql',
                logging: console.info,
                host: DB_CONFIG.MYSQL_HOST,
                define: {
                    timestamps: false
                }
            }
        },

        // Seed database on startup
        SEED_DB: true

    };

} catch (e) {
    development = {};
}

// Development environment configurations
module.exports = development;
