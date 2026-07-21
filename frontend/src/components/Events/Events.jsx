import { useState, useEffect } from "react";
import { productData } from "../../static/data";
import EventCard from "./EventCard";

const eventProducts = productData.filter((item) => item.isEvent);
const Events = () => {
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-11/12 mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Popular Events</h1>

      <EventCard product={eventProducts[currentEvent]} />
    </div>
  );
};

export default Events;