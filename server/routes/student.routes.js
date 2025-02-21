const express = require("express");
const router = express.Router();
const Student = require("../models/Student.js");

router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

router.post("/", async (req, res, next) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error creating student:", err.message);
    next(err);
  }
});

router.get("/", async (req, res, next) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      console.error("Error fetching students:", err.message);
      next(err);
    }
  });

router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId }).populate("cohort");
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students by cohort:", err.message);
    next(err);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);

    if (!student)
      return res.status(404).json({ error: "Student not found" });
    
    res.status(200).json(student);
  } catch (err) {
    console.error("Error fetching student:", err.message);
    next(err);
  }
});

router.put("/:studentId", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (err) {
    console.error("Error updating student:", err.message);
    next(err);
  }
});

router.delete("/:studentId", async (req, res, next) => {
  try {
    const deletedStudent = await Student.findOneAndDelete(req.params.studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err.message);
    next(err);
  }
});

module.exports = router;