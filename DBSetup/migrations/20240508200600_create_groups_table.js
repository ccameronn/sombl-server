/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  console.log("Running migration: create_groups_table");

  return knex.schema.createTable("groups", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("created_at").notNullable();
    table.string("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("groups");
};
