class MainError extends Error {
  constructor(message) {
      super(message);
      Object.setPrototypeOf(this, MainError.prototype);
  }
}

module.exports = MainError;