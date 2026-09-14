import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { getAllProducts } from "../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Loader from "../components/Layout/Loader"

const BestSelling = () => {

  const dispatch = useDispatch();
  const { isLoading, error, allProducts } = useSelector((state) => state.products || {});
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  return (
    <div>
      <Header activeHeading={2} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1 className="text-center text-2xl font-semibold py-20">
          {error}
        </h1>
      ) :
        (<div className="w-11/12 mx-auto py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts &&
              [...allProducts]
                .sort(
                  (a, b) =>
                    (b.sold_out || b.total_sell || 0) - (a.sold_out || a.total_sell || 0)
                )
                .slice(0, 7)
                .map((item) => <ProductCard key={item._id} data={item} />)}
          </div>
        </div>)}
    </div>
  );
};

export default BestSelling;




