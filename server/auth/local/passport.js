'use strict';

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

const AUTH_ERROR = {message: 'Invalid email or password.'};

let localPassport = {
    localAuthenticate,
    setup
};

function localAuthenticate(userService, email, password, done) {
    userService.getByEmail(email.toLowerCase())
        .then(user => {
            if (!user) {
                return done(null, false, AUTH_ERROR);
            }
            user.authenticate(password, function (authError, authenticated) {
                if (authError) {
                    return done(authError);
                }
                if (authenticated) {
                    return done(null, user);
                } else {
                    return done(null, false, AUTH_ERROR);
                }
            });
        })
        .catch(err => {
            console.log('ERROR!');
            done(err)
        });
}

function setup(userService, config) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password' // this is the virtual field on the model
        },
        function (email, password, done) {
            return localAuthenticate(userService, email, password, done);
        }));
}

module.exports = localPassport;
