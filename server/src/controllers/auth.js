const { Users } = require("../database")();
const { BadRequestError } = require("../errors")
const { generateToken } = require("../services/token");
const Password = require("../services/password");

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
async function signin(req, res, next) {
  try {
    const { email, password } = req.body;

    // Get user by email
    const existingUser = await _findOne({ where : { email } , attributes: [
      "id", "email", "password"
    ]});

    if (!existingUser) {
     return next(BadRequestError('Invalid credentials'));
    }

    // Compare passwords
    // Important and main action of auth
    const passwordsMatching = await Password.compare(
      existingUser.password,
      password
    );
    
    if (!passwordsMatching) {
      return next(BadRequestError('Invalid Credentials'));
    }

    // Generate JWT
    const token = generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });

    // Store it on session object
    req.session = { jwt: token };

    return res.status(200).send({
      id: existingUser.id,
      email: existingUser.email
    });
  } catch (error) {
    console.log(error)
    return res.send(error);
  }
}

/**
 * Signup of user
 * @returns 
 */
async function signup(req, res, next) {
  const { email, password, regionId , name , phone } = req.body;

  // Check existing of user by email
  const existingUser = await _findOne({ where : {email} });

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
  signin,
  signup
}