const express =  require("express");

const { announcementCreateValidator } = require("../validations/announcements");
const { ANNOUNCEMENTS_CREATE_URL } = require("./config");
const { validateRequest } = require("../middlewares");
const { create } = require("../controllers/announcements");

const router = express.Router();

// Create announcement
router.post(
  ANNOUNCEMENTS_CREATE_URL,
  announcementCreateValidator(),
  validateRequest,
  create
)

// Signup of user
// router.post(
//   SIGNUP_URL, 
//   signupValidator(), 
//   validateRequest, 
//   create
// );

module.exports = router;