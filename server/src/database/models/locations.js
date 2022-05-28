"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes ) => {
    const Locations = model(
        sequelize,
        "Locations",
        {
            parentId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
        },
    );

    Locations.associate = function (models) {
        Locations.belongsTo(models["Locations"], {
            foreignKey: "parentId",
            as: "parent",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return Locations;
};
