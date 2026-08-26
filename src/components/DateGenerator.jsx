import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Ticket, Coffee, BookOpen, Palette, Camera, Trees, IceCream } from 'lucide-react';
import './DateGenerator.css';

const dateIdeas = [
  { text: "Picnic in the Park 🧺", icon: <Trees size={32} /> },
  { text: "Coffee Shop Hopping ☕", icon: <Coffee size={32} /> },
  { text: "Museum or Art Gallery Date 🖼️", icon: <Ticket size={32} /> },
  { text: "Book Store Browsing 📚", icon: <BookOpen size={32} /> },
  { text: "Pottery or Art Class 🎨", icon: <Palette size={32} /> },
  { text: "Ice Cream Walk in the Sun ☀️", icon: <IceCream size={32} /> },
  { text: "Zoo or Aquarium Visit 🐠", icon: <Camera size={32} /> },
  { text: "Botanical Garden Stroll 🌷", icon: <Sun size={32} /> }
];

const DateGenerator = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const generateDate = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setCurrentDate(null);

    let count = 0;
    const maxSpins = 20;
    
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * dateIdeas.length);
      setCurrentDate(dateIdeas[randomIndex]);
      count++;

      if (count >= maxSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 100); // Fast switching
  };

  return (
    <div className="date-generator-section">
      <h2 className="section-title">Virtual Date Generator</h2>
      <p className="subtitle">Only the best daytime activities for us!</p>
      
      <div className="generator-container glass-panel">
        <div className="slot-machine">
          <AnimatePresence mode="wait">
            {currentDate ? (
              <motion.div 
                key={currentDate.text}
                className="date-result"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.2 }}
              >
                <div className="date-icon">{currentDate.icon}</div>
                <h3>{currentDate.text}</h3>
              </motion.div>
            ) : (
              <div className="date-placeholder">
                <Sun size={48} color="var(--primary)" opacity={0.5} />
                <h3>Press the button to decide our next date!</h3>
              </div>
            )}
          </AnimatePresence>
        </div>

        <motion.button 
          className="spin-btn"
          onClick={generateDate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSpinning}
        >
          {isSpinning ? "Deciding..." : "Surprise Me!"}
        </motion.button>
      </div>
    </div>
  );
};

export default DateGenerator;
