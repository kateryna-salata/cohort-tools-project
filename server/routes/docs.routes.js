const express = require("express");
const router = express.Router();
const path = require("path");

const docs = path.join(__dirname, "../views/docs.html")

router.get("/", async (req, res, next) => {
  try {
    res.sendFile(docs);
  } catch (error) {
    next();
  }
});

module.exports = router;
