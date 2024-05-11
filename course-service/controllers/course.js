import Course from '../models/Course.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Content from '../models/Content.js';
import Quiz from '../models/Quiz.js';
import Question from '../models/Questions.js';

const storageCourseImage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './courseImages';
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, 'image-' + Date.now() + path.extname(file.originalname));
  },
});

const uploadCourseImage = multer({ storage: storageCourseImage }).single(
  'image'
);

export const createCourse = async (req, res) => {
  uploadCourseImage(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { title, description, category, companyId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    const imagePath = req.file.path;

    try {
      const course = new Course({
        title,
        description,
        category,
        company: companyId,
        image: imagePath,
      });
      await course.save();

      res.status(201).json({ course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export const updateCourse = async (req, res) => {
  uploadCourseImage(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { title, description, category, companyId } = req.body;
    console.log(req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    const imagePath = req.file.path;

    try {
      const course = await Course.findById(req.query.id);
      course.title = title;
      course.description = description;
      course.category = category;
      course.company = companyId;
      course.image = imagePath;
      await course.save();

      res.status(200).json({ course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
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

export const getCourseWithCompany = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('company');
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads';
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, 'video-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('video');

export const addContent = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { courseId, type } = req.body;
    let contentData = { type };

    if (type === 'video') {
      contentData.video = req.file.path;
      saveContent(contentData, courseId, res);
    } else if (type === 'note') {
      contentData.note = req.body.note;
      saveContent(contentData, courseId, res);
    } else if (type === 'quiz') {
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
      res.status(400).json({ error: 'Invalid content type' });
    }
  });
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
