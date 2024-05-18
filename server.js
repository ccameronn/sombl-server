require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
//const path = require("path");

// const knexConfig = require("./knexfile");
// const knex = require("knex")(knexConfig);

const eventsRoutes = require("./routes/events");
const groupsRoutes = require("./routes/groups");
const usersRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
// app.use("/", require(" THE ROUTES YOU WANT "))

app.use("/events", eventsRoutes);

app.use("/groups", groupsRoutes);

app.use("/users", usersRoutes);

app.listen(port, () => console.log(`The server is running at port ${port}`));
