import React from "react";
import ShopInfo from "../../components/ShopInfo.jsx";
import ShopProfileData from "../../components/ShopProfileData.jsx";

const ShopHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-start">

        {/* Left - Shop Info */}
        <div className="w-full lg:w-[25%] lg:min-h-[90vh] bg-white rounded-sm shadow-sm p-3 sm:p-4">
          <ShopInfo isOwner={true} />
        </div>

        {/* Right - Shop Profile Data */}
        <div className="w-full flex-1 bg-white rounded-sm shadow-sm p-4 sm:p-5 lg:min-h-[90vh]">
          <ShopProfileData isOwner={true} />
        </div>

      </div>
    </div>
  );
};

export default ShopHomePage;