import React, { useState } from "react";
import UploadWidget from "../components/UploadWidget";

const AddContent = ({ courseId = "663bafc13b69cb80171a3554" }) => {
  const [content, setContent] = useState({
    type: "note",
    note: "",
    video: "",
    status: "draft",
  });

  const [quiz, setQuiz] = useState({
    title: "",
    questions: [],
  });
  console.log("🚀 ~ AddContent ~ quiz:", quiz);
  const handleQuestionChange = (e, questionIndex) => {
    const questions = [...quiz.questions];
    questions[questionIndex].question = e.target.value;
    setQuiz({ ...quiz, questions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const questions = [...quiz.questions];
    questions[questionIndex].options[optionIndex].option = e.target.value;
    setQuiz({ ...quiz, questions });
  };

  const handleIsCorrectChange = (e, questionIndex, optionIndex) => {
    const questions = [...quiz.questions];
    questions[questionIndex].options[optionIndex].isCorrect = e.target.checked;
    setQuiz({ ...quiz, questions });
  };
  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question: "",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
        },
      ],
    });
  };

  const [error, setError] = useState("");

  const validateContent = () => {
    if (content.type === "" || content.status === "") {
      setError("All fields are required");
      return true;
    }
    //check video or note or quiz
    if (content.type === "video" && content.video === "") {
      setError("Video is required");
      return true;
    }
    if (content.type === "note" && content.note === "") {
      setError("Note is required");
      return true;
    }
    if (content.type === "quiz" && content.quiz === "") {
      setError("Quiz is required");
      return true;
    }
    return false;
  };

  const addContent = async () => {
    if (validateContent()) return;
    try {
      const response = await fetch("http://localhost:8001/course/addContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...content, courseId }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        clearAllDetails();
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const clearAllDetails = () => {
    setContent({
      type: "note",
      note: "",
      video: "",
      quiz: "",
      status: "draft",
    });
  };

  return (
    <div className="container w-75 shadow p-4 my-5 h-50">
      <h1 className="mb-4">Add Content</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>

          <select
            name="type"
            id="type"
            className="form-select"
            value={content.type}
            onChange={(e) => setContent({ ...content, type: e.target.value })}
          >
            <option value="video">video</option>
            <option value="quiz">quiz</option>
            <option value="note">note</option>
          </select>
        </div>
        {content && content.type === "note" ? (
          <div className="mb-3">
            <label htmlFor="note" className="form-label">
              Note
            </label>
            <input
              type="text"
              className="form-control"
              id="note"
              placeholder="Enter note"
              value={content.note}
              onChange={(e) => setContent({ ...content, note: e.target.value })}
            />
          </div>
        ) : content.type === "video" ? (
          <div className="mb-3">
            <label htmlFor="video" className="form-label">
              Video
            </label>
            <UploadWidget
              onUpload={(video) => setContent({ ...content, video: video })}
            />
          </div>
        ) : (
          content &&
          content.type === "quiz" && (
            <div className="mb-3">
              <label htmlFor="quiz" className="form-label">
                Quiz
              </label>
              <label htmlFor="title" className="form-label">
                Quiz Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter quiz title"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
              <label htmlFor="questions" className="form-label">
                Questions
              </label>
              {quiz.questions.map((q, questionIndex) => (
                <div key={questionIndex}>
                  <input
                    type="text"
                    className="form-control"
                    id={`question-${questionIndex}`}
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(e, questionIndex)}
                  />
                  {q.options.map((o, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        className="form-control"
                        id={`option-${questionIndex}-${optionIndex}`}
                        placeholder="Enter option"
                        value={o.option}
                        onChange={(e) =>
                          handleOptionChange(e, questionIndex, optionIndex)
                        }
                      />
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`isCorrect-${questionIndex}-${optionIndex}`}
                        checked={o.isCorrect}
                        onChange={(e) =>
                          handleIsCorrectChange(e, questionIndex, optionIndex)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`isCorrect-${questionIndex}-${optionIndex}`}
                      >
                        Is Correct
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <button className="btn btn-primary" onClick={addQuestion}>
                Add Question
              </button>
            </div>
          )
        )}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="form-select"
            value={content.status}
            onChange={(e) => setContent({ ...content, status: e.target.value })}
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="deleted">deleted</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={addContent}>
          Add Content
        </button>
      </div>
    </div>
  );
};

export default AddContent;
