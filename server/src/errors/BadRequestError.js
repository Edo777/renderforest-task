const MainError = require("./MainError");

class BadRequestError extends MainError {
  constructor(message) {
      super(message);

      this.message = message;
      this.statusCode = 400;
      Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
      return [{ message: this.message }];
  }
}

module.exports = function(message) {
  return new BadRequestError(message);
};