'use strict';

const path = require('path');
const _ = require('lodash');

let all = {
    ENV: process.env.NODE_ENV,

    PORT: process.env.PORT || 9000,

    IP: process.env.IP || '0.0.0.0',

    SECRETS: {
        SESSION: 'orders-secret'
    },

    SEED_DB: false
};

module.exports = _.merge(
    all
    // require(`./${process.env.NODE_ENV}.js`)
);
