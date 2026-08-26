import React, { useEffect } from 'react';
import Timer from './components/Timer';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  // Started dating August 25, 2026, at 11 PM
  const startDate = new Date('2026-08-25T23:00:00');

  // Create random hearts for background
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 20; i++) {
      const style = {
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${10 + Math.random() * 10}s`,
      };
      hearts.push(<div key={i} className="heart" style={style}></div>);
    }
    return hearts;
  };

  return (
    <div className="app">
      <div className="background-hearts">
        {renderHearts()}
      </div>
      
      <header className="hero">
        <h1 className="title">Mudit <span className="ampersand">&</span> Mansi</h1>
        <p className="subtitle">Every moment since August 25th, 2026</p>
      </header>

      <main>
        <section className="timer-section">
          <Timer startDate={startDate} />
        </section>

        <section className="quote-section">
          <div className="quote-card">
            <p className="quote">"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."</p>
            <p className="author">- Maya Angelou</p>
          </div>
        </section>

        <Gallery />
      </main>

      <footer className="footer">
        <p>Made with ❤️ for Mudit and Mansi</p>
      </footer>
    </div>
  );
}

export default App;
