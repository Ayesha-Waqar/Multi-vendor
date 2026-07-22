import React from "react";
import { productData } from "../../static/data";
import EventCard from "./EventCard";
import Header from "../Layout/Header";

const eventProducts = productData.filter((item) => item.isEvent);

const Events = ({ showAll = false }) => {
  const productsToShow = showAll ? eventProducts : eventProducts.slice(0, 1);

  return (
    <>
     {showAll ? <Header/> : null}
    <div className="w-11/12 mx-auto py-12">
      {/* <h1 className="text-3xl font-bold mb-8">Popular Events</h1> */}

      <div className="flex flex-col gap-8">
        {productsToShow.map((product) => (
          <EventCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </>
    
  );
};

export default Events;