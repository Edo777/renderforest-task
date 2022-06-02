const express =  require("express");

const { LOCATIONS_GET_URL, CATEGORIES_GET_URL, ANNOUNCEMENTS_GET_URL } = require("./config");

const { getLocations, getCategories } = require("../controllers/common");
const { search: searchAnnouncements } = require("../controllers/announcements");

const router = express.Router();

// Get locations
router.get(LOCATIONS_GET_URL, getLocations);

// Get categories
router.get(CATEGORIES_GET_URL, getCategories);

// Search announcements
router.get(ANNOUNCEMENTS_GET_URL, searchAnnouncements);

module.exports = router;