import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Dashboard from "../components/Dashboard";
import CourseCard from "../components/CourseCard";
import CommonContext from "../context/CommonContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setSelectedCourseId, setIsEnrolled } = useContext(CommonContext);

  const getEnrolledCourses = async (selectedCourseId) => {
    const data = await fetch(
      `http://localhost:8004/enrollment/isEnrolled/${user._id}/${selectedCourseId}`
    );
    const response = await data.json();
    console.log("🚀 ~ getEnrolledCourses ~ response:", response);
    setIsEnrolled(response);
  };

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetch(
          "http://localhost:8001/course/getAllCourses"
        ).then((res) => res.json());
        setCourses(data.courses);
        // console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCourses();
  }, []);
  const onclickCourse = (course) => {
    getEnrolledCourses(course);
    console.log(course);
    setSelectedCourseId(course);
    navigate("/courseContent");
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <h2 className=''>Hello Learner! Welcome to the EduRookie</h2>
      </div>
      <Dashboard />
      <div className='d-flex justify-content-start'>
        <h2 className='ms-3 my-2'>Explore Our Top Courses...</h2>
      </div>
      <div className='container d-flex justify-content-center'>
        <div className='row'>
          {courses.map((course, index) => (
            <div className='col-md-4 mb-4' key={index}>
              <CourseCard {...course} onclickCourse={onclickCourse} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
