/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * custom modules
 */
const paymentApi = require('../api/payment.api');
const contributeService = require('../services/contribute_service');


/**
 * Asynchronously handles the checkout process for a user, including creating an invoice using the payment API,
 * storing user information, order ID, and payment status in the database.
 *
 * @async
 * @param {Object} req - The Express.js request object containing information from the client.
 * @param {Object} res - The Express.js response object used to send the response back to the client.
 * @throws {Error} If there is an error during the checkout process.
 **/

const checkout = async (req, res) => {

  try {
    // Extract the amount from the request body
    const { amount } = req.body;

    // Create an invoice using the payment API
    const invoice = await paymentApi.createInvoice(amount);

    // Prepare data to store in the database, including user info, order ID, and payment status
    const data = {
      ...req.body,
      order_id: invoice.result.order_id,
      payment_status: invoice.result.status
    }

    // Store the data in the database using the contributeService
    await contributeService.storeData(data);

    // Send the JSON representation of the invoice as the response to the client
    res.json(invoice);

  } catch (err) {

    // Log and rethrow any errors that occur during the checkout process
    console.error(err);
    throw err;

  }

}


/**
 * Asynchronously handles the callback received from a payment provider, updates the payment status in the database,
 * and sends a 200 OK response to acknowledge the callback.
 *
 * @async
 * @param {Object} req - The Express.js request object containing information from the payment provider callback.
 * @param {Object} res - The Express.js response object used to send responses back to the payment provider.
 * @throws {Error} If there is an error during the callback processing or database update operation.
 */
const callback = async (req, res) => {
  try {

    // Extract the order_id and status from the request body
    const { order_id, status } = req.body;

    // Prepare data to update in the database, including the payment_status based on the provided status
    const data = { payment_status: status }

    // Update the data in the database using the contributeService
    await contributeService.updateData(order_id, data);

    // Send a 200 OK response to acknowledge the payment provider callback
    res.sendStatus(200);

  } catch (error) {

    // Log and rethrow any errors that occur during the checkout process
    console.error(error);
    throw error;

  }
}


module.exports = {
  checkout,
  callback
}