
const SectionDividers = () => {
  return (
    <>
      <div className="h-[66px] w-[1690px] absolute z-10 left-1/2 translate-x-[-50%] bottom-[-60px] bg-white shadow-lg rotate-1">
        <div className="h-[58px] my-[4px] bg-main-red"></div>
      </div>
      <div className="h-[66px] w-[1690px] absolute z-10 left-1/2 translate-x-[-50%] bottom-[-60px] bg-white shadow-lg -rotate-2">
        <div className="h-[58px] my-[4px] bg-main-blue"></div>
      </div>
    </>
  );
};

export default SectionDividers;
