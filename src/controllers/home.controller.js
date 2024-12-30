/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * custom modules
 */
const client = require('../config/db.config');
const contributeService = require('../services/contribute_service');
const getAvatar = require('../helper/helper');


/**
 * Renders the home page with a list of supporters who have made paid contributions.
 *
 * @async
 * @function
 * @param {Object} req - Express Request object.
 * @param {Object} res - Express Response object.
 * @throws {Error} - If an error occurs during the rendering process or database operations.
 */
const home = async (req, res) => {
  try {

    // Define the filter to identify documents with 'paid' payment_status
    const filter = { payment_status: 'paid' }

    // Define the projection to specify which fields to include in the result
    const projection = {
      _id: 0,
      name: 1,
      amount: 1,
      message: 1
    }

    // Retrieve supporter data from the database and reverse the order
    const supporterList = (await contributeService.readData(filter, projection)).reverse();

    // Render the home page with supporterList and getAvatar function
    res.render('./pages/home', {
      supporterList,
      getAvatar
    });

  } catch (error) {

    // Log and re-throw any errors that occur during the rendering or database operations
    console.error(error);
    throw error;

  } finally {

    // Ensure the database connection is closed, regardless of success or failure
    await client.close();

  }
}


module.exports = { home }