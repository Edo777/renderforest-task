const { Announcements } = require("../database")();
const { BadRequestError } = require("../errors");

/**
 * Helper for findone
 * @param {object} options 
 * @returns 
 */
async function _findOne(options) {
  return await Announcements.findOne(options);
}

/**
 * Create helper
 * @param {object} data 
 * @returns 
 */
async function _create(data, model=null) {
  if(!model) {
    return await Announcements.create(data);
  }

  return await model.create(data);
}

/**
 * Create announcement
 * @returns 
 */
async function create(req, res, next) {
  const { regionId, cityId, categoryId, price, currency, description, tags } = req.body;

  const announcement = await _create({
    regionId,
    cityId,
    categoryId,
    price,
    currency,
    description,
  });

  if(tags && tags.length) {

  }

  // Check existing of user by email
  const existingUser = await _findOne({ where : { email } });

  if(existingUser) {
    return next(BadRequestError('Email is in use'));
  }

  // Set user to database
  const user = await _create({ email, password, regionId , name , phone });

   // Generate JWT
   const token = generateToken({
    id: user.id,
    email: user.email,
  });

  // Store it on session object
  req.session = { jwt: token };

  res.status(201).send({
    id: user.id,
    email: user.email
  });
}

module.exports = {  
  create
}