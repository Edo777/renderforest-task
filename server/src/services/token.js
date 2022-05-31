const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const algorithm = "SHA256";

class Token {
  async generateToken(data, expires){
    try {
      return jwt.sign(data, JWT_SECRET || "My secret",
        {
            algorithm: algorithm,
            expiresIn: expires  * 1000,
        }
      );
    } catch (error) {
      return null;
    }
  }

  decodeToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET || "My secret");
    } catch (error) {
      return null;
    }
  }
}

module.exports = new Token();