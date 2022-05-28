const config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "renderforest",

    host: process.env.DB_HOSTNAME | "localhost",
    dialect: "mysql",
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      underscored: true,
    },
    logging: false,
  },
  production : {}
}

module.exports = config;