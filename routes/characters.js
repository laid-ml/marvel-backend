const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const api_key = process.env.api_key;

router.get("/characters", async (req, res) => {
  try {
    let name;
    let skip;

    if (req.query.skip) {
      req.query.skip = (Number(req.query.skip) - 1) * 100;

      skip = `&skip=${req.query.skip}`;
    } else {
      skip = "";
    }
    if (req.query.name) {
      name = `&name=${req.query.name}`;
    } else {
      name = "";
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${api_key}${skip}${name}`
    );
    // console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.id}?apiKey=${api_key}`
    );
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
