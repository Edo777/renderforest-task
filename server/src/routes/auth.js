const express =  require("express");
const { SIGNIN: SIGNIN_URL, SIGNUP: SIGNUP_URL } = require("./config");
const { signin, signup } = require("../controllers/auth");

const router = express.Router();

// Signin of user
router.post(SIGNIN_URL, signin);

// Signup of user
router.post(SIGNUP_URL, signup);

module.exports =  { 
  authRouter: router 
}