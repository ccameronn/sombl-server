const express = require("express");
const router = express.Router();
const knex = require("../knex");
const { object, string, number } = require("yup");

const isValidId = (id) => {
  return !isNaN(id) && parseInt(id) === parseFloat(id);
};
// Define the schema for inventory validation
let inventorySchema = object({
  warehouse_id: number().required().positive().integer(),
  item_name: string().required(),
  description: string().required(),
  category: string().required(),
  status: string().oneOf(["In Stock", "Out of Stock"]).required(),
  quantity: number().required().positive().integer(),
});

router.get("/", async (req, res) => {
  try {
    const data = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select(
        "inventories.id",
        "warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      );
    res.status(200).json(data);
  } catch (er) {
    console.log(er);
    res.status(500).send("Error getting inventory from the database");
  }
});

// GET /api/inventories/:id LP-26 Back-End: API to GET a Single Inventory Item
router.get("/:id", async (req, res) => {
  // extract id from the parameters
  const itemId = req.params.id;
  if (!isValidId(itemId)) {
    return res
      .status(400)
      .json({ message: "ID parameter must be a valid number" });
  }
  try {
    const singleItem = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select(
        "inventories.id",
        "warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .where({ "inventories.id": req.params.id })
      .first();
    if (!singleItem) {
      return res.status(404).json({
        message: `Single item ID ${req.params.id} not found`,
      });
    }
    return res.status(200).json(singleItem);
  } catch (error) {
    console.error("Error retreiving single inventory item:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /api/inventories/:id Back-End: API to PUT/EDIT an Inventory Item AGGIORNARE

// endpoint http request to database > allowing put the inventory item
// update tutti i dati in inventory
// NOTE: Because it's a PUT request, the request body replaces the resource in its entirety.
router.put("/:id", async (req, res) => {
  try {
    // validation for the quantity as a number
    const [inventory] = await knex("inventories").where("id", req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Could not find inventory" });
    }

    const result = await inventorySchema.validate({
      ...inventory,
      ...req.body,
    });

    const [warehouse] = await knex("warehouses").where(
      "id",
      result.warehouse_id
    );

    if (!warehouse) {
      return res.status(400).json({ message: "Could not find warehouse" });
    }
    console.log(result);

    await knex("inventories")
      .where({ id: req.params.id })
      .update({
        item_name: result.item_name,
        description: result.description,
        category: result.category,
        status: result.status,
        quantity: result.quantity,
        warehouse_id: result.warehouse_id
      });

    res.status(200).json({
      message: `Datas on tables ID uploaded ${result.id} successfully `,
    });
  } catch (error) {
    console.log(`Error updating: ${error}`)
    res
      .status(400)
      .json({ message: `Error updating datas for ID ${req.params.id}` });
  }
});

//4 (LP-28) Back-End: API to POST/CREATE a New Inventory Item

router.post("/", async (req, res) => {
  try {
    await inventorySchema.validate(req.body); // validation

    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    const [warehouse] = await knex("warehouses").where("id", warehouse_id);
    if (!warehouse) {
      return res
        .status(400)
        .json({ message: "Could not find  the warehouses" });
    }

    await knex("inventories").insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    });

    res.status(201).json({ message: "Data added to the inventory" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: `Error updating datas , ${error.errors.join(", ")}` }); // express the error automatically
  }
});

// delete Single inventory item
router.delete("/:id", async (req, res) => {
  const inventoryItemId = req.params.id;

  try {
    const inventoryItem = await knex("inventories")
      .where("id", inventoryItemId)
      .first();

    if (!inventoryItem) {
      return res.status(404).json({ message: "inventory item not found" });
    }

    await knex("inventories").where("id", inventoryItemId).del();

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
