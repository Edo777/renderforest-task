
const { NotAuthorizedError } = require("../errors");

module.exports = (req, res, next) => {
  if(!req.activeUser) {
    throw NotAuthorizedError();
  }

  next();
} 