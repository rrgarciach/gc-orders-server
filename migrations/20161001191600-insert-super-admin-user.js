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
                console.info('Inserting Super Admin User and its Profile...');

                let promises = [];

                let user = {
                    _id: 1,
                    email: 'superadmin@example.com',
                    password: 'SAKvJGGBQ0kMv3kLOAJ+HfX2xXU8Th9Rt8SR5aOaCjX2QtG+rZoPqrh1R7vpeIRHndk5AllfdCBETv5Ymx8dEg==',
                    profile__id: 1,
                    role__id: 1,
                    enabled: true,
                    salt: 'fZx0l8aaPoCemuARm6sq0A==',
                    deleted_at: null,
                    profile: {
                        _id: 1,
                        first_name: 'John',
                        last_name: 'Doe',
                        rfc: '',
                        street: 'Faker street',
                        number: '123',
                        int_number: '2-A',
                        neighborhood: 'Los Alamos',
                        zip: 99999,
                        county: 'Dallas',
                        city: 'Springfield',
                        state: 'TX',
                        phone: '9729813210',
                        phone2: '9721234321',
                        deleted_at: null
                    }
                };

                promises.push(Profile.upsert(user.profile));
                promises.push(User.upsert(user));

                return q.all(promises)
                    .then(() => {
                        console.info('Finished inserting Super Admin User and its Profile');
                    });

            });
    },

    down: function (queryInterface, Sequelize) {
        console.info('Removing Super Admin User and its Profile...');
        return User.destroy({
            where: {
                email: 'superadmin@example.com'
            }
        })
            .then(() => {
                return Profile.destroy({
                    where: {
                        _id: 1
                    }
                })
            })
            .then(() => {
                console.info('Finished removing Super Admin User and its Profile');
            });
    }

};
