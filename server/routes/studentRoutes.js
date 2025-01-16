const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Cohort = require("../models/Cohort"); // To handle cohort-specific actions

// // Student Routes

// POST /api/students - Creates a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/students - Retrieves all of the students in the database collection
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students/:studentId - Retrieves a specific student by id
router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/students/:studentId - Updates a specific student by id
router.put("/:studentId", authMiddleware, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/students/:studentId - Deletes a specific student by id
router.delete("/:studentId", authMiddleware, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(
      req.params.studentId
    );
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.json(deletedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
