// eslint-disable-next-line react/prop-types
const ChipTextWithCategory = ({ categoryName }) => {
  return (
    <div className="p-3 rounded-[20px] border-1 border-[#1b70c5] bg-[#cfdeed] cursor-pointer  mb-[20px]">
      <p className="text-[#000] text-center">{categoryName}</p>
    </div>
  );
};

export default ChipTextWithCategory;
