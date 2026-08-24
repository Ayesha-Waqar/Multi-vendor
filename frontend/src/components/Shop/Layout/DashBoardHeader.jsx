import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashBoardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <header
      className="
        w-full
        min-h-[70px]
        bg-white
        border-b
        border-pink-100
        shadow-sm
        relative
        z-[60]
      "
    >
      <div
        className="
          w-full
          min-h-[70px]
          px-3
          sm:px-6
          lg:px-10
          flex
          items-center
          justify-between
          gap-3
        "
      >
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center shrink-0"
        >
          <img
            src={logo}
            alt="Cartsy"
            className="
              h-8
              sm:h-10
              md:h-12
              lg:h-14
              w-auto
              object-contain
            "
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Desktop Navigation */}
          <nav
            className="
              hidden
              md:flex
              items-center
              gap-2
            "
          >
            {/* Coupons */}
            <Link
              to="/dashboard-coupons"
              title="Coupons"
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                lg:w-11
                lg:h-11
                rounded-full
                bg-[#EAF6FF]
                text-black
                hover:bg-[#FCE4EC]
                hover:text-[#D81B60]
                hover:scale-105
                transition-all
                duration-300
                shadow-sm
              "
            >
              <AiOutlineGift size={21} />
            </Link>

            {/* Events */}
            <Link
              to="/dashboard-events"
              title="Events"
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                lg:w-11
                lg:h-11
                rounded-full
                bg-[#EAF6FF]
                text-black
                hover:bg-[#FCE4EC]
                hover:text-[#D81B60]
                hover:scale-105
                transition-all
                duration-300
                shadow-sm
              "
            >
              <MdOutlineLocalOffer size={21} />
            </Link>

            {/* Products */}
            <Link
              to="/dashboard-products"
              title="Products"
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                lg:w-11
                lg:h-11
                rounded-full
                bg-[#EAF6FF]
                text-black
                hover:bg-[#FCE4EC]
                hover:text-[#D81B60]
                hover:scale-105
                transition-all
                duration-300
                shadow-sm
              "
            >
              <FiShoppingBag size={20} />
            </Link>

            {/* Orders */}
            <Link
              to="/dashboard-orders"
              title="Orders"
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                lg:w-11
                lg:h-11
                rounded-full
                bg-[#EAF6FF]
                text-black
                hover:bg-[#FCE4EC]
                hover:text-[#D81B60]
                hover:scale-105
                transition-all
                duration-300
                shadow-sm
              "
            >
              <FiPackage size={20} />
            </Link>

            {/* Messages */}
            <Link
              to="/dashboard-messages"
              title="Messages"
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                lg:w-11
                lg:h-11
                rounded-full
                bg-[#EAF6FF]
                text-black
                hover:bg-[#FCE4EC]
                hover:text-[#D81B60]
                hover:scale-105
                transition-all
                duration-300
                shadow-sm
              "
            >
              <BiMessageSquareDetail size={21} />
            </Link>
          </nav>

          {/* Profile - Always Visible */}
          <Link
            to={`/shop/${seller?._id}`}
            title="My Shop"
            className="shrink-0"
          >
            <div
              className="
                overflow-hidden
                rounded-full
                bg-[#EAF6FF]
                border-2
                border-[#F8BBD0]
                hover:border-[#90CAF9]
                hover:scale-105
                transition-all
                duration-300
                shadow-sm

                w-9
                h-9
                sm:w-10
                sm:h-10
                md:w-11
                md:h-11
              "
            >
              <img
                src={seller?.avatar?.url}
                alt="Seller"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default DashBoardHeader;