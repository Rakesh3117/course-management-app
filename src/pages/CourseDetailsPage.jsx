/* eslint-disable react/prop-types */
import axios from "axios";
import { FaRegHeart, FaArrowCircleLeft } from "react-icons/fa";
import ToastMessage from "../components/ToastMessage";
import { useState } from "react";

const CourseDetailsPage = ({
  activeTab,
  specificCourseData,
  setEnrollmentList,
  handleChangeActiveTab,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastDetails, setToastDetails] = useState({
    type: "",
    message: "",
  });
  const [enroll, setEnroll] = useState(false);

  const payload = {
    technologyId: specificCourseData?.technologyId,
    courseId: specificCourseData?.id,
    enrolledCourse: {
      ...specificCourseData,
      technologyId: specificCourseData?.technologyId,
      courseId: specificCourseData?.id,
    },
  };
  const enrollmentCourses =
    JSON.parse(localStorage.getItem("enrollmentList")) || [];

  const isEnrolledCourse = enrollmentCourses?.some(
    (course) =>
      course?.technologyId == specificCourseData?.technologyId &&
      course?.id == specificCourseData?.id
  );

  const addCourseToEnrolledList = async () => {
    try {
      if (!specificCourseData) {
        return;
      }

      const response = await axios.post(
        `http://localhost:5001/api/add-course-to-enrolled-list`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setEnrollmentList((prev) => [
        ...prev,
        {
          ...specificCourseData,
          technologyId: specificCourseData?.technologyId,
        },
      ]);
      setShowToast(true);
      setEnroll(true);
      setToastDetails({ type: "success", message: "Successfully Added" });
    } catch (err) {
      console.error("Error adding course:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="w-[50vw]">
        <button
          onClick={() => handleChangeActiveTab(activeTab)}
          type="button"
          className="flex items-center space-x-2 text-[#14296d] cursor-pointer text-xl h-[50px] mb-[40px] flxed"
        >
          <FaArrowCircleLeft />
          <p>Back</p>
        </button>
        <div className="flex justify-center">
          <img
            src={specificCourseData?.courseImageUrl}
            alt={specificCourseData?.courseName}
            className="w-[40vw] h-[30vh] rounded-lg"
          />
        </div>
        <div className="mt-[30px]">
          <h1 className="text-2xl font-bold text-center">
            {specificCourseData?.courseName}
          </h1>
          <p className="text-lg mt-[10px]">
            {specificCourseData?.description || specificCourseData?.Description}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
            <SubHeadingAndContent
              headingName="Enrollement Status:"
              contentName={
                specificCourseData?.enrollmentStatus ||
                specificCourseData?.EnrollmentStatus
              }
            />
            <SubHeadingAndContent
              headingName="Course Duration:"
              contentName={
                specificCourseData?.courseDuration ||
                specificCourseData?.CourseDuration
              }
            />
            <SubHeadingAndContent
              headingName="Location:"
              contentName={
                specificCourseData?.location || specificCourseData?.Location
              }
            />
            <SubHeadingAndContent
              headingName="Schedule:"
              contentName={
                specificCourseData?.schedule || specificCourseData?.Schedule
              }
            />
          </div>
          <div className="flex flex-col justify-center mr-[60px]">
            <h1 className="font-semibold">Sponsered by:</h1>
            <img
              src={specificCourseData?.logo || specificCourseData?.logoNew}
              alt={specificCourseData?.universityName}
              className="h-[100px] w-[250px]"
            />
            <p className="text-center font-semibold">
              {specificCourseData?.universityName}
            </p>
          </div>
        </div>
        <div className="mt-[30px]">
          <span className="font-bold">Pre requesties : </span>
          <p>
            {specificCourseData?.preRequisites ||
              specificCourseData?.PreRequisites}
          </p>
        </div>
        <div className="mt-[30px]">
          <p className="font-bold mb-[10px]">Syllabus : </p>
          <Table
            syllabus={
              specificCourseData?.syllabus || specificCourseData?.Syllabus
            }
          />
        </div>
        <div className="flex justify-between mt-[50px] mb-[50px]">
          <button className="w-1/12 h-[70px] border-2 border-[#074079] text-[#074079] rounded-lg flex justify-center items-center ">
            <FaRegHeart className="text-3xl cursor-pointer" />
          </button>
          <button className="w-1/3 h-[70px] border-2 border-[#074079] text-[#074079] rounded-lg flex justify-center items-center font-bold cursor-pointer ">
            Add to Cart
          </button>

          {enroll || isEnrolledCourse ? (
            <button className="w-1/2 h-[70px] bg-[#0e6b0e] text-white rounded-lg cursor-not-allowed">
              Congratulations! You are enrolled in this course
            </button>
          ) : (
            <button
              className="w-1/2 h-[70px] bg-[#074079] text-[#fff] rounded-lg cursor-pointer "
              onClick={addCourseToEnrolledList}
            >
              Enroll Now
            </button>
          )}
        </div>
        {showToast && (
          <ToastMessage
            type={toastDetails?.type}
            message={toastDetails?.message}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </>
  );
};

const SubHeadingAndContent = ({ headingName, contentName }) => {
  return (
    <div className="flex items-center mt-[20px]">
      <h1 className="font-bold">{headingName}</h1>
      <span className="uppercase text-xl pl-2">{contentName}</span>
    </div>
  );
};

const Table = ({ syllabus }) => {
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Week Number</th>
          <th className="p-2 border">Topics Covered </th>
          <th className="p-2 border">Content</th>
        </tr>
      </thead>
      <tbody>
        {syllabus?.map((row, i) => (
          <tr key={i} className="text-center">
            <td className="p-2 border">{row?.weekNumber || row?.WeekNumber}</td>
            <td className="p-2 border">
              {row?.topicsCovered || row?.TopicsCovered}
            </td>
            <td className="p-2 border">{row?.content || row?.Content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseDetailsPage;
