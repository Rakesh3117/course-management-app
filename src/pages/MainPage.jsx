import { useEffect, useState } from "react";
import "./index.css";
import Heading from "../components/Heading";
import axios from "axios";
import Loader from "../components/Loader";
import ChipTextWithCategory from "../components/ChipTextWithCategory";
import EachCourseItem from "../components/EachCourseItem";
import PriceContainer from "../components/PriceContainer";
import Footer from "../components/Footer";
import { setCourses } from "../store/features/EnrollmentCourses/enrollmentCoursesSlice";

const MainPage = () => {
  const [allCoursesData, setAllCoursesData] = useState([]);
  const [partnersData, setPartnersData] = useState([]);
  const [universitiesList, setuniversitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partnersLoading, setPartnersLoading] = useState(true);
  // const getEnrolledCoursesList = useSelector(
  //   (state) => state.enrollmentCourses.courseList
  // );

  const getPartnersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/partnersData",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setPartnersData(response?.data?.partnerData);
      setuniversitiesList(response?.data?.Industries);
    } catch (err) {
      console.error(err);
    } finally {
      setPartnersLoading(false);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      console.log("data,", response);
      setLoading(false);
      setAllCoursesData(response?.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getEnrolledCoursesList = async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/all-enrolled-course-list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      console.log(response?.data);
      dispatch(setCourses(...(response?.data || [])));
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    getAllCourses();
    getPartnersData();
    getEnrolledCoursesList();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="main-page-background-image h-[400px] shadow-xl flex items-center">
        <div className="w-[600px] p-5 ml-[30px] justify-center">
          <h1 className="text-3xl font-bold mb-[30px] ">
            Your Learning Journey Starts Here
          </h1>
          <p className="italic">
            Discover, learn, and master new skills with engaging lessons
            tailored just for you
          </p>
          <button
            type="button"
            className="bg-[#d4d4a5] w-[150px] p-3 rounded-[10px] text-[#242222] mt-[30px] font-semibold cursor-pointer"
          >
            ShopNow
          </button>
        </div>
      </div>
      <div className="p-7">
        <div className="w-[90vw] flex justify-center">
          <div className="w-[75vw] p-5 flex flex-wrap justify-center space-x-5">
            {allCoursesData?.map((course) => (
              <ChipTextWithCategory
                key={course?.name}
                categoryName={course?.name}
              />
            ))}
          </div>
        </div>

        <Heading name="Today Trending Courses" />
        <div className="relative w-full overflow-hidden">
          <div className="flex snap-x overflow-x-auto scroll-hidden space-x-5 p-5">
            {allCoursesData?.map((course) => (
              <EachCourseItem
                key={course?.name}
                trending={true}
                course={course?.programs?.[0]}
              />
            ))}
          </div>
        </div>
        <div className="mt-[50px]">
          <p className="text-gray-500 text-2xl text-center">
            Trusted by over 16,000 companies and millions of learners around the
            world
          </p>

          <div className="flex justify-center mt-[30px] items-center ">
            {partnersLoading ? (
              <p className="text-center">Loading</p>
            ) : (
              <div className="w-[80vw] justify-center flex  flex-wrap space-x-10">
                {partnersData?.map((partner, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-center mb-[40px]"
                  >
                    <img
                      src={partner?.image_url}
                      className="w-[150px] h-[70px]"
                      alt={partner?.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-[70px] mb-[90px]">
            <h1 className="text-3xl font-bold text-center">
              Fuel Your Growth — Tailored for You or Your Team
            </h1>
            <p className="text-gray-700 m-5 text-center">
              Achieve your goals in record time with one of our customizable
              plans or programs. Get started with a free trial today, or connect
              with our sales team to discover how we can help you scale faster
            </p>
            <div className="mt-[50px]">
              <PriceContainer />
            </div>
          </div>
          <div>
            <Heading name="Our Partners" />
            <div className="flex justify-center mt-[30px] items-center ">
              {partnersLoading ? (
                <p className="text-center">Loading</p>
              ) : (
                <div className="w-[80vw] justify-center flex  flex-wrap space-x-10">
                  {universitiesList?.map((university, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-center mb-[40px]"
                    >
                      <img
                        src={university?.image_url}
                        className="w-[150px] h-[70px]"
                        alt={university?.name}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
