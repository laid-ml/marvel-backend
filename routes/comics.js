const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const api_key = process.env.api_key;

router.get("/comics", async (req, res) => {
  try {
    // let skip = req.query.skip ? (skip = `&skip=${req.query.skip}`) : "";
    // let title = req.query.title ? (title = `&title=${req.query.title}`) : "";
    let skip;
    let title;
    if (req.query.skip) {
      req.query.skip = (Number(req.query.skip) - 1) * 100;
      skip = `&skip=${req.query.skip}`;
    } else {
      skip = "";
    }
    if (req.query.title) {
      title = `&title=${req.query.title}`;
    } else {
      title = "";
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${api_key}${skip}${title}`
    );
    // console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${api_key}`
    );
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${api_key}`
    );
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
