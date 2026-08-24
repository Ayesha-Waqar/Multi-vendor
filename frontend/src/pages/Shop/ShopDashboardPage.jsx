import React, { useState } from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader.jsx";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar.jsx";

const ShopDashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFBFF]">

      {/* Header */}
      <DashBoardHeader setIsOpen={setIsOpen} />

      <div className="flex">

  <DashBoardSideBar
    active="dashboard"
  />

  <main
    className="
      flex-1
      min-w-0

      ml-[64px]
      lg:ml-0

      p-4
      sm:p-6
      lg:p-8
    "
  >
    {/* Dashboard content */}
  </main>

</div>
    </div>
  );
};

export default ShopDashboardPage;