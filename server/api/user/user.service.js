'use strict';

let User = require('./user.model');
let q = require('q');

let userService = {
    getById,
    getByEmail,
};

let mockUser = {
    _id: 1,
    email: 'user@example.com',
    role: {
        name: 'sales'
    },
    authenticate: function (pass, cb) {
        return cb(false, true);
    }
};

function getById(userId) {
    let deferred = q.defer();
    deferred.resolve(mockUser);
    return deferred.promise;
}

function getByEmail(userEmail) {
    let deferred = q.defer();
    deferred.resolve(mockUser);
    return deferred.promise;
}

module.exports = userService;
