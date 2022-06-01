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
                price: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                currency: {
                    type: Sequelize.ENUM('amd', 'usd', 'rub'),
                    allowNull: true,
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "Announcements");
    },
};
