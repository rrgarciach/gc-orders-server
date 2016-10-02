'use strict';

let q = require('q');
let models = require('../server/sqldb');
let User = models.User;
let Profile = models.Profile;
let Role = models.Role;

module.exports = {

    up: function (queryInterface, Sequelize) {
        console.info('Inserting Roles...');

        let roles = [
            {_id: 1, name: 'super_admin', description: 'Super Admin user'},
            {_id: 2, name: 'admin', description: 'Admin user'},
            {_id: 3, name: 'manager', description: 'Manager user'},
            {_id: 4, name: 'sales', description: 'Sales user'},
            {_id: 5, name: 'client', description: 'Client user'},
        ];

        Role.bulkCreate(roles)
            .then(() => {
                console.info('Finished inserting Roles');
            });
    },

    down: function (queryInterface, Sequelize) {
        console.info('Removing Roles...');
        return Profile.destroy({
            where: {
                _id: 1
            }
        })
            .then(() => {
                console.info('Finished Roles');
            });
    }

};
