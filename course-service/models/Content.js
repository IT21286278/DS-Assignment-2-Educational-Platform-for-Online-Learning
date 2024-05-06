import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    type: ["video", "quiz", "note"],
    note: String,
    video: String,
    quiz: String,
    status: ["draft", "published", "deleted"],
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model("Content", ContentSchema);

export default Content;
