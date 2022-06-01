const { Announcements, Tags, AssoAnnouncementsTags } = require("../database")();
const { BadRequestError, DatabaseError } = require("../errors");
const { keywordExtract, numericHash } = require("../utils");

/**
 * Helper for findone
 * @param {object} options 
 * @returns 
 */
async function _findOne(options) {
  return await Announcements.findOne(options);
}

/**
 * Create helper
 * @param {object} data 
 * @returns 
 */
async function _create(data, model=null) {
  if(!model) {
    return await Announcements.create(data);
  }

  return await model.create(data);
}

async function createTags(announcementId, tags) {
  let createTags = tags.map(tag => ({
    name: tag,
    phName: numericHash.partial(tag),
    hName: numericHash.complete(tag),
  }))

  let createdTags = await Tags.bulkCreate(
    createTags, { ignoreDuplicates: true }
  );

  const associationsList = [];
  for(let i = 0; i < createdTags.length; i++) {
    if(createdTags[i].id) {
      associationsList.push({
        tagId: createdTags[i].id,
        announcementId
      });
    }
  }

  if(associationsList.length) {
    let result = await AssoAnnouncementsTags.bulkCreate(
      createTags, { ignoreDuplicates: true }
    );

    console.log(result)
  }
}

/**
 * Create announcement
 * @returns 
 */
async function create(req, res, next) {
  try {
    const { regionId, cityId, categoryId, price, currency, description } = req.body;
    let { tags } = req.body;
    const _user = req.activeUser;

    // const announcement = await _create({
    //   userId :_user.id,
    //   regionId,
    //   cityId,
    //   categoryId,
    //   price,
    //   currency,
    //   description,
    // });

    if(!tags || !tags.length) {
      tags = keywordExtract(description);
    }

    await createTags(1, tags)

    return res.send(tags);

    // Check existing of user by email
    const existingUser = await _findOne({ where : { email } });

    if(existingUser) {
      return next(BadRequestError('Email is in use'));
    }

    // Set user to database
    const user = await _create({ email, password, regionId , name , phone });

    // Generate JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    // Store it on session object
    req.session = { jwt: token };

    res.status(201).send({
      id: user.id,
      email: user.email
    });
  } catch (error) {
    console.log(error);
    next(DatabaseError(error.message || "Unknown"))
  }
}

module.exports = {  
  create
}