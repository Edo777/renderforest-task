"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "Users", start: 1 },
            {
                regionId: {
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
                phone: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "Users");
    },
};
