import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    title: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Instructor = mongoose.model("Instructor", InstructorSchema);

export default Instructor;
