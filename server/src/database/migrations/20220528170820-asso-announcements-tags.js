"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "AssoAnnouncementsTags", start: 1 , setDefaultFields: false },
            {
                announcementId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Announcements", key: "id" },
                },
                tagId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Tags", key: "id" },
                },
            },
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "AssoAnnouncementsTags");
    },
};
