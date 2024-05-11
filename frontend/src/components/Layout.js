import { useContext } from "react";
import Navbar from "./Navbar";
import AuthContext from "../context/AuthContext";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && <Navbar />}
      {/* <div className='container mt-3'> */}
      <main>{children}</main>
      {/* </div> */}
      {user && <Footer />}
    </>
  );
};

export default Layout;
