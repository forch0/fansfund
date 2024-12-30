/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * node modules
 */
const router = require('express').Router();


/**
 * custom modules
 */
const { checkout, callback } = require('../controllers/checkout.controller');
const webhookVerification = require('../middlewares/webhook_verify_middleware');


router.post('/', checkout);

router.post('/callback', webhookVerification, callback);


module.exports = router;