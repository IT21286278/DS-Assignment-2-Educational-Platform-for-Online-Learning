import React, { useContext, useEffect, useState } from "react";
import CommonContext from "../context/CommonContext";
import ToastContext from "../context/ToastContext";
import Loading from "../components/Loading";
import UploadWidget from "../components/UploadWidget";

const UpdateCourse = () => {
  const { selectedCourseId } = useContext(CommonContext);
  const { toast } = useContext(ToastContext);
  const [course, setCourse] = useState(null);
  const [image, setImage] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    handleCourseClick();
    loadCompanies();
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
    setImage(response.course.image);
  };

  const loadCompanies = async () => {
    const data = await fetch("http://localhost:8001/company/getCompanyNames");
    const response = await data.json();

    if (!response.error) {
      setCompanies(response.companies || []);
    } else {
      console.log(response.error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (
      !course.title ||
      !course.description ||
      !course.category ||
      !course.price
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8001/course/updateCourse`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: course.title,
            description: course.description,
            category: course.category,

            price: course.price,
            image: image,
            courseId: selectedCourseId,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        toast.success("Course updated successfully!");
      }
    } catch (error) {
      console.error("Error updating course", error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container w-50 shadow p-4 my-3">
      <h1 className="mb-2 d-flex justify-content-center">Update Course</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {course && (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Course Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter course title"
              name="title"
              onChange={(e) => handleChange(e)}
              value={course.title}
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
              value={course.description}
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
              value={course.category}
            >
              <option>Select a course category</option>
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

          <div className="mb-3 d-flex justify-content-start">
            <label htmlFor="image" className="form-label me-3">
              Image
            </label>
            <UploadWidget onUpload={setImage} />
          </div>
          {image && (
            <img
              src={image}
              alt="Course Image"
              className="img-fluid w-50 h-50"
              style={{ maxWidth: "100px" }}
            />
          )}

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Enter course price"
              name="price"
              onChange={(e) => handleChange(e)}
              value={course.price}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn"
              style={{ borderColor: "#0455bf", color: "#0455bf" }}
              onClick={handleUpdate}
            >
              Update Course
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCourse;
