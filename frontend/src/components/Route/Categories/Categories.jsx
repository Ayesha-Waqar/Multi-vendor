import React from 'react'
import { brandingData, categoriesData } from '../../../static/data'
import styles from '../../../styles/styles'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* section 1 - branding */}
      <div className={`${styles.section} py-8 sm:py-10`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                key={index}
                className="flex items-center sm:items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-teal-50 text-teal-700 text-xl sm:text-2xl">
                  {i.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">
                    {i.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-snug">
                    {i.Description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* categories */}
      <div id="categories" className={`${styles.section} py-8 sm:py-10`}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
          Shop by category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = () => {
                navigate(`/products?category=${i.title}`);
              };

              return (
                <div
                  key={i.id}
                  onClick={handleSubmit}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleSubmit();
                  }}
                  className="group flex flex-col items-center gap-2 sm:gap-3 rounded-xl border border-gray-100 bg-white p-3 sm:p-4 cursor-pointer hover:border-teal-200 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-50 shrink-0">
                    <img
                      src={i.image_Url}
                      alt={i.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h5 className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-snug group-hover:text-teal-700 transition-colors">
                    {i.title}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;