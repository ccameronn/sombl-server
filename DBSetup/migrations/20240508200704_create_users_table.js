/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  console.log("Running migration: create_users_table");
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table
      .integer("group_id")
      .unsigned()
      .references("groups.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("role").defaultTo("manager").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
