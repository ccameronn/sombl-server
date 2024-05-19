/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  console.log("Seeding groups table...");
  await knex("groups").del();
  await knex("groups").insert([
    {
      id: 1,
      name: "Upstage Productions",
      description:
        "Musical theatre production company. Creators of the musical theatre cabaret, The 5hit Show",
      created_at: "2024-01-30 10:00:00",
      updated_at: "2024-01-30 10:00:00",
    },
    {
      id: 2,
      name: "ChoirCo",
      description: "London's freshest choir with over 120 members",
      created_at: "2024-01-30 10:00:00",
      updated_at: "2024-01-30 10:00:00",
    },
    {
      id: 3,
      name: "Lost Bobsled",
      description: "4 person barbershop group based in London",
      created_at: "2024-01-30 10:00:00",
      updated_at: "2024-01-30 10:00:00",
    },
  ]);
};
