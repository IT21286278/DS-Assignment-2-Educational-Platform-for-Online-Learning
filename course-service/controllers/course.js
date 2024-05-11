import Course from "../models/Course.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import Content from "../models/Content.js";
import Quiz from "../models/Quiz.js";
import Question from "../models/Questions.js";
import cloudinary from "../middlewares/cloudinary.js";
import streamifier from "streamifier";

export const createCourse = async (req, res) => {
  const { title, description, category, companyId } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded" });
  }

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(req.file.path);
    const imagePath = result.secure_url;

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

    await course.remove();
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
    const course = await Course.findById(req.params.id).populate("company");
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addContent = async (req, res) => {
  // Create a new content in cloudinary and add it to the course
  const { title, description, courseId } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded" });
  }

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const videoStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        // Add any additional options or transformations here
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Error uploading video" });
        }

        console.log("🚀 ~ addContent ~ result:", result);
        console.log("Video uploaded:", result);
        res.json({ success: true, result });
      }
    );

    streamifier.createReadStream(req.file.path).pipe(videoStream);
    const contentPath = result.secure_url;
    console.log("🚀 ~ addContent ~ contentPath:", contentPath);

    const content = new Content({
      title,
      description,
      content: contentPath,
    });

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
