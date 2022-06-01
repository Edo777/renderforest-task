"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.migration(
            queryInterface,
            { name: "Tags", start: 1 },
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                phName: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                hName: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                }
            },
            {
                excludesDefaultFields: ['createdAt', 'deletedAt', 'updatedAt']
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "Tags");
    },
};
