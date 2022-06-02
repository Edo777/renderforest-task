const base = "/api";

module.exports = {
  SIGNIN: `${base}/users/signin`,
  SIGNUP: `${base}/users/signup`,
  ANNOUNCEMENTS_CREATE_URL: `${base}/users/announcements`,
  ANNOUNCEMENTS_DELETE_URL: `${base}/users/announcements/:id`,

  ANNOUNCEMENTS_GET_URL: `${base}/announcements`,
  ANNOUNCEMENTS_UPDATE_URL: `${base}/announcements/:id`,
  
  LOCATIONS_GET_URL: `${base}/locations`,
  CATEGORIES_GET_URL: `${base}/categories`,
}