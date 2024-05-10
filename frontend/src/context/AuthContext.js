import { createContext, useContext, useEffect, useState } from "react";
import ToastContext from "./ToastContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //check user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
        } else {
          navigate(location.pathname ? location.pathname : "/");
        }
        setUser(result);
      } else {
        // navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //login request
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8002/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", result.jwtToken);
        setUser(result.user);

        navigate("/", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  //register request
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8002/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("User Registered Successfully! Login to continue ");
        navigate("/login", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
