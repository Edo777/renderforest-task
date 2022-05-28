"use strict";
const { model } = require("../utils");

module.exports = (sequelize, DataTypes ) => {
    const Users = model(
        sequelize,
        "Users",
        {
            regionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
    );

    return Users;
};
