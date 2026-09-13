import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import Loader from "../components/Layout/Loader";
const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const dispatch = useDispatch();

  const { allProducts, isLoading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Header activeHeading={3} />

      <div className="w-11/12 mx-auto py-10">

        {isLoading ? (
        <Loader/>
        ) : error ? (
          <h1 className="text-center text-2xl font-semibold py-20">
            {error}
          </h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts &&
              allProducts
                .filter(
                  (item) =>
                    !categoryData || item.category === categoryData
                )
                .map((item) => (
                  <ProductCard key={item._id} data={item} />
                ))}
          </div>
        )}

        {!isLoading &&
          !error &&
          allProducts?.filter(
            (item) =>
              !categoryData || item.category === categoryData
          ).length === 0 && (
            <h1 className="text-center text-2xl font-semibold py-20">
              No Products Found
            </h1>
          )}
      </div>
    </div>
  );
};

export default Products;