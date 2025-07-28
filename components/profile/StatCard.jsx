import React from 'react';

const CARD_COLORS = {
  'Players online': 'rgba(13, 16, 48, 0.6)',
  'Total game': 'rgba(44, 15, 27, 0.6)',
  'Made a bet': 'rgba(45, 31, 15, 0.6)',
  'Profit': 'rgba(13, 16, 48, 0.6)',
};

export default function StatCard({ value, label }) {
  const uniqueId = React.useId();
  const backgroundColor = CARD_COLORS[label] || 'rgba(13, 16, 48, 0.6)';
  
  return (
    <div style={{ width: '110px', height: '48px', position: 'relative' }}>
      <svg width="110" height="48" viewBox="0 0 110 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={`glow_${uniqueId}`} x="-24" y="-24" width="158" height="96" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow"/>
            <feOffset dy="12"/>
            <feGaussianBlur stdDeviation="8"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.0470588 0 0 0 0 0.172549 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
          <filter id={`blur_${uniqueId}`} x="-40" y="-10" width="190" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur"/>
          </filter>
          <linearGradient id={`cardGrad_${uniqueId}`} x1="55" y1="0" x2="55" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id={`borderGrad_${uniqueId}`} x1="55" y1="0" x2="55" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#353D7E"/>
            <stop offset="1" stopColor="#353D7E" stopOpacity="0.2"/>
          </linearGradient>
          <radialGradient id={`borderRadial_${uniqueId}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(55) rotate(90) scale(48 72)">
            <stop stopColor="#7E76FF"/>
            <stop offset="1" stopColor="#7E76FF" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <g filter={`url(#glow_${uniqueId})`}>
          <rect width="110" height="48" rx="24" fill={backgroundColor}/>
          <rect width="110" height="48" rx="24" fill={`url(#cardGrad_${uniqueId})`} fillOpacity="0.05"/>
          <g opacity="0.25" filter={`url(#blur_${uniqueId})`}>
            <ellipse cx="55" cy="24" rx="55" ry="10" fill="#7D75FF"/>
          </g>
          
          {/* Content */}
          <foreignObject width="110" height="48">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px'
            }}>
              <div style={{
                color: 'white',
                fontSize: '16px',
                fontFamily: 'Ranchers, cursive',
                textAlign: 'center',
                marginBottom: '2px',
                lineHeight: '1'
              }}>{value}</div>
              <div style={{
                color: '#9CA6ED',
                fontSize: '12px',
                opacity: 0.8,
                textAlign: 'center',
                fontFamily: 'Poppins, sans-serif'
              }}>{label}</div>
            </div>
          </foreignObject>
          
          {/* Double border */}
          <rect x="0.5" y="0.5" width="109" height="47" rx="23.5" stroke={`url(#borderGrad_${uniqueId})`}/>
          <rect x="0.5" y="0.5" width="109" height="47" rx="23.5" stroke={`url(#borderRadial_${uniqueId})`}/>
        </g>
      </svg>
    </div>
  );
} 