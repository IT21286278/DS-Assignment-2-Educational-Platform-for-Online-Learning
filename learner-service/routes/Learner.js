import express from 'express';
import { addNewEnrollment } from '../controllers/Learner.js';

const router = express.Router();

router.post('/addNewEnrollment/:courseId', addNewEnrollment);

export default router;
