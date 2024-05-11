import React from "react";

const CourseCard = ({ title, image, price, instructor }) => {
  return (
    <div className='card'>
      <img src={image} className='card-img-top' alt={title} />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>Price: {price}</p>
        <p className='card-text'>Instructor: {instructor}</p>
      </div>
    </div>
  );
};

export default CourseCard;
