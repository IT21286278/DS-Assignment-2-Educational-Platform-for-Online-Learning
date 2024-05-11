import express from 'express';
import {
  addNewEnrollment,
  cancelEnrollment,
  enrollInCourses,
} from '../controllers/Learner.js';

const router = express.Router();

router.post('/addNewEnrollment/:courseId', addNewEnrollment);
router.put('/cancelEnrollment/:courseId', cancelEnrollment);
router.post('/enroll-in-courses', enrollInCourses);

export default router;
