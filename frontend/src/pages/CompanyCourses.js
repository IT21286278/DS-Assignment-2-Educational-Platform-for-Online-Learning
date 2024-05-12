import React, { useEffect } from "react";

const CompanyCourses = () => {
  useEffect(() => {
    getCourseByUserId();
  }, []);
  const getCourseByUserId = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/course/getCourseByUserId",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return <div>CompanyCourses</div>;
};

export default CompanyCourses;
