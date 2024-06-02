/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  console.log("Running migration: create_events_table");
  return knex.schema.createTable("events", (table) => {
    table.boolean("gig").notNullable();
    table.string("id").primary();
    table
      .string("group_id")
      .references("groups.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.string("start_time").notNullable();
    table.string("end_time").notNullable();
    table.string("month").notNullable();
    table.string("year").notNullable();
    table.string("street_address").notNullable();
    table.string("postcode").notNullable();
    table.string("organiser").notNullable();
    table.string("notes").notNullable();
    table.string("created_at").notNullable();
    table.string("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
