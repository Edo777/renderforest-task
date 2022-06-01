const MainError = require("./MainError");

class DatabaseConnectionError extends MainError {
  constructor() {
      super('Error connecting to database');
      
      this.statusCode = 500;
      this.reason = 'Error connecting to database';
      Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
      return [{ message: this.reason }];
  }
}

module.exports = function () {
  return new DatabaseConnectionError();
};