/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * node modules
 */
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


/**
 * MongoDB connection configuration and client instantiation.
 * 
 * @constant {string} username - Encoded MongoDB database username from environment variable.
 * @constant {string} password - Encoded MongoDB database password from environment variable.
 * @constant {string} clusterUrl - MongoDB cluster URL.
 * @constant {string} connectionStr - MongoDB connection string including username, password, and cluster URL.
 */
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clusterUrl = 'nodejsfunds.aiu4l.mongodb.net';

const connectionStr = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;




/**
 * MongoDB client instance with specific configuration options.
 * 
 * @constant {MongoClient} client - MongoDB client instance.
 * @property {string} connectionStr - MongoDB connection string used for establishing the connection.
 * @property {Object} options - Configuration options for the MongoDB client.
 * @property {ServerApiVersion} options.serverApi.version - MongoDB Server API version (v1).
 * @property {boolean} options.serverApi.strict - Enforces strict adherence to the MongoDB Server API.
 * @property {boolean} options.serverApi.deprecationErrors - Enables or disables deprecation errors for the MongoDB Server API.
 * @property {string[]} options.compressors - Array of compressors to be used for communication with the MongoDB server (e.g., ['snappy']).
 */
const client = new MongoClient(connectionStr, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  compressors: ['snappy'],
});


module.exports = client;