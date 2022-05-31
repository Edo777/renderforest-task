
  
const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

// Promisify the scrrypt function
const scryptAsync = promisify(scrypt);

class Password {
  /**
   * Hash password
   * @param {string} password 
   * @returns {string}
   */
  static async hash(password) {
    const salt = randomBytes(8).toString('hex');
    const buf = await scryptAsync(password, salt, 64);

    return `${buf.toString('hex')}.${salt}`;
  }

  /**
   * Compare passwords
   * @param {string} dbPassword 
   * @param {string} sendedPassword 
   * @returns {boolean}
   */
  static async compare(dbPassword, sendedPassword) {
    const [hashedPassword, salt] = dbPassword.split('.');
    const buf = await scryptAsync(sendedPassword, salt, 64);

    return buf.toString('hex') === hashedPassword;
  }
}

module.exports = Password;