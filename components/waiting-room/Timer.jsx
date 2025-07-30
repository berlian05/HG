import React, { useState, useEffect } from 'react';

export default function Timer({ initialTime = 30 }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Вычисляем градиент цвета в зависимости от оставшегося времени
  const getColor = () => {
    if (time <= 5) return '#FF6161';
    if (time <= 15) return '#FFB800';
    return '#4CAF50';
  };

  // Вычисляем прогресс для анимации (от 1 до 0)
  const progress = time / initialTime;
  const color = getColor();

  return (
    <div style={{ position: 'relative', width: '340px', height: '340px', margin: '0 auto' }}>
      <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.74" result="blur"/>
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.0470588 0 0 0 0 0.172549 0 0 0 0.5 0"/>
          </filter>
          <linearGradient id="circleGrad" x1="170" y1="0" x2="170" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor="#353D7E"/>
            <stop offset="1" stopColor="#353D7E" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Фоновый круг */}
        <circle
          cx="170"
          cy="170"
          r="165"
          fill="#192054"
          fillOpacity="0.5"
          filter="url(#glow)"
        />

        {/* Прогресс */}
        <circle
          cx="170"
          cy="170"
          r="165"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${2 * Math.PI * 165 * progress} ${2 * Math.PI * 165}`}
          transform="rotate(-90 170 170)"
          style={{
            transition: 'stroke 0.3s ease'
          }}
        />

        {/* Градиентная рамка */}
        <circle
          cx="170"
          cy="170"
          r="165"
          stroke="url(#circleGrad)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Время */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: color,
        fontSize: '72px',
        fontFamily: 'Ranchers, cursive',
        textAlign: 'center',
        transition: 'color 0.3s ease'
      }}>
        {time}
      </div>
    </div>
  );
} 