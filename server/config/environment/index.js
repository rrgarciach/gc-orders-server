'use strict';

const path = require('path');
const _ = require('lodash');

let all = {
    ENV: process.env.NODE_ENV,

    PORT: process.env.PORT || 9000,

    IP: process.env.IP || '0.0.0.0',

    SECRETS: {
        SESSION: process.env.SESSION || 'orders-secret'
    },

    // Sequelize connection options
    SEQUELIZE: {
        URI: 'mysql://',
        DATABASE: process.env.MYSQL_DB,
        USERNAME: process.env.MYSQL_USERNAME,
        PASSWORD: process.env.MYSQL_PASSWORD,
        OPTIONS: {
            dialect: 'mysql',
            logging: console.info,
            host: process.env.MYSQL_HOST,
            define: {
                timestamps: false
            }
        }
    },

    SEED_DB: false, // value by default (can be overridden in local.env.js)
};

module.exports = _.merge(
    all,
    require(`./${process.env.NODE_ENV}.js`)
);
