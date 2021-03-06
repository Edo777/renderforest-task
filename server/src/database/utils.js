const { Utils , DataTypes, literal } = require("sequelize");
const config = require("./configs/config")["development"];

/**
 * Define model with specific options.
 * @param sequelize
 * @param modelName
 * @param newFields
 * @param options
 * @returns {any}
 */
function model(sequelize, modelName, newFields, options = {}) {
    const tableName = Utils.underscoredIf(modelName, true);

    const newOptions = {
        charset: "utf8",
        collate: "utf8_unicode_ci",
        tableName: tableName,
        timestamps: true,
        paranoid: true,
        underscoredAll: true,
        underscored: true,
        ...options,
    };

    // Set charset and collate
    if(config && config.define) {
        const { charset, collate } = config.define;

        if(charset && collate) {
            newOptions.charset = charset;
            newOptions.collate = collate;
    
            // Set collate and charset for string-type fields
            Object.keys(newFields).forEach((key) => {
                if (newFields[key].type == DataTypes.STRING) {
                    newFields[key].type += ` CHARSET ${charset} COLLATE ${collate}`;
                }
            });
        }
    }

    // Set fields from camelCase to underscored
    Object.keys(newFields).forEach(function (key) {
      newFields[key].underscored = true;
      newFields[key].field = newFields[key].field || Utils.underscoredIf(key, true);
  });

    

    return sequelize.define(modelName, newFields, newOptions);
};

/**
 * Create table using migration.
 * @param {any} queryInterface
 * @param {String | { name: String, start?: Number }} tableInfo
 * @param {any} fields
 * @param {{
 *  setDefaultFields: boolean,
 *  excludesDefaultFields: [string]
 * }} options
 * @returns {Promise<any>}
 */
const migration = function (queryInterface, tableInfo, fields, options = {}) {
    let tableName = "";
    let autoIncrementStart = 1;

    if ("string" == typeof tableInfo) {
        tableName = Utils.underscoredIf(tableInfo, true);
    } else if (tableInfo.name) {
        tableName = Utils.underscoredIf(tableInfo.name, true);

        autoIncrementStart = parseInt(tableInfo.start || 1);
        if ("number" != typeof autoIncrementStart) {
            autoIncrementStart = 1;
        }
    } else {
        throw new Error(
            `Please specify table model name, table info: ${JSON.stringify(tableInfo)}`
        );
    }

    const newFields = {
        id: {
            field: "id",
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ...fields,
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal("CURRENT_TIMESTAMP"),
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    };

    if(options.setDefaultFields === false) {
        delete newFields['id'];
        delete newFields['createdAt'];
        delete newFields['deletedAt'];
        delete newFields['updatedAt'];
        delete options.setDefaultFields;
    }

    if(options.excludesDefaultFields && options.excludesDefaultFields.length) {
        options.excludesDefaultFields.forEach((excludedField) => {
            delete newFields[excludedField];
        });

        delete options.excludesDefaultFields;
    }

    Object.keys(newFields).forEach(function (key) {
        newFields[key].underscored = true;
        newFields[key].field = newFields[key].field || Utils.underscoredIf(key, true);

        if (newFields[key].references) {
            if (newFields[key].references.model) {
                newFields[key].references.model = Utils.underscoredIf(
                    newFields[key].references.model,
                    true
                );
            }

            if (newFields[key].references.key) {
                newFields[key].references.key = Utils.underscoredIf(
                    newFields[key].references.key,
                    true
                );
            }
        }
    });

    return queryInterface.createTable(tableName, newFields, options).then(function () {
        const query = `ALTER TABLE ${tableName} AUTO_INCREMENT = ${autoIncrementStart}`;
        return queryInterface.sequelize.query(query);
    });
};

/**
 * Add Unqiue index
 * @param {any} queryInterface
 * @param {String} modelName
 * @param {{field: string, indexName?: string}} column
 * @returns {Promise<any>}
 */
 const addSingleUniqueIndex = function (queryInterface, modelName, column) {
    const tableName = Utils.underscoredIf(modelName, true);
    const fieldName = Utils.underscoredIf(column.field, true);

    let indexName = fieldName;
    if (column.indexName) {
        indexName = Utils.underscoredIf(column.indexName, true);
    }

    return queryInterface.addIndex(tableName, [fieldName], {
        name: indexName,
        unique: true,
    });
};

/**
 * Add combined Unqiue index
 * @param {any} queryInterface
 * @param {String} modelName
 * @param {{fields: string, indexName?: string}} column
 * @returns {Promise<any>}
 */
function addCombinedUniqueIndex(queryInterface, modelName, column) {
    const tableName = Utils.underscoredIf(modelName, true);
    const fieldNames = column.fields.map((field) => Utils.underscoredIf(field, true)) ;

    let indexName = fieldNames.join("_");
    if (column.indexName) {
        indexName = Utils.underscoredIf(column.indexName, true);
    }

    return queryInterface.addIndex(tableName, fieldNames, {
        name: indexName,
        unique: true,
    });
}

/**
 * Remove index
 * @param {any} queryInterface
 * @param {String} modelName
 * @param {string} column
 * @returns {Promise<any>}
 */
 const removeIndex = function (queryInterface, modelName, column) {
    const tableName = Utils.underscoredIf(modelName, true);
    const fieldName = Utils.underscoredIf(column, true);

    return queryInterface.removeIndex(tableName, fieldName);
};

/**
 * Remove combined index
 * @param {any} queryInterface
 * @param {String} modelName
 * @param {string} columns
 * @returns {Promise<any>}
 */
 const removeCombinedIndex = function (queryInterface, modelName, columns) {
    const tableName = Utils.underscoredIf(modelName, true);
    const fieldNames = columns.map((field) => Utils.underscoredIf(field, true)) ;

    return queryInterface.removeIndex(tableName, fieldNames.join("_"));
};

module.exports =  {
    model,
    migration,
    addSingleUniqueIndex,
    addCombinedUniqueIndex,
    removeCombinedIndex,
    removeIndex
};
