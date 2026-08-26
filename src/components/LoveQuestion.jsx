import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import './LoveQuestion.css';

const noPhrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;("
];

const LoveQuestion = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const yesButtonScale = 1 + (noCount * 0.4);

  return (
    <div className="love-question-container glass-panel">
      <AnimatePresence mode="wait">
        {yesPressed ? (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="celebration"
          >
            <h2 className="love-title">I knew it! I love you too! ❤️</h2>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="big-heart"
            >
              <Heart fill="var(--primary)" color="var(--primary)" size={100} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="question-wrapper"
          >
            <h2 className="love-title">Do you love me?</h2>
            <div className="buttons-container">
              <motion.button 
                className="btn-yes"
                animate={{ scale: yesButtonScale }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleYesClick}
                whileHover={{ scale: yesButtonScale * 1.05 }}
                whileTap={{ scale: yesButtonScale * 0.95 }}
              >
                <Heart size={20} fill="white" className="btn-icon" />
                Yes!
              </motion.button>
              
              <motion.button 
                className="btn-no"
                onClick={handleNoClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {noPhrases[Math.min(noCount, noPhrases.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoveQuestion;
