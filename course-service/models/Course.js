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
    enrollment: [mongoose.Schema.Types.ObjectId],
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
