const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  salt: String,
  hash: String,
  token: String,
});

module.exports = User;
