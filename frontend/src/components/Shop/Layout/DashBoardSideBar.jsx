import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag, FiX } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGif } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashBoardSideBar = ({ active, isOpen, setIsOpen }) => {
  const menuItems = [
    {
      path: "/dashboard",
      icon: <RxDashboard />,
      label: "Dashboard",
      id: "dashboard",
    },
    {
      path: "/dashboard-orders",
      icon: <FiShoppingBag />,
      label: "All Orders",
      id: "orders",
    },
    {
      path: "/dashboard-products",
      icon: <FiPackage />,
      label: "All Products",
      id: "products",
    },
    {
      path: "/dashboard-createProduct",
      icon: <AiOutlineFolderAdd />,
      label: "Create Product",
      id: "createProduct",
    },
    {
      path: "/dashboard-events",
      icon: <MdOutlineLocalOffer />,
      label: "All Events",
      id: "events",
    },
    {
      path: "/dashboard-createEvent",
      icon: <VscNewFile />,
      label: "Create Event",
      id: "createEvent",
    },
    {
      path: "/dashboard-withdrawMoney",
      icon: <CiMoneyBill />,
      label: "Withdraw Money",
      id: "withdrawMoney",
    },
    {
      path: "/dashboard-messages",
      icon: <BiMessageSquareDetail />,
      label: "Shop Inbox",
      id: "messages",
    },
    {
      path: "/dashboard-coupons",
      icon: <AiOutlineGif />,
      label: "Discount Codes",
      id: "coupons",
    },
    {
      path: "/dashboard-refunds",
      icon: <HiOutlineReceiptRefund />,
      label: "Refund Orders",
      id: "refunds",
    },
    {
      path: "/dashboard-settings",
      icon: <CiSettings />,
      label: "Settings",
      id: "settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
<aside
  className="
    bg-white
    border-r border-pink-100
    shadow-sm

    /* Mobile */
    fixed
    left-0
    top-[70px]
    bottom-0
    w-[64px]
    overflow-y-auto
    z-40

    /* Desktop */
    lg:static
    lg:w-64
    lg:min-h-[calc(100vh-70px)]
    lg:overflow-y-auto
    lg:shrink-0
  "
>
  <nav className="px-2 py-4 space-y-2 lg:px-3 lg:py-5 lg:space-y-1.5">

    {menuItems.map((item) => {
      const isActive = active === item.id;

      return (
        <Link
          key={item.id}
          to={item.path}
          className={`
            group
            flex
            items-center

            /* Mobile */
            justify-center
            w-full
            h-11
            rounded-xl

            /* Desktop */
            lg:justify-start
            lg:h-auto
            lg:px-4
            lg:py-3

            transition-all
            duration-200

            ${
              isActive
                ? "bg-pink-100 text-black shadow-sm"
                : "text-gray-600 hover:bg-blue-50 hover:text-black"
            }
          `}
        >

          {/* Icon */}
          <span
            className={`
              shrink-0
              text-xl
              lg:text-xl

              ${
                isActive
                  ? "text-pink-500"
                  : "text-blue-400 group-hover:text-blue-500"
              }
            `}
          >
            {item.icon}
          </span>

          {/* Text - hidden on mobile */}
          <span
            className="
              hidden
              lg:block
              ml-3
              whitespace-nowrap
            "
          >
            {item.label}
          </span>

          {/* Active indicator */}
          {isActive && (
            <span
              className="
                hidden
                lg:block
                ml-auto
                w-1.5
                h-6
                rounded-full
                bg-pink-400
              "
            />
          )}
        </Link>
      );
    })}

  </nav>
</aside>
    </>
  );
};

export default DashBoardSideBar;