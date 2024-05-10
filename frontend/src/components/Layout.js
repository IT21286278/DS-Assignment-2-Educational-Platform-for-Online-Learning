import Navbar from "./Navbar";

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
