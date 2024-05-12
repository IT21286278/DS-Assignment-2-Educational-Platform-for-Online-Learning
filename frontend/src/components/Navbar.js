import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Logo from "../assets/Logo2.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Navbar = () => {
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-lg "
      style={{ fontFamily: "poppins" }}
    >
      <div className="container-fluid">
        <Link to="./" style={{ textDecoration: "none" }}>
          <a className="navbar-brand">
            <img src={Logo} alt="logo" style={{ height: "50px" }} />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="d-flex justify-content-end w-100 mx-3">
          <div className=" position-relative" style={{ width: "400px" }}>
            <input
              type="text"
              className="form-control border-1 border-dark"
              id="inputService"
              name="service"
              placeholder="Search Course..."
              style={{ borderRadius: "20px" }}
              // onChange={(e) => {
              //   if (e.target.value.length === 0) {
              //     getServiceDetails();
              //   }
              //   if (e.target.value) {
              //     whileTypingServiceSearch(e);
              //   }
              // }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search position-absolute end-0 top-50 translate-middle-y"
              viewBox="0 0 16 16"
              style={{ marginRight: "10px" }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
        </div>
        {/* <div className='collapse navbar-collapse' id='navbarColor02'>
          <ul className='navbar-nav ms-auto'>
           
              <li className='nav-item'>
                <button
                  type='button'
                  className='btn btn-danger btn-sm btn'
                  onClick={handleLogout}
                >
                  LOG OUT
                </button>
              </li>
          </ul>
        </div> */}
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav ms-auto">
            {user.role === "Admin" && (
              <li className="nav-item">
                <Link
                  to="./createCompanyScreen"
                  style={{ textDecoration: "none" }}
                >
                  <p className="nav-item ">
                    <button className=" btn btn-primary btn-sm btn text-nowrap">
                      Create Company
                    </button>
                  </p>
                </Link>
              </li>
            )}
            {user.role === "Instructor" && (
              <>
                <li className="nav-item">
                  <Link to="./createCourses" style={{ textDecoration: "none" }}>
                    <p className="nav-item ">
                      <button className=" btn btn-primary btn-sm btn text-nowrap">
                        Create Course
                      </button>
                    </p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="./createQuiz" style={{ textDecoration: "none" }}>
                    <p className="nav-item ">
                      <button className=" btn btn-primary btn-sm btn text-nowrap">
                        Create Quiz
                      </button>
                    </p>
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link to="./" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <NotificationsNoneOutlinedIcon />
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <a className="nav-link">
                  <AccountCircleIcon />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
