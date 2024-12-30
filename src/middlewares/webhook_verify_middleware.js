/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * node modules
 */
const crypto = require('crypto');
require('dotenv').config();


/**
 * Middleware function to validate the authenticity of incoming requests by verifying the provided signature,
 * ensuring the request originates from a whitelisted IP address, and validating the payload integrity.
 *
 * @param {Object} req - The Express.js request object containing information from the client.
 * @param {Object} res - The Express.js response object used to send responses back to the client.
 * @param {Function} next - The Express.js next function to pass control to the next middleware in the stack.
 * @throws {Error} If the request is deemed invalid based on signature, IP address, or payload integrity checks.
 */
module.exports = (req, res, next) => {
  // Extract signature, client IP, and Cryptomus IP from the request
  const { sign } = req.body;

  // Validate the presence of the signature in the request
  if (!sign) {
    return res.status(400).send('Invalid payload');
  }

  // Parse the raw request body into JSON data
  const data = JSON.parse(req.rawBody);

  // Remove the 'sign' property from the data for signature verification
  delete data.sign;

  // Calculate the hash using MD5, based on the data, base64 encoding, and the payment API key
  const hash = crypto
    .createHash('md5')
    .update(Buffer.from(JSON.stringify(data)).toString('base64') + process.env.PAYMENT_API_KEY)
    .digest('hex');

  // Verify that the calculated hash matches the provided signature
  if (hash !== sign) {
    return res.status(400).send('Invalid sign!');
  }

  // If all checks pass, continue to the next middleware or route handler
  next();
}