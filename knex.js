const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
console.log(knexConfig);

module.exports = knex;
