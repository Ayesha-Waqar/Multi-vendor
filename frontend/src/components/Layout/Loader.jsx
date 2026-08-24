import React from "react";
import LottiePackage from "lottie-react";
import animationData from "../../assets/Cosmos.json";

const Lottie = LottiePackage.default;

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <Lottie
        animationData={animationData}
        loop
        className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72"
      />

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        Loading...
      </h2>

      <p className="text-gray-500 mt-2">
        Preparing your shopping experience.
      </p>
    </div>
  );
};

export default Loader;