'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        console.info('Creating Roles table...');

        return queryInterface.createTable('Roles', {
            _id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.STRING,
            description: Sequelize.STRING
        })
            .then(() => {
                console.info('Creating Profiles table...');

                return queryInterface.createTable('Profiles',
                    {
                        _id: {
                            type: Sequelize.INTEGER,
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        uuid: {
                            type: Sequelize.UUID,
                            defaultValue: Sequelize.UUIDV4
                        },
                        rfc: {
                            type: Sequelize.STRING,
                            defaultValue: 'XAXX010101000',
                        },
                        first_name: Sequelize.STRING,
                        last_name: Sequelize.STRING,
                        street: Sequelize.STRING,
                        number: Sequelize.STRING,
                        int_number: Sequelize.STRING,
                        neighborhood: Sequelize.STRING,
                        zip: Sequelize.INTEGER,
                        city: Sequelize.STRING,
                        county: Sequelize.STRING,
                        state: Sequelize.STRING,
                        phone: Sequelize.STRING,
                        phone2: Sequelize.STRING,
                        created_at: {
                            type: Sequelize.DATE,
                            defaultValue: Sequelize.NOW
                        },
                        updated_at: Sequelize.DATE,
                        deleted_at: Sequelize.DATE
                    }
                )
            })
            .then(() => {
                console.info('Creating Users table...');

                return queryInterface.createTable('Users', {
                    _id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    uuid: {
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4
                    },
                    email: {
                        type: Sequelize.STRING,
                        unique: {
                            msg: 'The specified email address is already in use.'
                        },
                        validate: {
                            isEmail: true,
                        }
                    },
                    password: {
                        type: Sequelize.STRING,
                        validate: {
                            notEmpty: true
                        }
                    },
                    profile__id: {
                        type: Sequelize.INTEGER,
                        allowNull: true,
                        references: {
                            model: 'Profiles',
                            key: '_id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    },
                    role__id: {
                        type: Sequelize.INTEGER,
                        validate: {
                            notEmpty: true
                        },
                        references: {
                            model: 'Roles',
                            key: '_id'
                        },
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT'
                    },
                    enabled: {
                        type: Sequelize.BOOLEAN,
                        defaultValue: false
                    },
                    salt: Sequelize.STRING,
                    created_at: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.NOW
                    },
                    updated_at: Sequelize.DATE,
                    deleted_at: Sequelize.DATE

                })
            });
    },

    down: function (queryInterface, Sequelize) {
        console.info('Removing Profiles table...');
        return queryInterface.dropTable('Profiles')
            .then(() => {
                console.info('Removing Users table...');
                return queryInterface.dropTable('Users')
                    .then(() => {
                        console.info('Removing Roles table...');
                        return queryInterface.dropTable('Roles')
                    })
            })
    }
};
