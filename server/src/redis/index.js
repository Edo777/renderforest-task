const { getInstance } = require("./client");

/**
 * Check and return cache
 * @param {string} key 
 * @returns 
 */
async function checkCache(key) {
  try {
    if(typeof key !== "string") {
      key = JSON.stringify(key);
    }

    const redisClient = await getInstance();
    const cached = await redisClient.get(key);

    if(cached) {
      return JSON.parse(cached)
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * 
 * @param {string} key 
 * @param {string} value 
 * @returns 
 */
async function setCache(key, value) {
  try {
    if(typeof value !== "string") {
      value = JSON.stringify(value);
    }

    if(typeof key !== "string") {
      key = JSON.stringify(key);
    }

    const redisClient = await getInstance();
    return await redisClient.set(key, value);
  } catch (error) {
    return null;
  }
}

module.exports = {
  checkCache,
  setCache
}