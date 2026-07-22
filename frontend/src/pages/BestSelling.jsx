import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const BestSelling = () => {
  const [data, setData] = useState([]);

useEffect(()=>{
    const d = productData && productData.sort((a,b)=>a.total_sell - b.total_sell).slice(0, 6); 
    setData(d)
},[])
  return (
    <div>
      <Header activeHeading={2} />

      <div className="w-11/12 mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data &&
            data.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BestSelling;