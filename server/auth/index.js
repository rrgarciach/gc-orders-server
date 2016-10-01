'use strict';

let express = require('express');
let userService = require('../api/user/user.service');
const CONFIG = require('../config/environment');

// Passport configuration:
require('./local/passport').setup(userService, CONFIG);

var router = express.Router();

router.use('/', require('./local/index'));

module.exports = router;
