const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.js");

router.post("/", async (req, res) => {
  try {
    const newCohort = new Cohort(req.body);
    const savedCohort = await newCohort.save();

    res.status(201).json(savedCohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort)
      return res.status(404).json({ message: "Cohort not found" });
    
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findOneAndUpdate(
      { cohortId: req.params._id },
      req.body,
      { new: true }
    );

    if (!updatedCohort)
      return res.status(404).json({ message: "Cohort not found" });
    
    res.json(updatedCohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    const deletedCohort = await Cohort.findOneAndDelete(
      { cohortId: req.params._id }
    );

    if (!deletedCohort)
      return res.status(404).json({ message: "Cohort not found" });
    
    res.json(deletedCohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;