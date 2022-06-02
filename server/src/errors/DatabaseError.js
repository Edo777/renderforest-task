const MainError = require("./MainError");

class DatabaseError extends MainError {
  constructor(message) {
      super(message);
      
      this.statusCode = 500;
      this.reason = message;
      Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
      return [{ message: this.reason }];
  }
}

module.exports = function (message) {
  return new DatabaseError(message);
};