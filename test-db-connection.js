require("dotenv").config();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV || "development"]);

knex
  .raw("SELECT 1")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  })
  .finally(() => {
    knex.destroy();
  });

//   node test-db-connection.js
