"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes ) => {
    const Categories = model(
        sequelize,
        "Categories",
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

    Categories.associate = function (models) {
        Categories.belongsTo(models["Categories"], {
            foreignKey: "parentId",
            as: "parent",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return Categories;
};
