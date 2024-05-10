import express from 'express';
import {
  addContent,
  createCourse,
  getAllCourses,
  getCourse,
<<<<<<< HEAD
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
=======
  updateCourseTitle,
} from '../controllers/course.js';

const router = express.Router();

router.post('/createCourse', createCourse);
router.get('/getCourse/:id', getCourse);
router.get('/getAllCourses', getAllCourses);
router.post('/addContent', addContent);
router.put('/updateCourseTitle', updateCourseTitle);
>>>>>>> 9bb501b959926001f15316f6db0365cd924b7f61

export default router;
