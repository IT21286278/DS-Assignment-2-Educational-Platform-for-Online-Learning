import React, { useContext, useEffect } from "react";
import CommonContext from "../context/CommonContext";

const CourseContent = () => {
  const { selectedCourseId } = useContext(CommonContext);

  useEffect(() => {
    console.log(selectedCourseId);
  }, [selectedCourseId]);
  return <div>{selectedCourseId}</div>;
};

export default CourseContent;
