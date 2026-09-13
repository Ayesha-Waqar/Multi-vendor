import React, { useEffect, useState } from "react";

const CountDown = ({ data, product, isDeadline }) => {
  const eventItem = data || product;

  function calculateTimeLeft() {
    const finishDateStr =
      eventItem?.endDate ||
      eventItem?.Finish_Date ||
      eventItem?.FinishDate ||
      eventItem?.finish_Date;

    if (!finishDateStr) return {};

    const targetDate = new Date(finishDateStr);
    const difference = targetDate.getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventItem]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (timeLeft[interval] === undefined) return null;

    if (isDeadline) {
      return (
        <span key={interval} className="text-2xl md:text-3xl font-black text-[#E53E3E] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
          {timeLeft[interval]}<span className="text-[10px] font-bold text-[#CA6363] uppercase tracking-widest ml-1">{interval}</span>
        </span>
      );
    }

    return (
      <span key={interval} className="text-lg font-bold text-pink-600 bg-pink-100/60 px-3 py-1.5 rounded-lg shadow-xs">
        {timeLeft[interval]} <span className="text-xs font-medium text-gray-600 uppercase ml-0.5">{interval}</span>
      </span>
    );
  });

  return (
    <div className={`flex items-center flex-wrap ${isDeadline ? 'justify-between' : 'justify-start gap-3'}`}>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className={`text-lg font-black uppercase tracking-[0.2em] ${isDeadline ? 'text-red-500' : 'text-red-600'}`}>
          Event Concluded
        </span>
      )}
    </div>
  );
};

export default CountDown;