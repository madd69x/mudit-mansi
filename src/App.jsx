import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import anime from 'animejs';
import { ChevronDown, Quote } from 'lucide-react';
import Timer from './components/Timer';
import LoveQuestion from './components/LoveQuestion';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const startDate = new Date('2026-08-25T23:00:00');
  const orbsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Anime.js complex orb animations
    anime({
      targets: '.orb-1',
      translateX: () => anime.random(-200, 200),
      translateY: () => anime.random(-200, 200),
      scale: () => anime.random(1, 1.5),
      duration: 10000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    anime({
      targets: '.orb-2',
      translateX: () => anime.random(-300, 300),
      translateY: () => anime.random(-300, 300),
      scale: () => anime.random(0.8, 1.2),
      duration: 12000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });
    
    anime({
      targets: '.orb-3',
      translateX: () => anime.random(-150, 150),
      translateY: () => anime.random(-150, 150),
      scale: () => anime.random(1, 2),
      duration: 15000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 20 }
    }
  };

  return (
    <div className="app-container">
      {/* Animated Orbs Background */}
      <div className="orbs-container" ref={orbsRef}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        style={{ y: yHero, opacity: opacityHero }}
      >
        <motion.div 
          className="title-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            Mudit <span className="ampersand">&</span> Mansi
          </motion.h1>
          <motion.p className="hero-subtitle" variants={itemVariants}>
            ILYYYY MANSIIII
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span>Scroll to explore</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.section>

      <main className="content-section">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <Timer startDate={startDate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <LoveQuestion />
        </motion.div>

        <motion.div
          className="quote-container glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Quote className="quote-icon" size={48} />
          <p className="quote-text">
            "I look at you and see the rest of my life in front of my eyes."
          </p>
          <p className="quote-author">Together forever</p>
        </motion.div>

        <Gallery />
      </main>

      <footer>
        <p>Made with ❤️ using Framer Motion & Anime.js</p>
      </footer>
    </div>
  );
}

export default App;
