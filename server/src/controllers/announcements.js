const { Announcements, Tags, AssoAnnouncementsTags, Users, sequelize, Sequelize, Locations, Categories } = require("../database")();
const { setCache, checkCache } = require("../redis");

const { lte, gte, or } = Sequelize.Op;

const { DatabaseError } = require("../errors");
const { keywordExtract, numericHash } = require("../utils");

/**
 * Associate tags and announcement
 * @param {number} announcementId 
 * @param {[{id: number}]} tags 
 * @param { sequelize.transaction } transaction
 * @returns 
 */
async function associateTagsAndAnnouncement(announcementId, tags, transaction=null) {
  // Filter and format only created tags (created tags have id)
  const associationsList = tags
    .filter(tag => Boolean(tag.id))
    .map((tag) => ({
      tagId: tag.id,
      announcementId
    }));
    
  if(associationsList.length === 0) {
    return associationsList;
  }

  // Options for transaction
  const bulkCreateOptions = {
    ignoreDuplicates: true
  }

  // Set transaction
  if(transaction) { 
    bulkCreateOptions.transaction = transaction;
  }

  // Execute association
  return await AssoAnnouncementsTags.bulkCreate(
    associationsList, 
    bulkCreateOptions
  );
}

/**
 * Search tags matched searchtext
 * @param {string} searchText 
 * @returns {[number]} announcements ids
 */
 async function searchAnnouncementsByTags(searchText){
    // extract keywords
    const keywords = keywordExtract(searchText);

    // Set indexes by order to select quickly
    const findOptions = {
      [or] : keywords.map((keyword) => ({
        hfChar: numericHash.first(keyword),
        phName: numericHash.partial(keyword),
        hName: numericHash.complete(keyword)
      }))
    }
    
    // Execute query
    const matchedTags = await Tags.findAll({ where : findOptions });

    if(!matchedTags && !matchedTags.length) {
      return [];
    }

    // take associations of matched tags and announcements
    const associations = await AssoAnnouncementsTags.findAll({
      where : { tagId: matchedTags.map(t => t.id) },
      attributes : ["announcementId"]
    });

    if(!associations || !associations.length) {
      return [];
    }

    // Return only announcements ids
    return associations.map(a => a.announcementId);
}

/**
 * Find already created tags
 * @param {{
 *  phName: number
 *  hName: number,
 *  hfChar: number
 * }} formattedTags 
 * @returns {Array<{ id: number, name: string }>}
 */
async function findAlreadyCreatedTags(formattedTags) {
  let conditionToFindExistingTags = {
    [or] : formattedTags.map((ftag) => ({
      hfChar: ftag.hfChar,
      phName: ftag.phName,
      hName: ftag.hName,
    }))
  };

  const existingTags = await Tags.findAll({ 
    where : conditionToFindExistingTags, 
    attributes: ["id", "name"]
  });

  return existingTags;
}

/**
 * Create tags
 * @param {Array<string>} tags 
 * @param { sequelize.transaction } transaction
 * @returns {{ createdTags: Array, existingTags: Array }}
 */
async function createTags(tags, transaction = null) {
  // Create 
  let formattedTags = tags.map(tag => ({
    name: tag,
    phName: numericHash.partial(tag),
    hName: numericHash.complete(tag),
    hfChar: numericHash.first(tag)
  }));

  // Find already created tags
  const existingTags = await findAlreadyCreatedTags(formattedTags);

  // Filter formatted tags and take only tags which will be created
  const existingTagsNames = existingTags.map(tag => tag.name);
  const tagsToCreate = formattedTags.filter(ftag => !existingTagsNames.includes(ftag));

  const bulkCreateOptions = {
    ignoreDuplicates: true,
    returning: true
  }

  if(transaction) {
    bulkCreateOptions.transaction = transaction;
  }

  // Bulk insert tags
  let createdTags = await Tags.bulkCreate(
    tagsToCreate, 
    bulkCreateOptions
  );

  return { createdTags , existingTags };
}

/**
 * Create announcement
 * @returns 
 */
async function create(req, res, next) {
  const transaction = await sequelize.transaction();

  try {
    const { regionId, cityId, categoryId, price, currency, description } = req.body;
    let { tags } = req.body;
    const _user = req.activeUser;
    
    // Create announcement 
    const announcement = await Announcements.create({
      userId :_user.id,
      regionId,
      cityId,
      categoryId,
      price,
      currency,
      description,
    }, { transaction });

    // Extract keywords (tags)
    if(!tags || !tags.length) {
      tags = keywordExtract(description);
    }

    // Create tags
    const { createdTags, existingTags } = await createTags(tags, transaction);

    // Associate created tags and created announcement
    let r = await associateTagsAndAnnouncement(
      announcement.id,
      [...createdTags, ...existingTags],
      transaction
    );

    // End of transaction
    await transaction.commit();

    // Send created announcement
    return res.send(announcement);
  } catch (error) {
    await transaction.rollback();
    next(DatabaseError(error.message || "Unknown"));
  }
}

/**
 * Search announcements
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function searchAnnouncement(req, res, next) {
  try {
    const { categoryId, regionId, cityId, searchText , priceFrom, priceTo, currency } = req.query;

    const cachedData = await checkCache(req.query);

    if(cachedData) {
      return res.send(cachedData);
    }

    const findOptions = {};

    // category 
    if(categoryId) {
      findOptions.categoryId = categoryId;
    }

    // location
    if(regionId) {
      findOptions.regionId = regionId;
    }

    // location
    if(cityId) {
      findOptions.cityId = cityId;
    }

    // Price and currency
    if(priceFrom || priceTo) {
      findOptions.price = {};

      if(priceFrom) {
        findOptions.price[gte] = Number(priceFrom)
      }

      if(priceTo) {
        findOptions.price[lte] = Number(priceTo);
      }

      if(currency) {
        findOptions.currency = currency;
      }
    }


    // Serach by text
    let matchedAnnouncementsIds = [];
    if(searchText) {
      matchedAnnouncementsIds = await searchAnnouncementsByTags(searchText);

      if(!matchedAnnouncementsIds || matchedAnnouncementsIds.length === 0) {
        return res.send([]);
      }
    }

    if(matchedAnnouncementsIds && matchedAnnouncementsIds.length) {
      findOptions.id = matchedAnnouncementsIds;
    }

    const result = await Announcements.findAll({ where : findOptions });

    // Set cache
    setImmediate(() => {
      setCache(req.query, result);
    });
    
    return res.send(result);
  } catch (error) {
    next(DatabaseError(error.message));
  }
}

/**
 * Delete announcement
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function _delete(req, res, next) {
  try {
    const _user = req.activeUser;
    const announcementId = req.params.id;

    // Destroy execution
    const result = await Announcements.destroy({ 
      where : { id: announcementId, userId: _user.id },
      force: true 
    })

    return res.send({
      status: result ? "success": "no-action", 
      result
    });
  } catch (error) {
    next(DatabaseError(error.message || "Unknown"));
  }
}

/**
 * Get created announcements of user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function getCreatedAnnouncements(req, res, next) {
  try {
    const result = await Announcements.findAll({ 
      where : {  userId: req.activeUser.id },
      include: [
        {
          model : Locations,
          as : "region",
          attributes : ["id", "name"]
        }, 
        {
          model : Locations,
          as : "city",
          attributes : ["id", "name"]
        },
        {
          model : Categories,
          as : "category",
          attributes : ["id", "name"]
        }
      ]
    });

    return res.send(result);
  } catch (error) {
    next(DatabaseError(error.message));
  }
}

module.exports = {  
  create,
  _delete,
  search: searchAnnouncement,
  getCreatedAnnouncements
}