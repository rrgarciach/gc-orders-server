'use strict';

module.exports = function (sequelize, DataTypes) {
    let Profile = sequelize.define('Profile', {
            _id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            rfc: {
                type: DataTypes.STRING,
                defaultValue: 'XAXX010101000',
            },
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.STRING,
            int_number: DataTypes.STRING,
            neighborhood: DataTypes.STRING,
            zip: DataTypes.INTEGER,
            city: DataTypes.STRING,
            county: DataTypes.STRING,
            state: DataTypes.STRING,
            phone: DataTypes.STRING,
            phone2: DataTypes.STRING,
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true,

            classMethods: {
                associate: function (models) {
                    Profile.hasOne(models.User);
                }
            },
        });

    return Profile;
};
