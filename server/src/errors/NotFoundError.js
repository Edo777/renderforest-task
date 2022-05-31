const MainError = require("./MainError");

class NotFoundError extends MainError {
  constructor() {
    super("Not Found");
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Authorized" }];
  }
}

module.exports = function () {
  return new NotFoundError();
}