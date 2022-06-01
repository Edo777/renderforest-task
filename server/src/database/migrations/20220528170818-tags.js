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
                hName: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                }
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return utils.drop(queryInterface, "Tags");
    },
};
