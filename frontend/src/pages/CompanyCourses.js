import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CommonContext from "../context/CommonContext";

const CompanyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { setSelectedCourseId } = useContext(CommonContext);

  useEffect(() => {
    getCourseByUserId();
  }, []);

  const getCourseByUserId = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/course/getCourseByUserId",
        {
          headers: {
            //Bearer token

            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();

      setCourses(data.courses);
    } catch (error) {
      console.error(error);
    }
  };
  const onclickCourse = (course) => {
    console.log(course);
    setSelectedCourseId(course);
    localStorage.setItem("selectedCourseId", course);
    navigate("/updateContent");
  };
  return (
    <div className="container ">
      {courses.map((course) => (
        <Card
          style={{ width: "18rem" }}
          key={course._id}
          onClick={() => onclickCourse(course._id)}
        >
          <Card.Img variant="top" src={course.image} />
          <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>{course.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CompanyCourses;
