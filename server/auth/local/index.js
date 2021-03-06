'use strict';

let express = require('express');
let passport = require('passport');
let signToken = require('../auth.service').signToken;

var router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        let error = err || info;
        if (error) {
            console.error(error);
            return res.status(401).json({message:error.message});
        }
        if (!user) {
            return res.status(404).json({message: 'Something went wrong, please try again.'});
        }

        let token = signToken(user._id, user.role.name);
        res.cookie('token', token);
        res.json({token: token});
    })(req, res, next);
});

module.exports = router;
