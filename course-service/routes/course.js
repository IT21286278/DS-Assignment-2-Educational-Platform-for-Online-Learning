import express from "express";
import {
  addContent,
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  getCourseWithCompany,
} from "../controllers/course.js";

const router = express.Router();

router.post("/createCourse", createCourse);
router.get("/getCourse", getCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/addContent", addContent);
router.put("/updateCourse", updateCourse);
router.get("/getCourseWithCompany/:id", getCourseWithCompany);

export default router;
