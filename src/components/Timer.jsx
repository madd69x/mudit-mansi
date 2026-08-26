import React, { useState, useEffect } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import './Timer.css';

const TimerBlock = ({ value, label }) => (
  <motion.div 
    className="time-block glass-panel"
    whileHover={{ y: -10, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="number-wrapper">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -20, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="number"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="label">{label}</span>
  </motion.div>
);

const Timer = ({ startDate }) => {
  const [timeTogether, setTimeTogether] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0,
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
      <h2 className="timer-heading">Time since we started</h2>
      <div className="time-blocks">
        {timeTogether.years > 0 && <TimerBlock value={timeTogether.years} label="Years" />}
        {timeTogether.months > 0 && <TimerBlock value={timeTogether.months} label="Months" />}
        <TimerBlock value={timeTogether.days} label="Days" />
        <TimerBlock value={timeTogether.hours} label="Hours" />
        <TimerBlock value={timeTogether.minutes} label="Minutes" />
        <TimerBlock value={timeTogether.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default Timer;
