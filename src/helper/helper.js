/**
 * @license Apache-2.0
 * @copyright 2024 seniordevforch
 */

'use strict';


/**
 * Generates an avatar based on the provided name by extracting initials from the first and last names.
 *
 * @param {string} name - The full name used to generate the avatar initials.
 * @returns {string} The generated avatar initials.
 */
const getAvatar = function (name) {

  // Split the full name into first and last names
  const [firstName, lastName] = name.split(' ');

  // Check if a last name is present
  if (lastName) {
    // Return the initials using the first character of the first name and last name
    return firstName.at() + lastName.at();
  } else {
    // Return the initials using the first two characters of the first name
    return firstName.slice(0, 2);
  }

}


module.exports = getAvatar