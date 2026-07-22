import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = [...productData].sort(
        (a, b) => b.total_sell - a.total_sell
      );
      setData(d);
    } else {
      const d = productData.filter(
        (item) => item.category === categoryData
      );
      setData(d);
    }

    // window.scrollTo(0, 0);
  }, [categoryData]);

  return (
    <div>
      <Header activeHeading={3} />

      <div className="w-11/12 mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data &&
            data.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
        </div>

        {data.length === 0 && (
          <h1 className="text-center text-2xl font-semibold py-20">
            No Products Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default Products;