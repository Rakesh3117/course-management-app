/* eslint-disable react/prop-types */
import { FaComputer } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";

const Sidebar = ({
  isCourseSidebar = true,
  handleChangeActiveTab,
  categoriesList,
  activeTab,
}) => {
  return (
    <div>
      <div
        className={`${
          isCourseSidebar ? "w-[20vw]" : "w-[15vw]"
        } h-[90vh] bg-[#1f3952] shadow-xl rounded-tr-[20px] rounded-br-[20px] p-6`}
      >
        <div className="mt-[10px]">
          {isCourseSidebar ? (
            <div className="flex items-center space-x-2">
              <FaComputer className="text-[#fff] text-3xl" />
              <h1 className="text-3xl font-bold text-[#fff] mb-[20px]">
                Technologies
              </h1>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mb-[30px]">
              <IoMdContact className="text-[100px] text-[#fff]" />
              <h1 className="text-[#fff]">User Name</h1>
            </div>
          )}
          <div className="p-4 ">
            {isCourseSidebar && (
              <h1
                className={`text-[#f7f7f7] ${
                  activeTab === "all" ? "bg-[#3b5166]" : "text-[#f7f7f7]"
                } text-[16px] mb-[5px] p-3 pl-5 rounded-xl cursor-pointer`}
                onClick={() => handleChangeActiveTab("all")}
              >
                All
              </h1>
            )}
            {categoriesList?.map((category) => (
              <h1
                className={`text-[#f7f7f7] ${
                  activeTab === category?.name
                    ? "bg-[#3b5166]"
                    : "text-[#f7f7f7]"
                } text-[16px] mb-[5px] p-3 pl-5 rounded-xl cursor-pointer`}
                key={category}
                onClick={() => handleChangeActiveTab(category?.name)}
              >
                {category?.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
