import Learner from '../models/Learner.js';
import axios from 'axios';
import Enrollment from '../models/Enrollment.js';

const addNewEnrollment = async (req, res) => {
  const { courseId } = req.params;
  const jwtToken = req.headers.authorization;

  async function fetchCourse(courseId) {
    try {
      const response = await axios.get(
        `${process.env.COURSE_SERVICE_URL}/course/getCourse/${courseId}`
      );
      return response.data;
    } catch (error) {
      return res.status(404).json({ error: 'Course cannot be found!' });
    }
  }

  async function fecthUser() {
    try {
      const response = await axios.get(
        `${process.env.USER_SERVICE_URL}/user/me`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return res.status(404).json({ error: 'User cannot be found!' });
    }
  }

  try {
    await fetchCourse(courseId);
    const user = await fecthUser();

    const enrollment = await Enrollment.findOne({
      userId: user._id,
      courseId: courseId,
    });

    if (enrollment) {
      return res
        .status(400)
        .json({ error: 'Learner has already enrolled to this module!' });
    }

    const newEnrollment = new Enrollment({
      userId: user._id,
      courseId: courseId,
      status: 'Pending',
    });
    const savedEnrollment = await newEnrollment.save();
    return res.status(201).json(savedEnrollment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const cancelEnrollment = async (req, res) => {
  const { courseId } = req.params;
  const jwtToken = req.headers.authorization;

  async function fecthUser() {
    try {
      const response = await axios.get(
        `${process.env.USER_SERVICE_URL}/user/me`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return res.status(404).json({ error: 'User cannot be found!' });
    }
  }

  try {
    const user = await fecthUser();

    const enrollment = await Enrollment.findOne({
      userId: user._id,
      courseId: courseId,
    });

    if (!enrollment) {
      return res
        .status(404)
        .json({ error: 'Learner has not enrolled to this module!' });
    }

    if (enrollment.status === 'Cancelled') {
      return res
        .status(400)
        .json({ error: 'Learner has already cancelled this enrollment!' });
    }

    enrollment.status = 'Cancelled';
    const savedEnrollment = await enrollment.save();
    return res.status(200).json(savedEnrollment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { addNewEnrollment, cancelEnrollment };
