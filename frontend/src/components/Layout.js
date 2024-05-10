import { useContext } from "react";
import Navbar from "./Navbar";
import AuthContext from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && <Navbar />}
      <div className='container mt-3'>{children}</div>
    </>
  );
};

export default Layout;
