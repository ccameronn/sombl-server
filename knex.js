const knexConfig = require("./knexfile");
console.log(knexConfig, process.env.NODE_ENV);
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
console.log(knexConfig);

module.exports = knex;
