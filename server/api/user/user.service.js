'use strict';

let User = require('./user.model');

let userService = {
    getById,
    getByEmail,
};

function getById(userId) {
    return {
        _id: userId,
        email: 'user@example.com',
        role: {
            name: 'sales'
        }
    }
}

function getByEmail(userEmail) {
    return {
        _id: 1,
        email: userEmail,
        role: {
            name: 'sales'
        }
    }
}

module.exports = userService;
