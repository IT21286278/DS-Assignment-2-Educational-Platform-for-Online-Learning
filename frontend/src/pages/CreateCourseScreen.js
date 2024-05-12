import React, { useEffect, useState } from "react";
import UploadWidget from "../components/UploadWidget";

const CreateCourseScreen = () => {
  const [companies, setCompanies] = useState([]);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    company: "",
  });

  console.log("🚀 ~ CreateCourseScreen ~ courseData:", courseData);
  useEffect(() => {
    getCompanies();
  }, []);

  const [image, setImage] = useState(null);

  const getCompanies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/company/getCompanyNames"
      );
      const data = await response.json();
      console.log(data);
      setCompanies(data.companies);
    } catch (error) {
      console.error("Error fetching companies", error);
    }
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(courseData);
    const response = await fetch("http://localhost:8001/course/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...courseData, image }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="container">
      <h1 className="my-4">Create Course</h1>
      <div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter course title"
            name="title"
            onChange={(e) => handleChange(e)}
            value={courseData.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Enter course description"
            name="description"
            onChange={(e) => handleChange(e)}
            value={courseData.description}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            aria-label="Course category select"
            name="category"
            onChange={(e) => handleChange(e)}
          >
            <option selected>Select a course category</option>
            <option value="business">Business & Entrepreneurship</option>
            <option value="computer-science">Computer Science & IT</option>
            <option value="health">Health & Wellness</option>
            <option value="arts">Arts & Design</option>
            <option value="education">Education & Teaching</option>
            <option value="engineering">Engineering & Technology</option>
            <option value="humanities">Humanities & Social Sciences</option>
            <option value="science">Science & Mathematics</option>
            <option value="languages">Language Learning</option>
            <option value="music">Music & Performing Arts</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <select
            className="form-select"
            id="company"
            name="company"
            onChange={(e) => handleChange(e)}
          >
            <option>Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <UploadWidget onUpload={setImage} />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Create Course
        </button>
      </div>
    </div>
  );
};

export default CreateCourseScreen;
