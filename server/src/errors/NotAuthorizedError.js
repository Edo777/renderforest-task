const MainError = require("./MainError");

class NotAuthorizedError extends MainError {
  constructor() {
    super('Not Authorized');
    this.statusCode = 401;

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{message: 'Not Authorized'}];
  }
}

module.exports = function() {
  return new NotAuthorizedError();
}