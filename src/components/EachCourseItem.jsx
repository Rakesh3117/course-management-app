/* eslint-disable react/prop-types */
const EachCourseItem = ({
  isEnrollmentCourse = false,
  course,
  trending = false,
  individual = false,
  technologyId = "",
  handleClick = () => {},
}) => {
  return (
    <>
      <div
        className={`${
          individual ? "w-[450px] h-[570px]" : "w-[500px] h-[570px]"
        } mt-[30px] bg-[#eceff3] flex-shrink-0 ${trending ? "relative" : ""}`}
      >
        <div className="relative">
          <img src={course?.courseImageUrl} className="w-full h-[250px]" />
          {trending && (
            <span className="absolute top-2 right-2 bg-[#122c46] text-white text-sm font-bold px-8 py-2 rounded-[5px] shadow-md">
              Trending
            </span>
          )}
        </div>
        <div className="pt-6">
          <h1 className="text-xl h-[50px] font-semibold text-center">
            {course?.productName || course?.courseName}
          </h1>
        </div>
        <div className="p-5">
          <div className="flex space-x-1.5 h-[60px]">
            <p className="font-semibold">Description:</p>
            <span>{course?.courseDescription || "None"}</span>
          </div>
          <div className="flex justify-between ">
            <div>
              <div className="flex space-x-1.5">
                <p className="font-semibold">Program Type : </p>
                <span className="capitalize">{course?.programType}</span>
              </div>
              <div className="flex space-x-1.5">
                <p className="font-semibold">Duration:</p>
                <span className="capitalize">{course?.programDurations}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Sponsered by :</p>
              <img
                src={course?.logo || course?.logoNew}
                className="h-[30px] w-[100px] "
              />
            </div>
          </div>
          <div className="flex justify-end mt-[40px]">
            {!isEnrollmentCourse ? (
              <button
                onClick={() => handleClick(technologyId, course?.productId)}
                className="w-full p-2 border-1 border-[#122c46] rounded-lg text-[#122c46] font-bold cursor-pointer hover:bg-[#232f3b] hover:text-[#fff]"
              >
                Course Details
              </button>
            ) : (
              <button className="w-full p-2 border-1 border-[#124629] rounded-lg text-[#122c46] font-bold cursor-pointer hover:bg-[#284226] hover:text-[#fff]">
                Start learning
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EachCourseItem;
