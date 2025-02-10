import "./App.css";
import MainPage from "./pages/MainPage";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

export const PrivateRoute = () => {
  const jwt_token = localStorage.getItem("jwt_token");

  return jwt_token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
