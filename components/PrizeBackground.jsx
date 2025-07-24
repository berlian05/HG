export default function PrizeBackground({ children }) {
  return (
    <div style={{ position: 'relative', width: 319, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="319" height="32" viewBox="0 0 319 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
        <g filter="url(#filter0_i_2236_43808)">
          <rect width="319" height="32" rx="16" fill="#192054"/>
          <rect width="319" height="32" rx="16" fill="url(#paint0_linear_2236_43808)" fillOpacity="0.05"/>
        </g>
        <rect x="0.5" y="0.5" width="318" height="31" rx="15.5" stroke="url(#paint1_linear_2236_43808)"/>
        <defs>
          <filter id="filter0_i_2236_43808" x="0" y="0" width="319" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.0470588 0 0 0 0 0.172549 0 0 0 0.4 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2236_43808"/>
          </filter>
          <linearGradient id="paint0_linear_2236_43808" x1="159.5" y1="0" x2="159.5" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_2236_43808" x1="159.5" y1="0" x2="159.5" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#353D7E"/>
            <stop offset="1" stopColor="#353D7E" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
} 