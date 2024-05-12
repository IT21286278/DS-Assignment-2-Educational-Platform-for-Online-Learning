import React from "react";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import "./Success.css";

function Success() {
  return (
    <div className='success-container'>
      <div className='success-content'>
        <img
          src='https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif'
          alt='success'
          className='success-icon'
        />
        <h1 className='success-heading'>Thank you for your purchase!</h1>
        <p className='success-message'>
          Your course purchase was successful. Start learning now!
        </p>
      </div>
    </div>
  );
}

export default Success;
