const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const hash = require("../utils/hash");
const dehash = require("../utils/dehash");
const User = require("../models/User");
require("dotenv").config();

router.post("/user/signup", async (req, res) => {
  try {
    const { password, username, email } = req.body;

    const findMail = await User.findOne({ email: email });
    const findUsername = await User.findOne({ username: username });
    if (findMail) {
      return res.status(400).json({ message: "email déja existant" });
    }
    if (findUsername) {
      return res.status(400).json({ message: "username déja existant" });
    }
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username trop court taper plus de 3 caractéres " });
    }
    console.log("mail" + findMail);
    console.log("username" + findUsername);

    const salt = uid2(16);
    const token = uid2(20);
    const hashh = hash(password, salt);
    const newuser = new User({
      username: username,
      email: email,
      salt: salt,
      hash: hashh,
      token: token,
    });
    await newuser.save();
    res.status(201).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const finduser = await User.findOne({ username: username });
    if (!finduser) {
      return res
        .status(400)
        .json({ message: "username ou mots de passe incorect" });
    }
    if (dehash(password, finduser.salt, finduser.hash)) {
      return res
        .status(200)
        .json({ message: "mot de passe bon", token: finduser.token });
    } else {
      return res
        .status(400)
        .json({ message: "username ou mots de passe incorect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
