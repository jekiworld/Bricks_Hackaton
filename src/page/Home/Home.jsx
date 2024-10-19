
import React, { useState, useEffect } from 'react';
import styles from "./Home.css";
import { useNavigate } from 'react-router-dom';


function LoadingScreen() {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/upload');
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty(
        '--move-x',
        `${(e.clientX - window.innerWidth / 2) * -0.001}deg`
      );
      document.documentElement.style.setProperty(
        '--move-y',
        `${(e.clientY - window.innerHeight / 2) * -0.002}deg`
      );
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className="logo" style={{ backgroundImage: 'url(img/logo.svg)' }}></div>
      <section className="layers">
        <div className="layers__container">
          <div
            className="layers__item layer-1"
            style={{ backgroundImage: 'url(/layer-1.png)' }}
          ></div>
          <div
            className="layers__item layer-2"
            style={{ backgroundImage: 'url(/layer-2.png)' }}
          ></div>
          <div className="layers__item layer-3">
            <div className="hero-content">
              <h1>
                BRIKCS <span></span>
              </h1>
              <div className="hero-content__p">Observe. Research. Learn.</div>
              <button className="button-start" onClick={handleButtonClick}>Get started</button>
            </div>
          </div>
          <div className="layers__item layer-4">
            <canvas className="rain"></canvas>
          </div>
          <div
            className="layers__item layer-5"
            style={{ backgroundImage: 'url(/layer-5.png)' }}
          ></div>
          <div
            className="layers__item layer-6"
            style={{ backgroundImage: 'url(/layer-6.png)' }}
          ></div>
        </div>
      </section>
    </div>
  );
}

export default LoadingScreen;
