const Heading = ({ name }) => {
  return (
    <div className="flex flex-col justify-start">
      <h1 className="font-bold text-3xl text-[#0e0952]">{name}</h1>
      <div
        className="h-[5px] bg-[#0e0952] mt-[10px] ml-[5px]"
        style={{ width: `${name?.length * 6}px` }}
      ></div>
    </div>
  );
};

export default Heading;
