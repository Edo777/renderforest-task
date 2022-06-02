"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "AssoUsersImages", start: 1 },
            {
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: { model: "Users", key: "id" },
                },
                imageId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    onDelete: "CASCADE",
                    references: { model: "Images", key: "id" },
                },
            },
            {
                excludesDefaultFields: ["createdAt", "updatedAt", "deletedAt"]
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "AssoUsersImages");
    },
};
