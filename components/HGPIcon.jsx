export default function HGPIcon() {
  return (
    <svg width="50" height="25" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hgpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB800" />
          <stop offset="100%" stopColor="#FF8A00" />
        </linearGradient>
      </defs>
      <text
        x="2"
        y="16"
        fontFamily="Ranchers, cursive"
        fontSize="16"
        fontWeight="bold"
        fill="url(#hgpGradient)"
        transform="rotate(-6, 25, 12.5)"
        style={{ letterSpacing: '1px' }}
      >
        HGP
      </text>
    </svg>
  );
} 