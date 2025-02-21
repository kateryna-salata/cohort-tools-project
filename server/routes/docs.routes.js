const express = require("express");
const router = express.Router();
const path = require("path");

const docs = path.join(__dirname, "../views/docs.html")

router.get("/", async (req, res) => {
  try {
    res.sendFile(docs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch docs" });
  }
});

module.exports = router;
