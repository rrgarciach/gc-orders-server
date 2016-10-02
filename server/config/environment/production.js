'use strict';

const CONFIG = require('../local.env');
const DB_CONFIG = CONFIG.SEQUELIZE;

// Production environment configurations
module.exports = {

    // Server IP
    IP: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

    // Server port
    PORT: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,

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

    SEED_DB: CONFIG.SEED_DB,

};
