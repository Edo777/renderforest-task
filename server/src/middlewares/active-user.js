const { decodeToken } = require("../services/token");

module.exports = async (req, res, next) => {
  if(!req.session || req.session.jwt) {
    return next();
  }

  try {
    const decodedData = decodeToken(req.session.jwt);

    req.activeUser = decodedData;
  } catch (error) {}

  next();
}