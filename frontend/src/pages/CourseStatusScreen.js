import React, { useEffect, useState } from "react";
import { COURSE_SERVICE_BASE_URL } from "../config/config";
import { Card, Col, Row } from "react-bootstrap";

const CourseStatusScreen = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await fetch(
        `${COURSE_SERVICE_BASE_URL}/fetchAllDraftCourses`
      );
      const data = await response.json();
      if (!data.error) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container ">
      <Row>
        {courses ? (
          courses.map((course) => (
            <Col xs={12} sm={6} md={4} lg={3} key={course._id}>
              <Card
                style={{ width: "100%", marginBottom: "20px" }}
                // onClick={() => onclickCourse(course._id)}
              >
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  {/* <Card.Text>{course.description}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h1>No courses found</h1>
        )}
      </Row>
    </div>
  );
};

export default CourseStatusScreen;
