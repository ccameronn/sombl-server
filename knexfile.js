require("dotenv").config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("NODE_ENV:", process.env.NODE_ENV);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: "utf8",
    },

    migrations: {
      directory: "./DBSetup/migrations",
    },
    seeds: {
      directory: "./DBSetup/seeds",
    },
  },

  production: {
    client: "mysql2",
    connection: process.env.JAWSDB_URL,

    migrations: {
      directory: "./DBSetup/migrations",
    },
    seeds: {
      directory: "./DBSetup/seeds",
    },
  },
};
