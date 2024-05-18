const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { object, string, number } = require("yup");

router.get("/", async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (error) {}
});

module.exports = router;
