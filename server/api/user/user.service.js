'use strict';

let models = require('../../sqldb');
let User = models.User;
let Role = models.Role;
let Profile = models.Profile;

export function getAll() {
    return User.findAndCountAll({
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

export function getByUuid(userUuid) {
    return User.findOne({
        where: {uuid: userUuid},
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

export function getById(userId) {
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

export function getByEmail(userEmail) {
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

export function create(data) {}
export function update(data) {}
export function softDeleteByUuid(uuid) {}
