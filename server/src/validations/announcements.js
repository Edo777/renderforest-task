
const { body } = require('express-validator');

/**
 * Validator options of create announcement
 * @returns {Array}
 */
function announcementCreateValidator() {
  return [
    body('description').trim().notEmpty().withMessage('Description must be >= 100 characters'),
    body('tags').isArray().withMessage('please select > 1 tags'),
    body('price').isNumeric().withMessage('Price is required'),
    body('currency').trim().isIn("amd", "usd", "rub").withMessage('Currency is required. Allowed -> amd, usd, rub'),
    body('regionId').notEmpty().isNumeric().withMessage('Region is required: select id. See {{url}}/locations'),
    body('cityId').notEmpty().isNumeric().withMessage('City is required: select id. See {{url}}/locations'),
    body('categoryId').isNumeric().withMessage('Category is required: select id. See {{url}}/categories')
  ];
}

module.exports = {
  announcementCreateValidator
}