import React, { useState } from "react";
import UploadWidget from "../components/UploadWidget";

const AddContent = ({ courseId = "663bafc13b69cb80171a3554" }) => {
  const [content, setContent] = useState({
    type: "note",
    note: "",
    video: "",
    quiz: "",
    status: "draft",
  });

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
          <div className="mb-3">
            <label htmlFor="quiz" className="form-label">
              Quiz
            </label>
            <input
              type="text"
              className="form-control"
              id="quiz"
              placeholder="Enter quiz"
              value={content.quiz}
              onChange={(e) => setContent({ ...content, quiz: e.target.value })}
            />
          </div>
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
