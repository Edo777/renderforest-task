"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes) => {
    const AssoAnnouncementsTags = model(
        sequelize,
        "AssoAnnouncementsTags",
        {
            id: {
                field: "id",
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                _autoGenerated: true,
            },
            announcementId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tagId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { 
            timestamps: false,
            paranoid: false
        }
    );

    return AssoAnnouncementsTags;
};
