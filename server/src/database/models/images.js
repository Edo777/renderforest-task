"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes) => {
    const Images = model(
        sequelize,
        "Images",
        {
            announcementId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            source: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
    );

    return Images;
};
