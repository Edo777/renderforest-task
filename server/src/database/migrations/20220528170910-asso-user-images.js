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
                    references: { model: "Users", key: "id" },
                },
                imageId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Images", key: "id" },
                },
            },
            {
                setDefaultFields: false
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "AssoUsersImages");
    },
};
