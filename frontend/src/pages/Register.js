import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import AuthContext from "../context/AuthContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please enter all the required fields!");
      return;
    }

    //check if the password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match");
      return;
    }
    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  return (
    <>
      <h3>Create your account</h3>
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
        <div className='form-group'>
          <label htmlFor='confirmPasswordInput' className='form-label mt-4'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='confirmPasswordInput'
            name='confirmPassword'
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder='Enter Password'
          />
        </div>
        <button type='submit' className='btn btn-primary my-3'>
          Register
        </button>
        <p>
          Already have an account ?{" "}
          <Link to='/login' style={{ textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
