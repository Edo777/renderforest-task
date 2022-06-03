const express =  require("express");

const { announcementCreateValidator } = require("../validations/announcements");
const { 
  USER_ANNOUNCEMENTS_CREATE_URL, 
  USER_ANNOUNCEMENTS_DELETE_URL, 
  USER_ANNOUNCEMENTS_GET_URL 
} = require("./config");

const { validateRequest, requireAuth } = require("../middlewares");
const { create, _delete, getCreatedAnnouncements } = require("../controllers/announcements");

const router = express.Router();

// Create announcement
router.post(
  USER_ANNOUNCEMENTS_CREATE_URL,
  requireAuth,
  announcementCreateValidator(),
  validateRequest,
  create
)

// Get created announcements
router.get(
  USER_ANNOUNCEMENTS_GET_URL,
  requireAuth,
  getCreatedAnnouncements
)

// Delete announcement
router.delete(
  USER_ANNOUNCEMENTS_DELETE_URL,
  requireAuth,
  _delete
);

module.exports = router;