/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * node modules
 */
const axios = require('axios').default;
const crypto = require('crypto');
require('dotenv').config();


/**
 * Axios instance for making HTTP requests to the Cryptomus API.
 *
 * @constant
 * @type {import('axios').AxiosInstance}
 * @description An instance of Axios pre-configured with the base URL for the Cryptomus API (version 1).
 */
const cryptomus = axios.create({
  baseURL: 'https://api.cryptomus.com/v1',
});

/**
 * Default currency code used for invoice.
 */
const DEFAULT_CURRENCY = 'USD';


/**
 * Creates an invoice for a specified amount using the payment API.
 *
 * @async
 * @param {number} amount - The amount for the invoice.
 * @returns {Promise<Object>} - A Promise that resolves to the response data from the payment API.
 * @throws {Error} - If an error occurs during the invoice creation process.
 */
const createInvoice = async (amount) => {
  try {

    // Constructing data object for the invoice
    const data = {
      amount: amount.toString(),
      currency: DEFAULT_CURRENCY,
      order_id: crypto.randomBytes(12).toString('hex'),
      url_callback: 'YOUR-DOMAIN/checkout/callback',
      url_success: 'YOUR-DOMAIN'
    }

    // Generating a signature for the request using MD5 hash
    const sign = crypto
      .createHash('md5')
      .update(Buffer.from(JSON.stringify(data)).toString('base64') + process.env.PAYMENT_API_KEY)
      .digest('hex');

    // Setting headers for the request
    const headers = {
      merchant: process.env.MERCHANT_ID,
      sign
    }

    // Making a POST request to the payment API to create the invoice
    const response = await cryptomus.post('/payment', data, { headers });

    // Returning the response data from the payment API
    return response.data;

  } catch (error) {

    // Logging any errors that occur during the process
    console.log(error);
    throw error; // Re-throwing the error for handling by the caller

  }
}


module.exports = { createInvoice }