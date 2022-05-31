const { signinValidator, signupValidator } = require("../validations/auth");
const { SIGNIN: SIGNIN_URL, SIGNUP: SIGNUP_URL } = require("./config");
const { signin, signup } = require("../controllers/auth");
const validateRequest = require("../middlewares/validate-request");

const express =  require("express");

const router = express.Router();

// Signin of user
router.post(
  SIGNIN_URL, 
  signinValidator(),
  validateRequest, 
  signin
);

// Signup of user
router.post(
  SIGNUP_URL, 
  signupValidator(), 
  validateRequest, 
  signup
);

module.exports =  { 
  authRouter: router 
}