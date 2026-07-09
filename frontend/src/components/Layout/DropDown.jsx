import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (category) => {
    setDropDown(false);
    navigate(`/products?category=${encodeURIComponent(category.title)}`);
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-full sm:w-72 md:w-80 bg-white rounded-lg shadow-xl border z-50 overflow-hidden">
      {categoriesData &&
        categoriesData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSubmit(item)}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition duration-200"
          >
            <img
              src={item.image_Url}
              alt={item.title}
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full"
            />

            <h3 className="text-sm sm:text-base font-medium text-gray-700">
              {item.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;