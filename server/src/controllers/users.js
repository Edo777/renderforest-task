const { Announcements, Tags, AssoAnnouncementsTags, sequelize } = require("../database")();

const { BadRequestError, DatabaseError } = require("../errors");
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
 * Create tags
 * @param {Array<string>} tags 
 * @param { sequelize.transaction } transaction
 * @returns { Array<{id: number, name: string}> }
 */
async function createTags(tags, transaction = null) {
  // Create 
  let formattedTags = tags.map(tag => ({
    name: tag,
    phName: numericHash.partial(tag),
    hName: numericHash.complete(tag),
    hfChar: numericHash.first(tag)
  }))

  const bulkCreateOptions = {
    ignoreDuplicates: true
  }

  if(transaction) { 
    bulkCreateOptions.transaction = transaction;
  }

  // Bulk insert tags
  let createdTags = await Tags.bulkCreate(
    formattedTags, 
    bulkCreateOptions
  );

  return createdTags;
}

/**
 * Create announcement
 * @returns 
 */
async function createAnnouncement(req, res, next) {
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
    const createdTags = await createTags(tags, transaction)

    // Associate created tags and created announcement
    let r = await associateTagsAndAnnouncement(
      5000,
      createdTags,
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

module.exports = {  
  createAnnouncement,
}