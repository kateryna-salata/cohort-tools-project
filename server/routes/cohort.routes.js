const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.js");

router.post("/", async (req, res, next) => {
  try {
    const newCohort = new Cohort(req.body);
    const savedCohort = await newCohort.save();

    res.status(201).json(savedCohort);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.status(200).json(cohorts);
  } catch (err) {
    next(err);
  }
});

router.get("/:cohortId", async (req, res, next) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort)
      return res.status(404).json({ message: "Cohort not found" });
    
    res.json(cohort);
  } catch (err) {
    next(err);
  }
});

router.put("/:cohortId", async (req, res, next) => {
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
    next(err);
  }
});

router.delete("/:cohortId", async (req, res, next) => {
  try {
    const deletedCohort = await Cohort.findOneAndDelete(
      { cohortId: req.params._id }
    );

    if (!deletedCohort)
      return res.status(404).json({ message: "Cohort not found" });
    
    res.json(deletedCohort);
  } catch (err) {
    next(err);
  }
});

module.exports = router;