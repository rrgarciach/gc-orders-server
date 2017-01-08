'use strict';

let production;

try {
    const CONFIG = require('../local.env');
    const DB_CONFIG = CONFIG.SEQUELIZE;

    production = {
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

        SEED_DB: CONFIG.SEED_DB,

    };

} catch(e) {
    production = {};
}

// Production environment configurations
module.exports = production;
