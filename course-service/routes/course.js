import express from "express";
import {
  addContent,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  getCourseWithCompany,
  getCourseById,
} from "../controllers/course.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/createCourse", createCourse);
router.put("/updateCourse", upload.single("image"), updateCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.get("/getCourse/:id", getCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/addContent", upload.single("video"), addContent);
router.get("/getCourseWithCompany/:id", getCourseWithCompany);
router.get("/getCourseById/:id", getCourseById);

export default router;
