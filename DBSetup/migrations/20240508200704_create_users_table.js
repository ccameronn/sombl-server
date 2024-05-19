/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  console.log("Running migration: create_users_table");
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary();
    table
      .string("group_id")
      .references("groups.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("role").defaultTo("manager").notNullable();
    table.string("created_at").notNullable();
    table.string("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
