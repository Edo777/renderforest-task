const MainError = require("./MainError");

class DatabaseError extends MainError {
  constructor(message) {
      super(message);
      
      this.statusCode = 500;
      this.reason = 'Please try later';
      Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
      return [{ message: this.reason }];
  }
}

module.exports = function (message) {
  return new DatabaseError(message);
};