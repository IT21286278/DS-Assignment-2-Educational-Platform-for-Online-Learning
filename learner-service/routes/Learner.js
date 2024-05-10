import express from 'express';
import { addNewEnrollment, cancelEnrollment } from '../controllers/Learner.js';

const router = express.Router();

router.post('/addNewEnrollment/:courseId', addNewEnrollment);
router.put('/cancelEnrollment/:courseId', cancelEnrollment);

export default router;
