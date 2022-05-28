"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "Announcements", start: 1 },
            {
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Users", key: "id" },
                },
                regionId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Locations", key: "id" },
                },
                cityId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Locations", key: "id" },
                },
                categoryId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Categories", key: "id" },
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                tags: {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "Announcements");
    },
};
