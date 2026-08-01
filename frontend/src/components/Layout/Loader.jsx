import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/ecomerce_animation_loader.json"

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-72 h-72"
      />

      <h2 className="text-2xl font-bold text-gray-800 -mt-4">
        Loading...
      </h2>

      <p className="text-gray-500 mt-2">
        Preparing your shopping experience.
      </p>
    </div>
  );
};

export default Loader;