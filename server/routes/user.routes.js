const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(err);
  }
});

module.exports = router;