"use strict";
const locations = require("./static/locations.json");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let firstInserts = [];
        for(let i = 0; i < locations.length; i++) {
            let { type, name } = locations[i];
            firstInserts.push({ type, name });
        }
        // console.log(firstInserts);

        await queryInterface.bulkInsert("locations", firstInserts, {});

        const insertedParents = await queryInterface.sequelize.query(
            `SELECT id, name from locations;`
        );

        let secondInserts = [];
        for(let i = 0; i < locations.length; i++) {
            const { name } = locations[i];
            for(let j = 0; j  < insertedParents[0].length; j++) {
                const { id: parentId, name: insertedName } = insertedParents[0][j];
                
                if(name === insertedName) {
                    secondInserts.push(
                        ...locations[i].subs.map(sub => ({ name: sub.name, type: sub.type, parent_id: parentId }))
                    );
                    break;
                }
            }
        }
        
        return await queryInterface.bulkInsert("locations", secondInserts, {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("locations", {});
    },
};
