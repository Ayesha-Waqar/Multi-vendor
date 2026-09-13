import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/actions/event";
import EventCard from "./EventCard";
import Header from "../Layout/Header";

const Events = ({ showAll = false }) => {
  const dispatch = useDispatch();
  const { allEvents = [], isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const eventsToShow = showAll ? allEvents : allEvents.slice(0, 1);

  return (
    <>
      {showAll ? <Header /> : null}
      <div className="w-11/12 mx-auto py-12">
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          <div className="flex flex-col gap-8">
            {eventsToShow.map((event) => (
              <EventCard key={event._id} data={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Events;