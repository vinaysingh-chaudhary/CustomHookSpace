import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-10 bg-black lg:pr-4 ">
      <div className="h-[40%] w-full relative overflow-hidden rounded-lg">
        <div className=" h-full w-full absolute bg-gradient-to-l from-black to-gray-900 animate-gradient-x animate-pulse"></div>
      </div>
      <div className="h-[60%] w-full relative overflow-hidden rounded-lg">
        <div className="h-full w-full absolute bg-gradient-to-l from-black to-gray-900 animate-gradient-x animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
