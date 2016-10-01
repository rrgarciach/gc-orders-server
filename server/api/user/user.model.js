'use strict';

let crypto = require('crypto');

let validatePresenceOf = function (value) {
  return value && value.length;
};

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'The specified email address is already in use.'
        },
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      role__id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      salt: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,

      classMethods: {
        associate: function (models) {
          User.belongsTo(models.Role, {as: 'role'});
          User.hasOne(models.Profile, {as: 'profile'});
        }
      },

      hooks: {
        beforeBulkCreate: function (users, fields, fn) {
          var totalUpdated = 0;
          users.forEach(function (user) {
            user.updatePassword(function (err) {
              if (err) {
                return fn(err);
              }
              totalUpdated += 1;
              if (totalUpdated === users.length) {
                return fn();
              }
            });
          });
        },
        beforeCreate: function (user, fields, fn) {
          user.updatePassword(fn);
        },
        beforeUpdate: function (user, fields, fn) {
          if (user.changed('password')) {
            return user.updatePassword(fn);
          }
          fn();
        }
      },

      instanceMethods: {
        authenticate: function (password, callback) {
          if (!callback) {
            return this.password === this.encryptPassword(password);
          }

          var _this = this;
          this.encryptPassword(password, function (err, pwdGen) {
            if (err) {
              callback(err);
            }

            if (_this.password === pwdGen) {
              callback(null, true);
            }
            else {
              callback(null, false);
            }
          });
        },

        makeSalt: function (byteSize, callback) {
          var defaultByteSize = 16;

          if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
          }
          else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
          }

          if (!byteSize) {
            byteSize = defaultByteSize;
          }

          if (!callback) {
            return crypto.randomBytes(byteSize).toString('base64');
          }

          return crypto.randomBytes(byteSize, function (err, salt) {
            if (err) {
              callback(err);
            }
            return callback(null, salt.toString('base64'));
          });
        },

        encryptPassword: function (password, callback) {
          if (!password || !this.salt) {
            if (!callback) {
              return null;
            }
            return callback(null);
          }

          var defaultIterations = 10000;
          var defaultKeyLength = 64;
          var salt = new Buffer(this.salt, 'base64');

          if (!callback) {
            return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
              .toString('base64');
          }

          return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength,
            function (err, key) {
              if (err) {
                callback(err);
              }
              return callback(null, key.toString('base64'));
            });
        },

        updatePassword: function (fn) {
          // Handle new/update passwords
          if (this.password) {
            if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
              fn(new Error('Invalid password'));
            }

            // Make salt with a callback
            var _this = this;
            this.makeSalt(function (saltErr, salt) {
              if (saltErr) {
                fn(saltErr);
              }
              _this.salt = salt;
              _this.encryptPassword(_this.password, function (encryptErr, hashedPassword) {
                if (encryptErr) {
                  fn(encryptErr);
                }
                _this.password = hashedPassword;
                fn(null);
              });
            });
          } else {
            fn(null);
          }
        },

        generateRandomString: function (length) {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
        }

      }
    });

  return User;
};
