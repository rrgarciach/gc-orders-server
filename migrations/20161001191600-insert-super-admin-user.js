'use strict';

let q = require('q');
let models = require('../server/sqldb');
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
        return Roles.destroy({
            where: {
                _id: {
                    $in: [1, 2, 3, 4, 5]
                }
            }
        })
            .then(() => {
                console.info('Finished Roles');
            });
    }

};
