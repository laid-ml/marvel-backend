const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());

mongoose.connect(process.env.MongoDb);

app.use(cors());

// import de mes routes
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const userRoutes = require("./routes/user");
// appel de mes routes
app.use(comicsRoutes);
app.use(charactersRoutes);
app.use(userRoutes);
app.all("*", (req, res) => {
  res.status(400).json({ message: "vous étes perdu" });
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
