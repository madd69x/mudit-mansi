import React from 'react';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import './Gallery.css';

const Gallery = () => {
  const photos = [
    photo1,
    photo2
  ];

  return (
    <div className="gallery-section">
      <h2>Our Memories</h2>
      <p className="gallery-instruction">
        Beautiful moments captured together.
      </p>
      <div className="gallery-grid">
        {photos.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Memory ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
