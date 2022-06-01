const express =  require("express");

const { announcementCreateValidator } = require("../validations/announcements");
const validateRequest = require("../middlewares/validate-request");
const { create } = require("../controllers/announcements");

const router = express.Router();

// Create announcement
router.post(
  ANNOUNCEMENT_CREATE_URL, 
  announcementCreateValidator(),
  validateRequest, 
  createAnnouncement
);

// Signup of user
router.post(
  SIGNUP_URL, 
  signupValidator(), 
  validateRequest, 
  create
);

module.exports =  { 
  authRouter: router 
}