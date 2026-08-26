import React from 'react';
import { motion } from 'framer-motion';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import './Gallery.css';

const Gallery = () => {
  const photos = [
    photo1,
    photo2
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="gallery-section">
      <motion.h2 
        className="gallery-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Memories
      </motion.h2>
      
      <motion.div 
        className="gallery-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {photos.map((src, index) => (
          <motion.div 
            key={index} 
            className="gallery-item glass-panel"
            variants={item}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5, 
              rotateX: 5,
              zIndex: 10,
              boxShadow: "0 25px 50px -12px rgba(255, 77, 133, 0.5)"
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="glare"></div>
            <img src={src} alt={`Memory ${index + 1}`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
