import React from "react";

const Loading = ({ text }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div>
        <div className='spinner-border text-primary' role='status'></div>
        <span className='sr-only'>{text}...</span>
      </div>
    </div>
  );
};

export default Loading;
