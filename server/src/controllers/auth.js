const { Locations } = require("../database")();

/**
 * Signin of user
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
async function signin(req, res) {
  try {
    const locations = await Locations.findAll({});
  
    return res.send({ locations: locations });
  } catch (error) {
    console.log(error)
    return res.send(error);
  }
}

async function signup(req, res) {
  return res.send("signup")
}

module.exports = {  
  signin,
  signup
}