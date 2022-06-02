const { Locations , Categories } = require("../database")();
const { BadRequestError, DatabaseError } = require("../errors");

/**
 * Create announcement
 * @returns 
 */
async function getLocations(req, res, next) {
  try {
    // take locations
    const locations = await Locations.findAll({});

    return res.send(locations);
  } catch (error) {
    next(DatabaseError(error.message));
  }
}

/**
 * Create announcement
 * @returns 
 */
 async function getCategories(req, res, next) {
  try {
    // take locations
    const categories = await Categories.findAll({});

    return res.send(categories);
  } catch (error) {
    next(DatabaseError(error.message));
  }
}

module.exports = {  
  getLocations,
  getCategories
}