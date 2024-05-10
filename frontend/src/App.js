import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import CourseScreen from "./pages/CourseScreen";
import CreateCompanyScreen from "./pages/CreateCompanyScreen";
import CreateCourseScreen from "./pages/CreateCourseScreen";
import SampleCourse from "./pages/SampleCourse";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getCourses" element={<CourseScreen />} />
            <Route path="/createCourses" element={<CreateCourseScreen />} />
            <Route path="*" element={<Home />} />
            <Route
              path="/createCompanyScreen"
              element={<CreateCompanyScreen />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<SampleCourse />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
