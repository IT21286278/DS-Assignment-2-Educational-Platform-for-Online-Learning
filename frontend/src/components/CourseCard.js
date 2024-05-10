import React from "react";

const CourseCard = ({
  courseTitle,
  courseDescrption,
  courseImage,
  companyName,
  companyLogo,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <img src={companyLogo} alt="company logo" />
        <h4>{companyName}</h4>
      </div>
      <div className="card-body">
        <img src={courseImage} alt="course image" />
        <h2>{courseTitle}</h2>
        <p>{courseDescrption}</p>
      </div>
    </div>
  );
};

export default CourseCard;
