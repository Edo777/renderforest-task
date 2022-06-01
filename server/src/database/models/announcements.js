"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes ) => {
    const Announcements = model(
        sequelize,
        "Announcements",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            regionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cityId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            currency: {
                type: DataTypes.ENUM('amd', 'usd', 'rub'),
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, 
    );

    // Locations.associate = function (models) {
    //     Locations.belongsTo(models["DoohCampaigns"], {
    //         foreignKey: "campaign_id",
    //         as: "campaign",
    //         onDelete: "CASCADE",
    //         onUpdate: "CASCADE",
    //     });
    // };

    return Announcements;
};
