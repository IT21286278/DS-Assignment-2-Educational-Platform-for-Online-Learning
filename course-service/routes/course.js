import express from "express";
import { createCourse } from "../controllers/course.js";
i;
const router = express.Router();

router.post("/createCourse", createCourse);

export default router;
