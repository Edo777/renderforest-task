const base = "/api";

module.exports = {
  SIGNIN: `${base}/users/signin`,
  SIGNUP: `${base}/users/signup`,
  USER_ANNOUNCEMENTS_CREATE_URL: `${base}/users/announcements`,
  USER_ANNOUNCEMENTS_DELETE_URL: `${base}/users/announcements/:id`,
  USER_ANNOUNCEMENTS_GET_URL: `${base}/users/announcements`,

  ANNOUNCEMENTS_SEARCH_URL: `${base}/announcements`,
  
  LOCATIONS_GET_URL: `${base}/locations`,
  CATEGORIES_GET_URL: `${base}/categories`,
}