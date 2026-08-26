import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ReasonsCarousel.css';

const reasons = [
  "You're hot af.",
  "You're cool af, ekdum nonchalant.",
  "You're my vibe, I can talk to you for hours.",
  "You're born to be mineeeee.",
];

const ReasonsCarousel = () => {
  const carouselRef = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  return (
    <div className="reasons-section">
      <h2 className="section-title">Why I Love You</h2>
      <motion.div ref={carouselRef} className="carousel">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="inner-carousel"
        >
          {reasons.map((reason, i) => (
            <motion.div key={i} className="reason-card glass-panel">
              <div className="reason-number">#{i + 1}</div>
              <p>{reason}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <p className="swipe-hint">{"< Swipe to see more >"}</p>
    </div>
  );
};

export default ReasonsCarousel;
