import { useContext } from "react";
import Navbar from "./Navbar";
import AuthContext from "../context/AuthContext";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && (
        <div style={{ marginBottom: "100px" }}>
          <Navbar />
        </div>
      )}
      <div className='container' style={{ fontFamily: "poppins" }}>
        {children}
      </div>
      {user && <Footer />}
    </>
  );
};

export default Layout;
