import React from "react";
import CourseCard from "../components/CourseCard";

const CourseScreen = () => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  );
};

export default CourseScreen;
