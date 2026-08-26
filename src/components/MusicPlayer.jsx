import React, { useState, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import './MusicPlayer.css';
import song from '../assets/dandelions.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player glass-panel">
      <audio ref={audioRef} src={song} loop />
      
      <motion.div 
        className="vinyl-record"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="record-center">
          <Music size={24} color="white" />
        </div>
      </motion.div>

      <div className="song-info">
        <h4>Dandelions</h4>
        <p>Ruth B. Cover by Asia James</p>
      </div>

      <button className="play-btn" onClick={togglePlay}>
        {isPlaying ? <Pause size={24} fill="var(--primary)" color="var(--primary)"/> : <Play size={24} fill="var(--primary)" color="var(--primary)"/>}
      </button>
    </div>
  );
};

export default MusicPlayer;
