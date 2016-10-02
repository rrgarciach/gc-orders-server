'use strict';

let models = require('../../sqldb');
let User = models.User;
let Role = models.Role;
let Profile = models.Profile;

let userService = {
    getById,
    getByEmail,
};

function getById(userId) {
    return User.findOne({
        where: {_id: userId},
        include: [
            {
                model: Role,
                attributes: ['name'],
                as: 'role'
            }, {
                model: Profile,
                attributes: ['first_name'],
                as: 'profile'
            }
        ]
    });
}

function getByEmail(userEmail) {
    console.log(User)
    return User.findOne({
        where: {email: userEmail},
        include: [
            {
                model: Role,
                attributes: ['name'],
                as: 'role'
            }, {
                model: Profile,
                attributes: ['first_name'],
                as: 'profile'
            }
        ]
    });
}

module.exports = userService;
