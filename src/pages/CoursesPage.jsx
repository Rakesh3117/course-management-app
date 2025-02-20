import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import EachCourseItem from "../components/EachCourseItem";
import Sidebar from "../components/Sidebar";
import CourseDetailsPage from "./CourseDetailsPage";

const CoursesPage = () => {
  const [loadingSidebar, setLoadingSidebar] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [specificCourseData, setSpecificCourseData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [categoriesList, setCategoriesList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [enrollmentList, setEnrollmentList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("enrollmentList")) || [];
    } catch {
      return [];
    }
  });

  const getCoursesData = async (tech) => {
    setLoadingContent(true);
    try {
      const endpoint = tech === "all" ? "all" : tech;
      const response = await axios.get(
        `http://localhost:5001/api/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setSpecificCourseData(response?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingContent(false);
    }
  };

  const getCategoriesList = async () => {
    setLoadingSidebar(true);
    try {
      const response = await axios.get("http://localhost:5001/api/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      setCategoriesList(response?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSidebar(false);
    }
  };

  const getTechnologyProgram = async (technologyId, id) => {
    setLoadingContent(true);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/${technologyId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setSpecificCourseData(response.data);
      setShowDetails(true);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleChangeActiveTab = (category) => {
    setActiveTab(category);
    setShowDetails(false);
    setSpecificCourseData([]);
    setForceRefresh((prev) => !prev);
  };

  useEffect(() => {
    getCoursesData(activeTab);
  }, [activeTab, forceRefresh]);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    localStorage.setItem("enrollmentList", JSON.stringify(enrollmentList));
  }, [enrollmentList]);

  const handleCourseSelect = (technologyName, productId) => {
    getTechnologyProgram(technologyName, productId);
  };

  return (
    <div className="flex">
      <div>
        {loadingSidebar ? (
          <p>Loading Sidebar...</p>
        ) : (
          <Sidebar
            activeTab={activeTab}
            categoriesList={categoriesList}
            handleChangeActiveTab={handleChangeActiveTab}
          />
        )}
      </div>
      <div className="w-[80vw]">
        <div className="h-[90vh] p-6 overflow-y-scroll">
          {loadingContent ? (
            <p>Loading Content...</p>
          ) : showDetails ? (
            <div className="flex justify-center">
              <CourseDetailsPage
                activeTab={activeTab}
                technologyId={
                  categoriesList?.find(
                    (category) => category?.name === activeTab
                  )?.technologyId
                }
                handleChangeActiveTab={handleChangeActiveTab}
                specificCourseData={specificCourseData}
                setEnrollmentList={setEnrollmentList}
              />
            </div>
          ) : (
            <div>
              {specificCourseData?.map((course) => (
                <div key={course?.productId} className="mb-[20px]">
                  <Heading name={course?.name} />
                  <div
                    className={`flex ${
                      activeTab === "all" ? "overflow-x-auto" : "flex-wrap "
                    } space-x-5 p-5`}
                  >
                    {course?.programs?.map((program) => (
                      <EachCourseItem
                        key={uuidv4()}
                        course={program}
                        technologyId={course?.technologyId}
                        individual={activeTab === "all" ? false : true}
                        handleClick={(technologyId, productId) =>
                          handleCourseSelect(technologyId, productId)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
