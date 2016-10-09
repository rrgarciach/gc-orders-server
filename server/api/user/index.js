'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import Auth from '../../auth/auth.service';

let router = new Router();

router.get('/', Auth.isAuthenticated, controller.index);
router.get('/:uuid', Auth.isAuthenticated, controller.show);
router.post('/', Auth.isAuthenticated, controller.create);
router.put('/:uuid', Auth.isAuthenticated, controller.update);
router.post('/:uuid/delete', Auth.isAuthenticated, controller.destroy);

module.exports = router;
