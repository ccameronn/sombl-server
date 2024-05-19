const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { object, string, number, boolean } = require("yup");
const { v4: uuidv4 } = require("uuid");

// checkes id is a number and not a fractional number
const isValidId = (id) => {
  return !isNaN(id) && parseInt(id) === parseFloat(id);
};

// GET ALL EVENTS
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

// GET EVENTS FOR A GIVEN GROUP FOR A GIVEN MONTH
router.get("/:groupId/:month", async (req, res) => {
  const groupId = req.params.groupId;
  const month = req.params.month;

  if (!isValidId(groupId)) {
    return res
      .status(400)
      .json({ message: "GROUP ID parameter must be a valid number" });
  }
  try {
    const eventsInMonth = await knex("events")
      .select(
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
      )
      .where({ group_id: groupId, month: month });
    if (eventsInMonth.length == 0) {
      return res.status(200).json({
        message: `Your group doesn't have anything planned this month`,
      });
    }
    return res.status(200).json(eventsInMonth);
  } catch (er) {
    console.log(
      `Error retrieving this month's events. Group ID: ${groupId} Month: ${month}.`,
      er
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET EVENT USING GIVEN EVENT ID
router.get("/:id", async (req, res) => {
  const eventId = req.params.id;

  if (!isValidId(eventId)) {
    return res
      .status(400)
      .json({ message: "EVENT ID parameter must be a valid number" });
  }
  try {
    const event = await knex("events")
      .select(
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
      )
      .where({ id: eventId });
    if (event.length === 0) {
      return res.status(200).json({
        message: `No event could be found with id ${eventId}`,
      });
    }
    return res.status(200).json(event);
  } catch (er) {
    console.log(
      `Error retrieving this event's details. Event ID: ${eventId}`,
      er
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error. Check console" });
  }
});

// VALIDATION EVENT ELEMENTS
let eventSchema = object({
  gig: boolean().required(),
  group_id: string().required(),
  title: string().required(),
  start_time: string().required(),
  end_time: string().required(),
  month: string().required(),
  street_address: string().required(),
  postcode: string().required(),
  organiser: string().required(),
  notes: string().required(),
});

// CREATE AN EVENT
router.post("/", async (req, res) => {
  try {
    await eventSchema.validate(req.body);

    const {
      gig,
      group_id,
      title,
      start_time,
      end_time,
      month,
      street_address,
      postcode,
      organiser,
      notes,
    } = req.body;

    const [group] = await knex("groups").where("id", group_id);
    if (!group) {
      return res
        .status(400)
        .json({ message: "This group was not found in the database" });
    }

    const id = uuidv4();

    const timestamp = new Date();
    const ukDateTimeString = timestamp.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const created_at = ukDateTimeString;
    const updated_at = ukDateTimeString;

    await knex("events").insert({
      gig,
      id,
      group_id,
      title,
      start_time,
      end_time,
      month,
      street_address,
      postcode,
      organiser,
      notes,
      created_at,
      updated_at,
    });

    res.status(201).json({ message: "New event sucessfully created" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: `Error creating new item ${error.errors.join(", ")}` });
  }
});

// DELETE AN EVENT

// EDIT AN EVENT

module.exports = router;
