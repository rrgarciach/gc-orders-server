'use strict';

module.exports = function (sequelize, DataTypes) {
    let Role = sequelize.define('Role', {
            _id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING
        },
        {
            underscored: true,
            timestamps: false,
            classMethods: {
                associate: function (models) {
                    // associations are defined here:
                    Role.hasOne(models.User);
                }
            }
        });

    return Role;
};
