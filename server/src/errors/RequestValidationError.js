const MainError = require("./MainError");

class RequestValidationError extends MainError {
  constructor(errors) {
    super('Invalid Request parameters');

    this.errors = errors;
    this.statusCode = 400;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors; // TODO:
  }
}

module.exports = function (errors) {
  return new RequestValidationError(errors);
}