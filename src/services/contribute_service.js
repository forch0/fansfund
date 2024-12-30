/**
 * @license Apache-2.0
 * @copyright 2024  seniordevforch
 */

'use strict';


/**
 * custom modules
 */
const client = require('../config/db.config');


/**
 * Asynchronously stores data in the 'contribution' collection of the 'fansfund' database.
 *
 * @async
 * @param {Object} data - The data to be stored in the 'contribution' collection.
 * @returns {Promise<Object>} A Promise that resolves to the document inserted into the 'contribution' collection.
 * @throws {Error} If there is an error during the database operation.
 */
const storeData = async (data) => {
  try {

    // Connect to the mongodb client
    await client.connect();

    // Establish a connection to the 'fansfund' database
    const db = await client.db('fansfund');

    // Access the 'contribution' collection within the database
    const contribution = await db.collection('contribution');

    // Insert the provided data into the 'contribution' collection
    const footPrint = await contribution.insertOne(data);

    // Return the document inserted into the 'contribution' collection
    return footPrint;

  } catch (error) {

    // Log and rethrow any errors that occur during the database operation
    console.error(error);
    throw error

  } finally {

    // Ensure the database connection is closed, regardless of success or failure
    await client.close();

  }
}


/**
 * Asynchronously updates data in the 'contribution' collection of the 'fansfund' database based on the provided order ID.
 *
 * @async
 * @param {string} order_id - The order ID used to identify the document to be updated in the 'contribution' collection.
 * @param {Object} data - The data to be set in the document during the update operation.
 * @returns {Promise<Object>} A Promise that resolves to the update operation response from the database.
 * @throws {Error} If there is an error during the database update operation. 
 */
const updateData = async (order_id, data) => {
  try {

    // Connect to the mongodb client
    await client.connect();

    // Establish a connection to the 'fansfund' database
    const db = await client.db('fansfund');

    // Access the 'contribution' collection within the database
    const contribution = await db.collection('contribution');

    // Define the filter to identify the document based on the provided order_id
    const filter = { order_id }

    // Define the update operation to set the provided data in the document
    const updateStatus = { $set: data }

    // Perform the update operation in the 'contribution' collection
    const response = await contribution.updateOne(filter, updateStatus);

    // Return the response from the update operation
    return response;

  } catch (error) {

    // Log and rethrow any errors that occur during the database operation
    console.error(error);
    throw error;

  } finally {

    // Ensure the database connection is closed, regardless of success or failure
    await client.close();

  }
}

/**
 * Asynchronously reads data from the 'contribution' collection of the 'fansfund' database based on the provided filter,
 * projection, and optional limit.
 *
 * @async
 * @param {Object} filter - The filter criteria to be applied to the database query.
 * @param {Object} projection - The projection specifying which fields to include or exclude in the query result.
 * @param {number} [limit=20] - The maximum number of documents to return (default is 20).
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of documents from the 'contribution' collection.
 * @throws {Error} If there is an error during the database query operation.
 */
const readData = async (filter, projection, limit = 20) => {
  try {

    // Connect to the mongodb client
    await client.connect();

    // Establish a connection to the 'fansfund' database
    const db = await client.db('fansfund');

    // Access the 'contribution' collection within the database
    const contribution = await db.collection('contribution');

    // Perform the database query with the provided filter, projection, and limit
    const results = await contribution.find(filter, {
      projection
    })
      .limit(limit)
      .toArray();

    // Return the array of documents from the 'contribution' collection
    return results;

  } catch (error) {

    // Log and rethrow any errors that occur during the database operation
    console.error(error);
    throw error;

  } finally {

    // Ensure the database connection is closed, regardless of success or failure
    await client.close();

  }
}


module.exports = {
  storeData,
  updateData,
  readData
}