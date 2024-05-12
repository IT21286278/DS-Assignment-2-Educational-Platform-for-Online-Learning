import React from "react";

const CourseCard = ({ title, image, price, company, description }) => {
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {/* <p className="card-text">Price: {price}</p> */}
        {company && (
          <>
            <p className="card-text">{company.name}</p>
            <div style={{ height: "20px" }}>
              <img src={company.logo} alt={title} className="img-fluid h-20 " />
            </div>
          </>
        )}
        <p className="card-text">{description}</p>
        <button className="btn btn-primary">Enroll</button>
      </div>
    </div>
  );
};

export default CourseCard;
