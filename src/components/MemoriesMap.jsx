import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import './MemoriesMap.css';

const MemoriesMap = () => {
  return (
    <div className="map-section">
      <h2 className="section-title">Where It All Began</h2>
      <div className="map-container glass-panel">
        <div className="map-visual">
          <motion.div 
            className="map-pin"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <div className="pin-icon">
              <Heart fill="var(--primary)" color="var(--primary)" size={24} />
            </div>
            <div className="pulse"></div>
            <div className="pin-label glass-panel">
              <h4>Krishna Softy & Softy</h4>
              <p>Our First Date Location</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MemoriesMap;
