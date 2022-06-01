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
            // Partially hashed name ( only first and last chars )
            phName: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            // Hashed name ( not partially )
            hName: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, 
        {
            indexes: [
                {
                    unique: true,
                    fields: ['phName', 'hname']
                },
            ],
            timestamps: false,
        }
    );

    Tags.beforeCreate(async (tag) => {
        if(!tag.hName || !tag.phName) {
            const { complete, partial } = numericHash.combined(tag.name);
            tag.hName = complete;
            tag.phName = partial;
        }
    });

    Tags.beforeUpdate(async (tag) => {
        const { complete, partial } = numericHash.combined(tag.name);
        tag.hName = complete;
        tag.phName = partial;
    });

    return Tags;
};
