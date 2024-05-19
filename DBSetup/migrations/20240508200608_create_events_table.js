/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  console.log("Running migration: create_events_table");
  return knex.schema.createTable("events", (table) => {
    table.boolean("gig").notNullable();
    table.increments("id").primary();
    table
      .integer("group_id")
      .unsigned()
      .references("groups.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.timestamp("start_time").notNullable();
    table.timestamp("end_time").notNullable();
    table.integer("month").notNullable();
    table.string("street_address").notNullable();
    table.string("postcode").notNullable();
    table.string("organiser").notNullable();
    table.string("notes").notNullable();
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
  return knex.schema.dropTable("events");
};
