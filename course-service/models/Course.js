import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
