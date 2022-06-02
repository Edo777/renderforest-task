"use strict";
const categories = require("./static/categories.json");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let firstInserts = [];
        for(let i = 0; i < categories.length; i++) {
            let { name } = categories[i];
            firstInserts.push({ name });
        }

        await queryInterface.bulkInsert("categories", firstInserts, {});

        const insertedParents = await queryInterface.sequelize.query(
            `SELECT id, name from categories;`
        );

        let secondInserts = [];
        for(let i = 0; i < categories.length; i++) {
            const { name } = categories[i];
            for(let j = 0; j  < insertedParents[0].length; j++) {
                const { id: parentId, name: insertedName } = insertedParents[0][j];
                
                if(name === insertedName) {
                    secondInserts.push(
                        ...categories[i].subs.map(sub => ({ name: sub.name, parent_id: parentId }))
                    );
                    break;
                }
            }
        }
        
        return await queryInterface.bulkInsert("categories", secondInserts, {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("categories", {});
    },
};
