import React, { useContext, useEffect, useState } from "react";
import CommonContext from "../context/CommonContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";

const CourseContent = () => {
  const { selectedCourseId } = useContext(CommonContext);
  const [course, setCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Change this value to adjust the number of items per page

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

  // Logic to calculate index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Logic to calculate index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Logic to get the current items to display
  const currentItems = course?.content.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      {course && (
        <Row>
          <Col md={8}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {currentItems.map((item, index) => {
              switch (item.type) {
                case "note":
                  return (
                    <Card key={index} className='mb-3'>
                      <Card.Body>
                        <Card.Text>{item.note}</Card.Text>
                      </Card.Body>
                    </Card>
                  );
                case "video":
                  return (
                    <Card key={index} className='mb-3'>
                      <Card.Body>
                        <video
                          controls
                          src={item.video}
                          className='img-fluid'
                        />
                      </Card.Body>
                    </Card>
                  );
                case "quiz":
                  return (
                    <Card key={index} className='mb-3'>
                      <Card.Body>
                        <Card.Title>{item.quiz.title}</Card.Title>
                        {item.quiz.questions.map((question, qIndex) => (
                          <Form.Group key={qIndex}>
                            <Form.Label>{question.question}</Form.Label>
                            {question.options.map((option, oIndex) => (
                              <Form.Check
                                type='radio'
                                id={`option-${qIndex}-${oIndex}`}
                                label={option.option}
                                name={`question-${qIndex}`}
                                key={oIndex}
                              />
                            ))}
                          </Form.Group>
                        ))}
                      </Card.Body>
                    </Card>
                  );
                default:
                  return null;
              }
            })}

            <Pagination className='justify-content-center'>
              {course.content.map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    outline: "none",
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
          <Col md={4}>
            <Card style={{ marginTop: "85px" }}>
              <Card.Img variant='top' src={course.company.logo} />
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
