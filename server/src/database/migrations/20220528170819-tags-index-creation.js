"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.addSingleUniqueIndex(queryInterface, "Tags", {
            field: "hName",
        });
    },

    down: (queryInterface, Sequelize) => {
        return utils.removeIndex(queryInterface, "Tags", "hName");
    },
};
