import React, { useContext } from "react";
import ToastContext from "../context/ToastContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profile.jpg";

function Profile() {
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout functionality
    setUser(null);
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          {/* Profile Picture */}
          <img
            src={ProfilePic}
            alt='Profile'
            className='img-fluid rounded-circle mb-3'
          />
        </div>
        <div className='col-md-9'>
          {/* Profile Details */}
          <h2 className='mb-3'>John Doe</h2>
          <div className='mb-3'>
            <strong>Address:</strong> 123 Main Street, City, Country
          </div>
          <div className='mb-3'>
            <strong>Contact No:</strong> +1234567890
          </div>
          <div className='mb-3'>
            <strong>Email:</strong> john@example.com
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-danger' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
