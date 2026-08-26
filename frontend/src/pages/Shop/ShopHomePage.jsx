import React from "react";
import ShopInfo from "../../components/ShopInfo.jsx";
import ShopProfileData from "../../components/ShopProfileData.jsx";

const ShopHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="flex gap-5 items-start">

        {/* Left - Shop Info */}
        <div className="w-[25%] min-h-[90vh] bg-white rounded-sm shadow-sm p-4">
          <ShopInfo isOwner={true} />
        </div>

        {/* Right - Shop Profile Data */}
        <div className="flex-1 bg-white rounded-sm shadow-sm p-5 min-h-[90vh]">
          <ShopProfileData isOwner={true} />
        </div>

      </div>
    </div>
  );
};

export default ShopHomePage;