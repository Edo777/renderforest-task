const { decodeToken, generateToken } = require("../services/token");
const { checkCache } = require("../redis");

/**
 * Decode user token and set activeUser to current request
 * When token is expired -> Try to Refresh token and continue session
 */
module.exports = async (req, res, next) => {
  if(!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const decodedData = decodeToken(req.session.jwt);

    if(!decodedData) {
      return next(new Error("Broken token"));
    }

    req.activeUser = decodedData;
  } catch (error) {
    if(error.name === "TokenExpiredError") {
      let cachedUser = await checkCache(req.session.refreshToken);

      // Check cache and refresh token...
      if(cachedUser) {
        const newToken = generateToken(cachedUser);

        req.session = { jwt: newToken , refreshToken: req.session.refreshToken };
        req.activeUser = cachedUser;
      }
    }
  }

  next();
}