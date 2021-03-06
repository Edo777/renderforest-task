/**
 * Available Algorithms
 * ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'HS256', 'HS384', 'HS512', 'none']
 */
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const config = {
  secret: process.env.JWT_SECRET || "My secret",
  algorithm: "HS256",
  expiresIn: 5 //|| 3600 * 24 * 1000 // One day
}

/**
 * generate token
 * @param {any} data 
 * @returns 
 */
function generateToken(data) {
  return jwt.sign(data, config.secret,
    {
        algorithm: config.algorithm,
        expiresIn: config.expiresIn,
    }
  );
}

/**
 * Decsode token
 * @param {string} token 
 * @returns 
 */
function decodeToken(token) {
  return jwt.verify(token, config.secret);
}

/**
 * Generate refresh-token
 * @returns {string}
 */
function generateRefreshToken() {
  const  current_date = (new Date()).valueOf().toString();
  const  random = Math.random().toString();

  return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

module.exports = {
  generateToken,
  decodeToken,
  generateRefreshToken
}