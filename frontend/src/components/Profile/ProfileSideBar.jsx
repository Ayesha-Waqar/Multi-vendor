import React from "react";
import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import {
  HiOutlineReceiptRefund,
  HiOutlineShoppingBag,
  HiOutlineMenuAlt3,
  HiX,
} from "react-icons/hi";
import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";

const ProfileSideBar = ({ active, setActive, openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, title: "Profile", icon: <RxPerson size={22} /> },
    { id: 2, title: "Orders", icon: <HiOutlineShoppingBag size={22} /> },
    { id: 3, title: "Refunds", icon: <HiOutlineReceiptRefund size={22} /> },
    {
      id: 4,
      title: "Inbox",
      icon: <AiOutlineMessage size={22} />,
      action: () => navigate("/inbox"),
    },
    { id: 5, title: "Track Order", icon: <MdOutlineTrackChanges size={22} /> },
    { id: 6, title: "Payment Methods", icon: <AiOutlineCreditCard size={22} /> },
    { id: 7, title: "Address", icon: <TbAddressBook size={22} /> },
    { id: 8, title: "Log out", icon: <AiOutlineLogout size={22} /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between mb-5">
        <button
          onClick={() => setOpenSidebar(true)}
          className="p-2 rounded-lg border"
        >
          <HiOutlineMenuAlt3 size={26} />
        </button>

        <h2 className="font-semibold text-lg">My Account</h2>
      </div>

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static
        top-0 left-0
        h-screen lg:h-auto
        w-72
        bg-white
        shadow-xl lg:shadow-none
        z-50
        transform
        transition-transform
        duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setOpenSidebar(false)}>
            <HiX size={28} />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 px-5">My Account</h2>

        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setOpenSidebar(false);
                if (item.action) item.action();
              }}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition
              ${
                active === item.id
                  ? "bg-pink-50 text-pink-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileSideBar;