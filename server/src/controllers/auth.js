const { Users } = require("../database")();
const { BadRequestError } = require("../errors")
const { generateToken, generateRefreshToken } = require("../services/token");
const { setCache } = require("../redis");

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
 * Set token to cookie-session
 * Cache with redis for refresh token
 * @param {object} tokenData 
 * @param {Express.Request} req 
 */
async function generateTokenAndSetToRequest(tokenData, req) {
  // Generate JWT
  const token = generateToken(tokenData);
  const refreshToken = generateRefreshToken();

  // Store it on session object
  req.session = { jwt: token , refreshToken };

  // Set cache refreshToken-tokenData
  setImmediate(() => {
    setCache(refreshToken, tokenData, 3600 * 24 * 5);
  });
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

    // Set token to cookie
    const userData = {
      id: existingUser.id,
      email: existingUser.email,
    };
    await generateTokenAndSetToRequest(userData, req);

    return res.status(200).send(userData);
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

   // Set token to cookie
  const userData = {
    id: user.id,
    email: user.email,
  };
  
  await generateTokenAndSetToRequest(userData, req);

  res.status(201).send(userData);
}

module.exports = {  
  signin,
  signup
}