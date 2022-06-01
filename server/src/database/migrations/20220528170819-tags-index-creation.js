"use strict";
const utils = require("../utils");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return utils.addCombinedUniqueIndex(queryInterface, "Tags", {
            fields: ["phName", "hName"],
        });
    },

    down: (queryInterface, Sequelize) => {
        return utils.removeIndex(queryInterface, "Tags", "ph_name_h_name");
    },
};