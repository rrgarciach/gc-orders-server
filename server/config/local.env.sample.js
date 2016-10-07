'use strict';

module.exports = {

    SECRETS: {
        SESSION: 'orders-secret'
    },

    // your local MySQL credentials
    SEQUELIZE: {
        MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'string',
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'string',
        MYSQL_DB: process.env.MYSQL_DB || 'string',
        MYSQL_HOST: process.env.MYSQL_HOST || 'string'
    }

};
