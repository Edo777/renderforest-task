"use strict";
const { model } = require("../utils");
const Password = require("../../services/password");

module.exports = (sequelize, DataTypes) => {
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
        { 
            defaultScope: {
                attributes: { exclude: ['password'] }
            }
        }
    );

    Users.beforeCreate(async (user, options) => {
        user.password = await Password.hash(user.password);
    });

    return Users;
};
