// const knexConfig = require("./knexfile");

// console.log(`Environment: ${process.env.NODE_ENV}`);

// const knex = require("knex")(knexConfig[process.env.NODE_ENV || "development"]);

// console.log(knexConfig);
// console.log(`Running ${process.env.NODE_ENV || "development"} config`);

// module.exports = knex;

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
// const knex = require("knex")(knexConfig);

console.log(knexConfig);
console.log(`Running ${process.env.NODE_ENV} config`);

module.exports = knex;
