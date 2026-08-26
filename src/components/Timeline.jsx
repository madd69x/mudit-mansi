import React from 'react';
import { motion } from 'framer-motion';
import { IceCream, Utensils, Heart } from 'lucide-react';
import './Timeline.css';

const milestones = [
  {
    date: 'August 24, 2026',
    title: 'Our First Date',
    desc: 'Having ice creams at Krishna Softy and Softy. The start of something beautiful.',
    icon: <IceCream size={24} color="white" />
  },
  {
    date: 'August 25, 2026',
    title: 'Dosa Date',
    desc: 'Delicious dosa at Ramdev Dosa Corner.',
    icon: <Utensils size={24} color="white" />
  },
  {
    date: 'August 25, 2026 - 11 PM',
    title: 'Officially Ours',
    desc: 'The exact moment we officially started dating. Best night ever.',
    icon: <Heart size={24} fill="white" color="white" />
  }
];

const Timeline = () => {
  return (
    <div className="timeline-section">
      <h2 className="section-title">Our Story</h2>
      <div className="timeline-container">
        {milestones.map((item, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <div className="timeline-icon" style={{ backgroundColor: 'var(--primary)' }}>
              {item.icon}
            </div>
            <div className="timeline-content glass-panel">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
