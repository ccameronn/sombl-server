const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { object, string, number } = require("yup");

const isValidId = (id) => {
  return !isNaN(id) && parseInt(id) === parseFloat(id);
};

// VALIDATION WAREHOUSES ELEMENTS
let warehousesSchema = object({
  id: number().required(),
  warehouse_name: string().required(),
  address: string().required(),
  city: string().required(),
  country: string().required(),
  contact_name: string().required(),
  contact_position: string().required(),
  contact_phone: string().required(),
  contact_email: string().email().required(),
});

router.get("/", async (req, res) => {
  try {
    const data = await knex("warehouses").select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting warehouse from the database");
  }
});

router.get("/:id", async (req, res) => {
  const warehouseId = req.params.id;
  if (!isValidId(warehouseId)) {
    return res
      .status(400)
      .json({ message: "ID parameter must be a valid number" });
  }
  try {
    const singleWarehouse = await knex("warehouses")
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .where({ id: req.params.id })
      .first();
    if (!singleWarehouse) {
      return res.status(404).json({
        message: `Single item ID ${req.params.id} not found`,
      });
    }
    return res.status(200).json(singleWarehouse);
  } catch (er) {
    console.log("Error retrieving single warehouse:", er);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const warehouseDeleted = await knex("warehouses").where({ id }).del();
    if (!warehouseDeleted) {
      res.status(404).send("Warehouse ID not found");
    } else {
      res.status(204);
    }
  } catch (error) {
    console.error("Error in deleting warehouse:", error);
    res.status(404).send("Error deleting warehouse");
  }
});

// Back-End: API to PUT/EDIT a Warehouse
// PUT /api/warehouses/:id
// 1 editing warehouse details
// 2 new data insert in my database
// 3 validation request body data

router.put("/:id", async (req, res) => {
  // richiesta end point
  try {
    console.log(req.body);
    const [warehouses] = await knex("warehouses").where("id", req.body.id);
    if (!warehouses) {
      return res.status(400).json({ message: "could not find warehouse" });
    }
    const result = await warehousesSchema.validate({
      ...warehouses,
      ...req.body,
    });
    await knex("warehouses")
      .where({ id: req.params.id })
      .update({ ...result });

    res.status(200).json({
      message: ` Warehouses details uploaded ${result.id} successfully`,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error updating datas for ID ${req.params.id} ` });
  }
});

// API to POST/CREATE a New Warehouse

router.post("/", async (req, res) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const mobileRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (!emailRegex.test(contact_email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (!mobileRegex.test(contact_phone)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  try {
    const newWarehouse = {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    };

    const createdWarehouse = await knex("warehouses")
      .insert(newWarehouse)
      .returning("id");
    const response = { id: createdWarehouse[0], ...newWarehouse };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating a new warehouse: ", error);
    res.status(500).send("Failed to create a new warehouse");
  }
});

// GET /api/inventories/:id/inventories LP-27 Back-End: API to GET Inventory Item for a given warehouse

router.get("/:id/inventories", async (req, res) => {
  const warehouseId = req.params.id;
  if (!isValidId(warehouseId)) {
    return res.status(400).json({ message: "Invalid warehouse ID" });
  }
  try {
    const inventories = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "inventories.id",
        "inventories.item_name",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .where("warehouses.id", warehouseId);

    if (inventories.length === 0) {
      return res.status(404).json({
        message: `No inventory items found for warehouse ID ${warehouseId}`,
      });
    }

    return res.status(200).json(inventories);
  } catch (error) {
    console.error("Error retrieving inventories for warehouse:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const warehouseDeleted = await knex("warehouses").where({ id }).del();
    if (!warehouseDeleted) {
      res.status(404).send("Warehouse ID not found");
    } else {
      res.status(204);
    }
  } catch (error) {
    console.error("Error in deleting warehouse:", error);
    res.status(404).send("Error deleting warehouse");
  }
});

module.exports = router;
