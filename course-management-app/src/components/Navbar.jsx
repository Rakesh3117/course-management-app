import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };
  return (
    <nav className="bg-[#122c46] shadow-xl fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-center items-center">
        <div className="h-[10vh] w-[90vw] mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="text-white font-bold text-xl">
              StudyPortal
            </Link>
          </div>
          <div className="flex gap-10">
            <Link to="/" className="text-white hover:text-gray-300">
              <div className="flex items-center gap-2 text-lg hover:text-[#c5dd6f]">
                <IoHome />
                <p>Home</p>
              </div>
            </Link>
            <Link to="/courses" className="text-white hover:text-gray-300">
              <div className="flex items-center gap-2 text-lg hover:text-[#c5dd6f]">
                <FaGraduationCap />
                <p>Courses</p>
              </div>
            </Link>

            <Link
              to="/student-dashboard"
              className="text-white hover:text-gray-300"
            >
              <div className="flex items-center gap-2 text-lg hover:text-[#c5dd6f]">
                <FaChalkboardTeacher />
                <p>Dashboard</p>
              </div>
            </Link>
            <div
              className="text-white hover:text-gray-300"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2 text-lg hover:text-[#c5dd6f] cursor-pointer">
                <LuLogOut />
                <p>logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
