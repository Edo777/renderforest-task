const base = "/api";

module.exports = {
  SIGNIN: `${base}/users/signin`,
  SIGNUP: `${base}/users/signup`,

  ANNOUNCEMENTS_CREATE_URL: `${base}/announcements`,
  ANNOUNCEMENTS_GET_URL: `${base}/announcements`,
  ANNOUNCEMENTS_UPDATE_URL: `${base}/announcements/:id`,
  ANNOUNCEMENTS_DELETE_URL: `${base}/announcements/:id`,
}