import React, { useState, useEffect } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import './Timer.css';

const Timer = ({ startDate }) => {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const years = differenceInYears(now, startDate);
      const dateAfterYears = new Date(startDate.getTime());
      dateAfterYears.setFullYear(dateAfterYears.getFullYear() + years);
      
      const months = differenceInMonths(now, dateAfterYears);
      const dateAfterMonths = new Date(dateAfterYears.getTime());
      dateAfterMonths.setMonth(dateAfterMonths.getMonth() + months);
      
      const days = differenceInDays(now, dateAfterMonths);
      const dateAfterDays = new Date(dateAfterMonths.getTime());
      dateAfterDays.setDate(dateAfterDays.getDate() + days);
      
      const hours = differenceInHours(now, dateAfterDays);
      const dateAfterHours = new Date(dateAfterDays.getTime());
      dateAfterHours.setHours(dateAfterHours.getHours() + hours);
      
      const minutes = differenceInMinutes(now, dateAfterHours);
      const dateAfterMinutes = new Date(dateAfterHours.getTime());
      dateAfterMinutes.setMinutes(dateAfterMinutes.getMinutes() + minutes);
      
      const seconds = differenceInSeconds(now, dateAfterMinutes);
      
      setTimeTogether({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <div className="timer-container">
      <h2>Time Together</h2>
      <div className="time-blocks">
        {timeTogether.years > 0 && <div className="time-block"><span className="number">{timeTogether.years}</span><span className="label">Years</span></div>}
        {timeTogether.months > 0 && <div className="time-block"><span className="number">{timeTogether.months}</span><span className="label">Months</span></div>}
        <div className="time-block"><span className="number">{timeTogether.days}</span><span className="label">Days</span></div>
        <div className="time-block"><span className="number">{timeTogether.hours}</span><span className="label">Hours</span></div>
        <div className="time-block"><span className="number">{timeTogether.minutes}</span><span className="label">Minutes</span></div>
        <div className="time-block"><span className="number">{timeTogether.seconds}</span><span className="label">Seconds</span></div>
      </div>
    </div>
  );
};

export default Timer;
