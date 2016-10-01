'use strict';

let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let compose = require('composable-middleware');
let userService = require('../api/user/user.service');
const CONFIG = require('../config/environment');

let validateJwt = expressJwt({
    secret: CONFIG.SECRETS.SESSION
});

let authService = {
    isAuthenticated,
    signToken,
    setTokenCookie
};

// Attaches the User object to the request if authenticated, otherwise status 401
function isAuthenticated() {
    return compose()
    // Validate jwt
        .use(function (req, res, next) {
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
                // allow access_token to be passed through query parameter as well
                validateJwt(req, res, next)
            } else {
                validateJwt(req, res, next)
            }
        })
        // Attach user to request
        .use(function (req, res, next) {
            if (err) {
                return res.status(err.status).end();
            }
            userService.getById(req.user._id)
                .then(user => {
                    if (!user) {
                        return res.status(401).end();
                    }
                    req.user = user;
                    next();
                })
                .catch(err => next(err));
        });
}

// Returns a jwt token signed by the app secret
function signToken(id, role) {
    return jwt.sign({_id: id, role: role}, CONFIG.SECRETS.SESSION, {
        expiresIn: 60 * 60 * 5
    });
}

// Set token cookie directly for oAuth strategies
function setTokenCookie(req, res) {
    if (!req.user) {
        return res.status(404).send('It looks like you are not logged in, please try again.');
    }
    var token = signToken(req.user._id, req.user.role.name);
    res.cookie('token', token);
    res.redirect('/');
}

module.exports = authService;
