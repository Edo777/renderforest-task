const { Locations , Categories } = require("../database")();
const { setCache, checkCache } = require("../redis");
const { DatabaseError } = require("../errors");

/**
 * Create announcement
 * @returns 
 */
async function getLocations(req, res, next) {
  try {
    let cache = await checkCache("locations");

    if(cache) {
      return res.send(cache);
    }

    // take locations
    const locations = await Locations.findAll({});

    // Set cache
    setImmediate(() => {
      setCache("locations", result);
    });

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
    let cache = await checkCache("categories");

    if(cache) {
      return res.send(cache);
    }

    // take locations
    const categories = await Categories.findAll({});

    // Set cache
    setImmediate(() => {
      setCache("categories", result);
    });

    return res.send(categories);
  } catch (error) {
    next(DatabaseError(error.message));
  }
}

module.exports = {  
  getLocations,
  getCategories
}