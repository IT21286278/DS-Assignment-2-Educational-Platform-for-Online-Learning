import express from "express";
import { addContent, createCourse } from "../controllers/course.js";

const router = express.Router();

router.post("/createCourse", createCourse);
router.post("/addContent", addContent);

export default router;
