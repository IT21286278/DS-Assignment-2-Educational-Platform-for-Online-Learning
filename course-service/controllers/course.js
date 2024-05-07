import Course from "../models/Course.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import Content from "../models/Content.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Questions.js";

export const createCourse = async (req, res) => {
  const { title } = req.body;
  try {
    const course = await Course.create({ title });
    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourseTitle = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.body.id,
      { title: req.body.title },
      { new: true }
    );
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addContent = async (req, res) => {
  const { courseId, type } = req.body;
  let contentData = { type };

  if (type === "video") {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        cb(null, "video-" + Date.now() + path.extname(file.originalname));
      },
    });

    const upload = multer({ storage: storage }).single("video");

    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      contentData.video = req.file.path;
      saveContent(contentData, courseId, res);
    });
  } else if (type === "note") {
    contentData.note = req.body.note;
    saveContent(contentData, courseId, res);
  } else if (type === "quiz") {
    const { title, questions } = req.body;
    const quiz = new Quiz({ title });
    await quiz.save();

    for (let i = 0; i < questions.length; i++) {
      const question = new Question(questions[i]);
      await question.save();
      quiz.questions.push(question._id);
    }
    await quiz.save();
    contentData.quiz = quiz._id;

    saveContent(contentData, courseId, res);
  } else {
    res.status(400).json({ error: "Invalid content type" });
  }
};

const saveContent = async (contentData, courseId, res) => {
  const content = new Content(contentData);
  await content.save();

  try {
    const course = await Course.findById(courseId);
    course.content.push(content._id);
    await course.save();
    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    course.content.pull(req.body.contentId);
    await course.save();
    await Content.findByIdAndDelete(req.body.contentId);
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
