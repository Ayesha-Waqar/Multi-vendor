import React, { useState } from "react";
import Header from "../components/Layout/Header";
import ProfileSideBar from "../components/Profile/ProfileSideBar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";

const Profile = () => {
  const [active, setActive] = useState(1);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Sidebar */}
            <div className="w-full lg:w-[28%]">
              <div className="bg-white border border-pink-100 rounded-3xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                <ProfileSideBar
                  active={active}
                  setActive={setActive}
                  openSidebar={openSidebar}
                  setOpenSidebar={setOpenSidebar}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-[72%]">
              <div className="bg-white border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 min-h-[75vh]">
                <ProfileContent active={active} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;