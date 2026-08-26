import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import './LoveLetter.css';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="letter-section">
      <motion.div 
        className="envelope glass-panel"
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <Mail size={48} color="var(--primary)" />
        <p>A message for you...</p>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="letter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="letter-content"
              initial={{ y: "100vh", rotate: 10, scale: 0.8 }}
              animate={{ y: 0, rotate: 0, scale: 1 }}
              exit={{ y: "100vh", rotate: -10, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
              <div className="letter-text">
                <h3>My Dearest Mansi,</h3>
                <p>I really love you mansi for the way youre for what youre making me, thankyou for making me a good person and finally fall for someone itne din baad.</p>
                <p>I really adore the way you are, and I really wish to see us together all the years we will be living alive.</p>
                <p>Youre so cute, so good, so thanda thanda and what not, like bhyii frr what god did I pray to, tu bahot zyada achi h, mujhe schme bahot pasand h tu, thankyou for coming to my life to bless my soul wapas, im really glad of you.</p>
                <p className="signature">mwahhhhhh,<br/>Mudit</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoveLetter;
