"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "Locations", start: 1 },
            {
                parentId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    references: { model: "Locations", key: "id" },
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "Locations");
    },
};
