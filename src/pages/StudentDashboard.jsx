/* eslint-disable no-unused-vars */
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import axios from "axios";
import EachCourseItem from "../components/eachCourseItem";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Enrolled Courses");
  const [enrollmentCoursesList, setEnrollmentCoursesList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("enrollmentList")) || [];
    } catch {
      return [];
    }
  });

  const getEnrolledCoursesList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/all-enrolled-course-list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    getEnrolledCoursesList();
  }, []);

  return (
    <div className="flex">
      <div>
        <Sidebar
          isCourseSidebar={false}
          activeTab={activeTab}
          categoriesList={ProfileNavbarItems}
        />
      </div>
      {enrollmentCoursesList?.length > 0 ? (
        <div className="w-[85vw] h-[90vh] overflow-y-scroll flex justify-center">
          <div className="w-[80vw] py-[50px]">
            <Heading name={activeTab} />
            <div className="flex flex-wrap space-x-5">
              {enrollmentCoursesList?.map((course, i) => (
                <EachCourseItem
                  isEnrollmentCourse={true}
                  individual={true}
                  key={i}
                  course={course}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[85vw] h-[90vh] flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">No Courses</h1>
          <button className="h-[50px] w-[200px] border-2 border-[#122c46] hover:bg-[#749cc5] mt-[30px] rounded-2xl">
            <Link to="/courses">Browser Courses</Link>
          </button>
        </div>
      )}
    </div>
  );
};

const ProfileNavbarItems = [
  {
    id: 1,
    name: "Enrolled Courses",
  },
  {
    id: 2,
    name: "Favourite Courses",
  },
];

export default StudentDashboard;
