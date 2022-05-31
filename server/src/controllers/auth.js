const { Users } = require("../database")();
const { BadRequestError } = require("../errors")
const Token = require("../services/token");

/**
 * Helper for findone
 * @param {object} options 
 * @returns 
 */
async function _findOne(options) {
  return await Users.findOne(options);
}

/**
 * Create user helper
 * @param {object} data 
 * @returns 
 */
async function _create(data) {
  return await Users.create(data);
}

/**
 * Signin of user
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
async function signin(req, res) {
  try {
    const locations = await Users.findAll({ });
  
    return res.send({ locations: locations });
  } catch (error) {
    console.log(error)
    return res.send(error);
  }
}

async function signup(req, res, next) {
  console.log(req.activeUser);
  const { email, password, regionId , name , phone } = req.body;
  const existingUser = await _findOne({ where : {email} });

  if(existingUser) {
    return next(BadRequestError('Email is in use'));
  }

  const user = await _create({ email, password, regionId , name , phone });

   // Generate JWT
   const token = Token.generateToken({
    id: user.id,
    email: user.email,
  });

  // Store it on session object
  req.session = { jwt: token };

  res.status(201).send(user);
}

module.exports = {  
  signin,
  signup
}