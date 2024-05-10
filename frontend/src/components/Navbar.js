import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Logo from "../assets/Logo2.png";

const Navbar = ({ title = "LMS" }) => {
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <Link to='./' style={{ textDecoration: "none" }}>
          <a className='navbar-brand'>
            <img src={Logo} alt='logo' style={{ height: "50px" }} />
          </a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarColor02'>
          <ul className='navbar-nav ms-auto'>
            {user ? (
              <>
                <li
                  className='nav-item'
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logged out successfully!");
                    navigate("/login", { replace: true });
                  }}
                >
                  <button type='button' class='btn btn-danger'>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to='./login' style={{ textDecoration: "none" }}>
                    <a className='nav-link'>Login</a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='./register' style={{ textDecoration: "none" }}>
                    <a className='nav-link'>Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
