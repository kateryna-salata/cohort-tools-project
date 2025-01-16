const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" },
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
