import Course from "../models/Course.js";
import multer from "multer";
import path from "path";

// const CourseSchema = new mongoose.Schema(
//     {
//       title: String,
//       content: [
//         {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Content",
//         },
//       ],
//       enrollment: [mongoose.Schema.Types.ObjectId],
//       instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
//     },
//     {
//       timestamps: true,
//     }
//   );

// const ContentSchema = new mongoose.Schema(
//     {
//       type: ["video", "quiz", "note"],
//       note: String,
//       video: String,
//       quiz: String,
//       status: ["draft", "published", "deleted"],
//     },
//     {
//       timestamps: true,
//     }
//   );
export const createCourse = async (req, res) => {
  const { title, instructor } = req.body;
  try {
    const course = await Course.create({ title });
    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "video/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export const addContent =
  (upload.single("video"),
  async (req, res) => {
    const { courseId, content } = req.body;

    // Add the path of the video file to the content object
    content.video = req.file.path;

    try {
      const course = await Course.findById(courseId);
      course.content.push(content);
      await course.save();
      res.status(200).json({ course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
