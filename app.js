/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * node modules 
 */
const express = require('express');
const helmet = require('helmet');
require('dotenv').config();


/**
 * custom module
 */
const home = require('./src/routes/home.route');
const checkout = require('./src/routes/checkout.route');


/**
 * Initial express app
 */
const app = express();


/**
 * Setting ejs view engine
 */
app.set('view engine', 'ejs');


/**
 * Setting public folder
 */
app.use(express.static(`${__dirname}/public`));


/**
 * Setting HTTP response secure headers
 */
app.use(helmet());


/**
 * Middleware for parsing incoming URL-encoded data in the request body.
 */
app.use(express.urlencoded({ extended: true }));


/**
 * Middleware for parsing JSON requests using the express.json() middleware
 * with custom verification to store the raw request body in the 'rawBody' property
 * of the request object.
 */
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));


/**
 * Home page
 */
app.use('/', home);


/**
 * Checkout
 */
app.use('/checkout', checkout);


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});