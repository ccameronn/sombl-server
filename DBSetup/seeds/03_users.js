/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  console.log("Seeding users table...");
  await knex("users").del();
  await knex("users").insert([
    {
      id: "1",
      group_id: "1",
      name: "Cameron",
      email: "brownecameron18@gmail.com",
      password: "5hitshow",
      role: "manager",
      created_at: "2024/01/30, 10:00:00",
      updated_at: "2024/01/30, 10:00:00",
    },
    {
      id: "2",
      group_id: "2",
      name: "Erin",
      email: "erin@gmail.com",
      password: "erin",
      role: "manager",
      created_at: "2024/01/30, 10:00:00",
      updated_at: "2024/01/30, 10:00:00",
    },
    {
      id: "3",
      group_id: "3",
      name: "Will",
      email: "will@gmail.com",
      password: "will",
      role: "manager",
      created_at: "2024/01/30, 10:00:00",
      updated_at: "2024/01/30, 10:00:00",
    },
  ]);
};
