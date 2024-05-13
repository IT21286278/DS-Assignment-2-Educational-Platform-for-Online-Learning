import React from "react";

const CourseCard = ({
  title,
  image,
  price,
  company,
  description,
  onclickCourse,
  _id,
}) => {
  return (
    <div className='card' onClick={() => onclickCourse(_id)}>
      <img
        src={image}
        className='card-img-top'
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        {/* <p className="card-text">Price: {price}</p> */}
        {company && (
          <>
            <div className='d-flex justify-content-start g-2'>
              <div style={{ height: "15px", width: "15px", marginLeft: "0px" }}>
                <img
                  src={company.logo}
                  alt={title}
                  className='img-fluid rounded-circle me-3'
                />
              </div>
              <p className='card-text' style={{ marginLeft: "10px" }}>
                {company.name}
              </p>
            </div>
          </>
        )}
        <p className='card-text'>Price: Rs. {price}</p>
      </div>
    </div>
  );
};

export default CourseCard;
