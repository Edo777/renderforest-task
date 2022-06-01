"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes) => {
    const AssoAnnouncementsTags = model(
        sequelize,
        "AssoAnnouncementsTags",
        {
            announcementId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tagId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
    );

    return AssoAnnouncementsTags;
};
