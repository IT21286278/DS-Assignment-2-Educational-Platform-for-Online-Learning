import React from "react";
import { Cancel as CancelIcon } from "@mui/icons-material";
import "./Cancel.css";

function Cancel() {
  return (
    <div className='cancel-container'>
      <div className='cancel-content'>
        <CancelIcon className='cancel-icon' />
        <h1 className='cancel-heading'>
          Sorry to see you cancelled your Stripe payment!
        </h1>
        <p className='cancel-message'>
          If you have any questions or concerns, please feel free to contact us.
        </p>
      </div>
    </div>
  );
}

export default Cancel;
