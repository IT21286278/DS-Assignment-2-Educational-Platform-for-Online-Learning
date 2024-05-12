import React, { useContext, useEffect, useState } from "react";
import CommonContext from "../context/CommonContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const CourseContent = () => {
  const { selectedCourseId } = useContext(CommonContext);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    handleCourseClick();
  }, [selectedCourseId]);

  const handleCourseClick = async () => {
    const data = await fetch(
      `http://localhost:8001/course/getCourseById/${selectedCourseId}`
    );
    const response = await data.json();

    // Sort the content based on the order attribute
    const sortedContent = response.course.content.sort(
      (a, b) => a.order - b.order
    );

    // Update the state with the sorted content
    setCourse({
      ...response.course,
      content: sortedContent,
    });
  };

  return (
    <Container>
      {course && (
        <Row>
          <Col md={8}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <img src={course.image} alt={course.title} className="img-fluid" />
            {course.content.map((item, index) => {
              switch (item.type) {
                case "note":
                  return (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <Card.Text>{item.note}</Card.Text>
                      </Card.Body>
                    </Card>
                  );
                case "video":
                  return (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <video
                          controls
                          src={item.video}
                          className="img-fluid"
                        />
                      </Card.Body>
                    </Card>
                  );
                case "quiz":
                  return (
                    <Card key={index} className="mb-3">
                      <Card.Body>
                        <Card.Title>{item.quiz.title}</Card.Title>
                        {item.quiz.questions.map((question, qIndex) => (
                          <div key={qIndex}>
                            <p>{question.question}</p>
                            {question.options.map((option, oIndex) => (
                              <Button variant="outline-primary" key={oIndex}>
                                {option.option}
                              </Button>
                            ))}
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  );
                default:
                  return null;
              }
            })}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={course.company.logo} />
              <Card.Body>
                <Card.Title>{course.company.name}</Card.Title>
                <Card.Text>{course.company.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CourseContent;
