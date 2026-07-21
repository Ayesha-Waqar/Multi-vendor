import React from "react";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";

const EventCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={product.image_Url[0].url}
            alt={product.name}
            className="w-[320px] h-[320px] object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold text-gray-800">
            {product.name}
          </h2>

          <p className="text-gray-600 mt-4 leading-7">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <span className="text-red-400 line-through text-xl">
              ${product.price}
            </span>

            <span className="text-3xl font-bold text-gray-900">
              ${product.discount_price}
            </span>

            <span className="ml-auto text-green-500 font-semibold">
              {product.total_sell} Sold
            </span>
          </div>

          {/* Timer */}
          <div className="mt-7 bg-pink-50 border border-pink-100 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-pink-500 uppercase tracking-wider mb-3">
              Offer Ends In
            </p>

            <CountDown product={product} />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="px-7 py-3 rounded-lg bg-pink-400 text-white font-semibold hover:bg-pink-500 transition-all duration-300 shadow-md">
              Add To Cart
            </button>

            <Link to={`/product/${product.name.replace(/\s+/g, "-")}`}
              className="px-7 py-3 rounded-lg border border-pink-400 text-pink-500 font-semibold hover:bg-pink-400 hover:text-white transition-all duration-300"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;