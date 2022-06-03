const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("./configs/config")["development"];
const path =  require("path");
const fs = require("fs");

// Create sequelize connection
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
)

const db = {};

/**
 * Register modules automatically and return instances
 * @returns 
 */
module.exports = function () {
  if(Object.keys(db).length) {
    return db;
  }

  // Here will be registered modules
  const modelsPath = path.join(__dirname, "models");

  // Read models and set into one place
  fs.readdirSync(modelsPath)
    .filter(function (file) {
      return file.indexOf(".") !== 0 && [".js"].includes(file.slice(-3));
    })
    .forEach(function (file) {
      const model = require(path.join(__dirname, "models", file))(sequelize, DataTypes);
      db[model.name] = model;
    });

  // Register associations
  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Set sequelize instances
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

