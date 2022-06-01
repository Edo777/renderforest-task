/**
 * Available Algorithms
 * ['RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512', 'HS256', 'HS384', 'HS512', 'none']
 */

const jwt = require("jsonwebtoken");

class Token {
  #secret;
  #algorithm;
  #expiresIn;

  constructor() {
    this.#secret = process.env.JWT_SECRET || "My secret";
    this.#algorithm = "HS256";
    this.#expiresIn =  3600 * 24 * 1000; // One day
  }

  generateToken(data){
    return jwt.sign(data, this.#secret,
      {
          algorithm: this.#algorithm,
          expiresIn: this.#expiresIn,
      }
    );
  }

  decodeToken(token) {
    return jwt.verify(token, this.#secret);
  }
}

module.exports = new Token();