"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "AssoAnnouncementsTags", start: 1 },
            {
                announcementId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: { model: "Announcements", key: "id" },
                },
                tagId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: { model: "Tags", key: "id" },
                },
            },
            {
                excludesDefaultFields: ["createdAt", "updatedAt", "deletedAt"]
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "AssoAnnouncementsTags");
    },
};
