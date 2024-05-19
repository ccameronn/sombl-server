const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { object, string, number } = require("yup");

// router.get("/", async (req, res) => {
//   try {
//     res.send("Hello World!");
//   } catch (error) {}
// });

router.get("/", async (req, res) => {
  try {
    const data = await knex("events").select(
      "gig",
      "id",
      "group_id",
      "title",
      "start_time",
      "end_time",
      "month",
      "street_address",
      "postcode",
      "organiser",
      "notes",
      "created_at",
      "updated_at"
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting events from the database");
  }
});

module.exports = router;
