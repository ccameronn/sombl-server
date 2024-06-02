const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { object, string, number } = require("yup");

// GET ALL GROUPS
router.get("/", async (req, res) => {
  try {
    const data = await knex("groups").select(
      "id",
      "name",
      "description",
      "created_at",
      "updated_at"
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting groups from the database");
  }
});

// GET EVENT USING GIVEN EVENT ID
router.get("/:id", async (req, res) => {
  const groupId = req.params.id;

  try {
    const group = await knex("groups")
      .select("id", "name", "description", "created_at", "updated_at")
      .where({ id: groupId });
    if (group.length === 0) {
      return res.status(200).json({
        message: `No group could be found with id ${groupId}`,
      });
    }
    return res.status(200).json(group);
  } catch (er) {
    console.log(
      `Error retrieving this group's details. Group ID: ${groupId}`,
      er
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error. Check console" });
  }
});

module.exports = router;
