"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "Images", start: 1 },
            {
                announcementId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: { model: "Announcements", key: "id" },
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                source: {
                    type: Sequelize.STRING,
                    allowNull: false,
                }
            },
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "Images");
    },
};
