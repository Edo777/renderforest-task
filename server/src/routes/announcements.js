const express =  require("express");

const { announcementCreateValidator } = require("../validations/announcements");
const { ANNOUNCEMENTS_CREATE_URL, ANNOUNCEMENTS_DELETE_URL } = require("./config");
const { validateRequest } = require("../middlewares");
const { create, _delete } = require("../controllers/announcements");

const router = express.Router();

// Create announcement
router.post(
  ANNOUNCEMENTS_CREATE_URL,
  announcementCreateValidator(),
  validateRequest,
  create
)

// Delete announcement
router.delete(
  ANNOUNCEMENTS_DELETE_URL,
  _delete
);

module.exports = router;