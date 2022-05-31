
const { body } = require('express-validator');

/**
 * Validator options of signin
 * @returns {Array}
 */
function signinValidator() {
  return [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ];
}

/**
 * Validator options of signup
 * @returns
 */
function signupValidator() {
  return [
    body('email').isEmail().withMessage('Email must be valid'),
    body('regionId').isNumeric().withMessage('Region must be selected'),
    body('name').isLength({ min: 4, max: 20 }).withMessage('Name is required'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ];
}

module.exports = {
  signinValidator,
  signupValidator
}