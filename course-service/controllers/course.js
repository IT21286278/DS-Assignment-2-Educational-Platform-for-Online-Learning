import cloudinary from "../middlewares/cloudinary.js";
import Content from "../models/Content.js";
import Course from "../models/Course.js";
import Question from "../models/Questions.js";
import Quiz from "../models/Quiz.js";
import axios from "axios";
import Company from "../models/Company.js";

export const createCourse = async (req, res) => {
  const { title, description, category, company, image, price } = req.body;

  if (
    title === "" ||
    description === "" ||
    category === "" ||
    company === "" ||
    image === "" ||
    price === ""
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Create a product in Stripe
    const { data: stripeProduct } = await axios.post(
      "http://localhost:8003/create-product",
      {
        name: title,
        price: price * 100, // Stripe expects the price in cents
      }
    );

    const course = new Course({
      title,
      description,
      category,
      company,
      image,
      price,
      stripeProductId: stripeProduct.id, // Store the Stripe product ID
    });
    await course.save();

    res.status(201).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded" });
  }

  try {
    const course = await Course.findById(req.body.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Delete the existing image
    const publicId = course.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    // Upload the new image
    const result = await cloudinary.uploader.upload(req.file.path);
    const imagePath = result.secure_url;

    // Update the course
    course.title = req.body.title;
    course.description = req.body.description;
    course.category = req.body.category;
    course.image = imagePath;
    await course.save();
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  // Delete the course and course image
  try {
    const course = await Course.findById(req.params.id);
    console.log("🚀 ~ deleteCourse ~ course:", course);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Delete the existing image
    if (course.image) {
      const publicId = course.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
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

export const getCourseNameAndId = async (req, res) => {
  try {
    const courses = await Course.find().select("title _id");
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCourseByUserId = async (req, res) => {
  try {
    const jwtToken = req.headers.authorization;
    console.log("🚀 ~ getCourseByUserId ~ jwtToken:", jwtToken);

    async function fecthUser() {
      try {
        const response = await axios.get(
          `${process.env.USER_SERVICE_URL}/api/me`,
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("User cannot be found!");
      }
    }
    const user = await fecthUser();
    const userId = user._id;
    const company = await Company.findOne({ user: userId });

    const courses = await Course.find({ company: company._id }).select(
      "title image description"
    );
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "company",
      "-description -status"
    );

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("company")
      .populate({
        path: "content",
        populate: {
          path: "quiz",
          model: "Quiz",
          populate: {
            path: "questions",
            model: "Question",
          },
        },
      });
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseWithCompany = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("company");
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addContent = async (req, res) => {
  try {
    const { note, video, quiz, courseId, type, status, order } = req.body;

    if (type === "" || status === "") {
      return res.status(400).json({ error: "All fields are required" });
    }
    const content = new Content();

    if (type === "video") {
      content.video = video;
    } else if (type === "note") {
      content.note = note;
    } else {
      const questions = await Promise.all(
        quiz.questions.map(async (q) => {
          const question = new Question({
            question: q.question,
            options: q.options,
          });
          await question.save();
          return question;
        })
      );

      const newQuiz = new Quiz({
        title: quiz.title,
        questions,
      });

      await newQuiz.save();
      content.quiz = newQuiz;
    }
    content.type = type;
    content.status = status;
    content.order = order;

    await content.save();

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
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const content = await Content.findById(req.params.contentId);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    // Delete the existing content
    const publicId = content.content.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    await content.remove();
    course.content.pull(content._id);
    await course.save();

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
