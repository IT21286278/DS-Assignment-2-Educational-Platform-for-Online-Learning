import express from "express";
import {
  addContent,
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  getCourseWithCompany,
} from "../controllers/course.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/createCourse", upload.single("image"), createCourse);
router.put("/updateCourse", upload.single("image"), updateCourse);
router.get("/getCourse/:id", getCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/addContent", upload.single("video"), addContent);
router.get("/getCourseWithCompany/:id", getCourseWithCompany);

export default router;
