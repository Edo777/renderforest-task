"use strict";
const { model } = require("../utils");
const { numericHash } = require("../../utils");

module.exports = (sequelize, DataTypes) => {
    const Tags = model(
        sequelize,
        "Tags",
        {
            // This field important hash of tag's name. 
            // It will be used in time searching
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hName: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            indexes: [
                {
                    unique: true,
                    fields: ['hname']
                },
            ]
        }
    );

    Tags.beforeCreate(async (tag) => {
        if(!tag.hName) {
            const hash = numericHash(tag.name);
            tag.hName = hash;
        }
    });

    Tags.beforeUpdate(async (tag) => {
        const hash = numericHash(tag.name);
        tag.hName = hash;
    });

    return Tags;
};
