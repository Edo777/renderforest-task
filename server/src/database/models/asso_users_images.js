"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes) => {
    const AssoUsersImages = model(
        sequelize,
        "AssoUsersImages",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            imageId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
    );

    return AssoUsersImages;
};
