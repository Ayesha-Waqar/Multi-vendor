import React, { useState, useEffect } from 'react'
import { productData } from '../../../static/data'
import ProductCard from '../ProductCard/ProductCard'
import { getAllProducts } from "../../../redux/actions/product.js";
import { useDispatch, useSelector } from "react-redux";


const BestDeals = () => {
  
   const dispatch = useDispatch();
  const { isLoading, error, allProducts } = useSelector((state) => state.products || {});
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 relative inline-block after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gray-800 after:mt-1">
          Best Deals
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-5">
         {allProducts &&
              [...allProducts]
                .sort(
                  (a, b) =>
                    (b.sold_out || b.total_sell || 0) - (a.sold_out || a.total_sell || 0)
                )
                .slice(0, 4)
                .map((item) => <ProductCard key={item._id} data={item} />)}
      </div>
    </div>
  )
}

export default BestDeals