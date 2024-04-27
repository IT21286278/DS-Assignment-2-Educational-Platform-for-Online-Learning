import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("Please enter all the required fields!");
      return;
    }

    loginUser(credentials);
  };
  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='inputEmail' className='form-label mt-4'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmail'
            name='email'
            value={credentials.email}
            onChange={handleInputChange}
            aria-describedby='emailHelp'
            placeholder='peter@example.com'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='passwordInput' className='form-label mt-4'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='passwordInput'
            name='password'
            value={credentials.password}
            onChange={handleInputChange}
            placeholder='Enter Password'
          />
        </div>
        <button type='submit' className='btn btn-primary my-3'>
          Submit
        </button>
        <p>
          Don't have an account ?{" "}
          <Link to='/register' style={{ textDecoration: "none" }}>
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
