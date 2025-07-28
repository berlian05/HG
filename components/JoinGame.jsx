import React from 'react';
import { useRouter } from 'next/router';

export default function JoinGame() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/waiting-room');
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div onClick={handleClick} style={{ cursor: 'pointer', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-48px' }}>
        <svg width="334" height="140" viewBox="0 0 334 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="joinGameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB800" />
              <stop offset="100%" stopColor="#FF8A00" />
            </linearGradient>
          </defs>
          <g filter="url(#filter0_ddd_2236_43848)">
            <g clipPath="url(#clip0_2236_43848)">
              <rect x="48" y="48" width="238" height="40" rx="20" fill="#FF8A00"/>
              <rect x="48" y="48" width="238" height="40" rx="20" fill="url(#paint0_linear_2236_43848)" fillOpacity="0.1"/>
              <g filter="url(#filter1_d_2236_43848)">
                <path d="M73.6073 63.528V69.504C73.6073 70.32 73.3793 70.956 72.9233 71.412C72.4753 71.86 71.8513 72.084 71.0513 72.084C70.1873 72.084 69.5033 71.836 68.9993 71.34C68.4953 70.844 68.2433 70.136 68.2433 69.216H69.9113C69.9113 69.648 69.9993 69.98 70.1753 70.212C70.3593 70.444 70.6273 70.56 70.9793 70.56C71.2993 70.56 71.5353 70.468 71.6873 70.284C71.8393 70.092 71.9153 69.832 71.9153 69.504V63.528H73.6073ZM79.0603 63.408C79.8523 63.408 80.5683 63.592 81.2083 63.96C81.8563 64.328 82.3643 64.844 82.7323 65.508C83.1083 66.164 83.2963 66.908 83.2963 67.74C83.2963 68.572 83.1083 69.32 82.7323 69.984C82.3643 70.648 81.8563 71.164 81.2083 71.532C80.5683 71.9 79.8523 72.084 79.0603 72.084C78.2683 72.084 77.5483 71.9 76.9003 71.532C76.2603 71.164 75.7523 70.648 75.3763 69.984C75.0083 69.32 74.8243 68.572 74.8243 67.74C74.8243 66.908 75.0083 66.164 75.3763 65.508C75.7523 64.844 76.2603 64.328 76.9003 63.96C77.5483 63.592 78.2683 63.408 79.0603 63.408ZM79.0603 64.968C78.5643 64.968 78.1283 65.08 77.7523 65.304C77.3763 65.528 77.0803 65.852 76.8643 66.276C76.6563 66.692 76.5523 67.18 76.5523 67.74C76.5523 68.3 76.6563 68.792 76.8643 69.216C77.0803 69.632 77.3763 69.952 77.7523 70.176C78.1283 70.4 78.5643 70.512 79.0603 70.512C79.5563 70.512 79.9923 70.4 80.3683 70.176C80.7443 69.952 81.0363 69.632 81.2443 69.216C81.4603 68.792 81.5683 68.3 81.5683 67.74C81.5683 67.18 81.4603 66.692 81.2443 66.276C81.0363 65.852 80.7443 65.528 80.3683 65.304C79.9923 65.08 79.5563 64.968 79.0603 64.968ZM86.2608 63.528V72H84.5688V63.528H86.2608ZM94.9674 72H93.2754L89.4834 66.24V72H87.7914V63.528H89.4834L93.2754 69.336V63.528H94.9674V72ZM103.036 63.444C104.068 63.444 104.924 63.7 105.604 64.212C106.284 64.716 106.72 65.4 106.912 66.264H105.136C104.968 65.88 104.7 65.576 104.332 65.352C103.972 65.12 103.544 65.004 103.048 65.004C102.56 65.004 102.128 65.116 101.752 65.34C101.376 65.564 101.084 65.884 100.876 66.3C100.668 66.716 100.564 67.204 100.564 67.764C100.564 68.652 100.8 69.344 101.272 69.84C101.752 70.336 102.404 70.584 103.228 70.584C103.836 70.584 104.356 70.404 104.788 70.044C105.228 69.684 105.512 69.184 105.64 68.544H102.772V67.332H107.056V68.964C106.936 69.524 106.7 70.04 106.348 70.512C106.004 70.984 105.548 71.364 104.98 71.652C104.42 71.932 103.776 72.072 103.048 72.072C102.216 72.072 101.48 71.892 100.84 71.532C100.208 71.164 99.7158 70.656 99.3638 70.008C99.0198 69.352 98.8478 68.604 98.8478 67.764C98.8478 66.924 99.0198 66.18 99.3638 65.532C99.7158 64.876 100.208 64.364 100.84 63.996C101.472 63.628 102.204 63.444 103.036 63.444ZM113.483 70.296H110.087L109.487 72H107.699L110.819 63.624H112.751L115.859 72H114.071L113.483 70.296ZM113.027 69.012L111.779 65.436L110.531 69.012H113.027ZM125.904 63.624V72H124.224V66.156L122.076 72H120.612L118.464 66.18V72H116.772V63.624H118.824L121.368 69.924L123.864 63.624H125.904ZM129.128 64.872V67.068H132.128V68.364H129.128V70.644H132.488V72H127.436V63.528H132.488V64.872H129.128Z" fill="white" style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.05em' }}/>
              </g>
              <g filter="url(#filter2_d_2236_43848)">
                <rect x="190" y="52" width="69" height="32" rx="14" fill="white" shapeRendering="crispEdges"/>
                <g filter="url(#filter3_d_2236_43848)">
                  <path d="M208.964 64.848H204.944V66.984C205.128 66.768 205.38 66.596 205.7 66.468C206.028 66.332 206.388 66.264 206.78 66.264C207.364 66.264 207.848 66.392 208.232 66.648C208.624 66.896 208.912 67.232 209.096 67.656C209.288 68.072 209.384 68.536 209.384 69.048C209.384 69.952 209.128 70.676 208.616 71.22C208.112 71.764 207.388 72.036 206.444 72.036C205.828 72.036 205.292 71.928 204.836 71.712C204.38 71.488 204.024 71.18 203.768 70.788C203.512 70.388 203.372 69.924 203.348 69.396H204.992C205.056 69.756 205.204 70.044 205.436 70.26C205.668 70.468 205.976 70.572 206.36 70.572C206.824 70.572 207.168 70.432 207.392 70.152C207.624 69.864 207.74 69.484 207.74 69.012C207.74 68.564 207.62 68.216 207.38 67.968C207.14 67.72 206.8 67.596 206.36 67.596C206.04 67.596 205.768 67.668 205.544 67.812C205.32 67.948 205.156 68.132 205.052 68.364H203.408V63.36H208.964V64.848ZM213.738 72C211.578 72 210.498 70.564 210.498 67.692C210.498 64.828 211.578 63.396 213.738 63.396C214.882 63.396 215.706 63.78 216.21 64.548C216.714 65.316 216.966 66.364 216.966 67.692C216.966 69.028 216.714 70.08 216.21 70.848C215.706 71.616 214.882 72 213.738 72ZM214.974 69.708C215.19 69.236 215.298 68.564 215.298 67.692C215.298 66.828 215.19 66.164 214.974 65.7C214.766 65.228 214.354 64.992 213.738 64.992C213.114 64.992 212.694 65.228 212.478 65.7C212.27 66.164 212.166 66.828 212.166 67.692C212.166 68.564 212.27 69.236 212.478 69.708C212.694 70.172 213.114 70.404 213.738 70.404C214.354 70.404 214.766 70.172 214.974 69.708ZM232.009 63.528L229.933 72H227.845L226.261 65.856L224.665 72H222.589L220.513 63.528H222.349L223.645 70.092L225.325 63.528H227.185L228.877 70.092L230.173 63.528H232.009ZM234.858 70.704H237.702V72H233.166V63.528H234.858V70.704ZM241.721 72H238.709V63.528H241.721C242.641 63.528 243.433 63.704 244.097 64.056C244.769 64.4 245.281 64.892 245.633 65.532C245.985 66.164 246.161 66.904 246.161 67.752C246.161 68.592 245.985 69.332 245.633 69.972C245.281 70.612 244.769 71.112 244.097 71.472C243.433 71.824 242.641 72 241.721 72ZM241.577 70.488C242.489 70.488 243.193 70.248 243.689 69.768C244.193 69.288 244.445 68.616 244.445 67.752C244.445 66.88 244.193 66.204 243.689 65.724C243.193 65.244 242.489 65.004 241.577 65.004H240.401V70.488H241.577Z" fill="url(#joinGameGradient)" style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.05em' }}/>
                  <path d="M208.964 64.848H204.944V66.984C205.128 66.768 205.38 66.596 205.7 66.468C206.028 66.332 206.388 66.264 206.78 66.264C207.364 66.264 207.848 66.392 208.232 66.648C208.624 66.896 208.912 67.232 209.096 67.656C209.288 68.072 209.384 68.536 209.384 69.048C209.384 69.952 209.128 70.676 208.616 71.22C208.112 71.764 207.388 72.036 206.444 72.036C205.828 72.036 205.292 71.928 204.836 71.712C204.38 71.488 204.024 71.18 203.768 70.788C203.512 70.388 203.372 69.924 203.348 69.396H204.992C205.056 69.756 205.204 70.044 205.436 70.26C205.668 70.468 205.976 70.572 206.36 70.572C206.824 70.572 207.168 70.432 207.392 70.152C207.624 69.864 207.74 69.484 207.74 69.012C207.74 68.564 207.62 68.216 207.38 67.968C207.14 67.72 206.8 67.596 206.36 67.596C206.04 67.596 205.768 67.668 205.544 67.812C205.32 67.948 205.156 68.132 205.052 68.364H203.408V63.36H208.964V64.848ZM213.738 72C211.578 72 210.498 70.564 210.498 67.692C210.498 64.828 211.578 63.396 213.738 63.396C214.882 63.396 215.706 63.78 216.21 64.548C216.714 65.316 216.966 66.364 216.966 67.692C216.966 69.028 216.714 70.08 216.21 70.848C215.706 71.616 214.882 72 213.738 72ZM214.974 69.708C215.19 69.236 215.298 68.564 215.298 67.692C215.298 66.828 215.19 66.164 214.974 65.7C214.766 65.228 214.354 64.992 213.738 64.992C213.114 64.992 212.694 65.228 212.478 65.7C212.27 66.164 212.166 66.828 212.166 67.692C212.166 68.564 212.27 69.236 212.478 69.708C212.694 70.172 213.114 70.404 213.738 70.404C214.354 70.404 214.766 70.172 214.974 69.708ZM232.009 63.528L229.933 72H227.845L226.261 65.856L224.665 72H222.589L220.513 63.528H222.349L223.645 70.092L225.325 63.528H227.185L228.877 70.092L230.173 63.528H232.009ZM234.858 70.704H237.702V72H233.166V63.528H234.858V70.704ZM241.721 72H238.709V63.528H241.721C242.641 63.528 243.433 63.704 244.097 64.056C244.769 64.4 245.281 64.892 245.633 65.532C245.985 66.164 246.161 66.904 246.161 67.752C246.161 68.592 245.985 69.332 245.633 69.972C245.281 70.612 244.769 71.112 244.097 71.472C243.433 71.824 242.641 72 241.721 72ZM241.577 70.488C242.489 70.488 243.193 70.248 243.689 69.768C244.193 69.288 244.445 68.616 244.445 67.752C244.445 66.88 244.193 66.204 243.689 65.724C243.193 65.244 242.489 65.004 241.577 65.004H240.401V70.488H241.577Z" fill="url(#paint1_linear_2236_43848)" fillOpacity="0.2" style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.05em' }}/>
                </g>
              </g>
              <g filter="url(#filter4_f_2236_43848)">
                <ellipse cx="167" cy="46" rx="122" ry="14" fill="white" fillOpacity="0.5"/>
              </g>
            </g>
            <rect x="48.5" y="48.5" width="237" height="39" rx="19.5" stroke="url(#paint2_linear_2236_43848)" strokeOpacity="0.5"/>
          </g>
          <defs>
            <filter id="filter0_ddd_2236_43848" x="0" y="0" width="334" height="140" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="8" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2236_43848"/>
              <feOffset dy="28"/>
              <feGaussianBlur stdDeviation="16"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.0470588 0 0 0 0 0.172549 0 0 0 0.5 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_43848"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="24"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.790584 0 0 0 0 0.401667 0 0 0 0.35 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_2236_43848" result="effect2_dropShadow_2236_43848"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.550834 0 0 0 0 0.326378 0 0 0 0 0.0628872 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect2_dropShadow_2236_43848" result="effect3_dropShadow_2236_43848"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_2236_43848" result="shape"/>
            </filter>
            <filter id="filter1_d_2236_43848" x="64.2432" y="61.408" width="72.2446" height="16.676" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_43848"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2236_43848" result="shape"/>
            </filter>
            <filter id="filter2_d_2236_43848" x="186" y="50" width="77" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="2"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_43848"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2236_43848" result="shape"/>
            </filter>
            <filter id="filter3_d_2236_43848" x="179.348" y="63.36" width="90.814" height="60.676" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="8" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2236_43848"/>
              <feOffset dy="28"/>
              <feGaussianBlur stdDeviation="16"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.0470588 0 0 0 0 0.172549 0 0 0 0.5 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_43848"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2236_43848" result="shape"/>
            </filter>
            <filter id="filter4_f_2236_43848" x="17" y="4" width="300" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="14" result="effect1_foregroundBlur_2236_43848"/>
            </filter>
            <linearGradient id="paint0_linear_2236_43848" x1="167" y1="48" x2="167" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_2236_43848" x1="195.5" y1="60" x2="195.5" y2="76" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint2_linear_2236_43848" x1="167" y1="48" x2="167" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="clip0_2236_43848">
              <rect x="48" y="48" width="238" height="40" rx="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
} 