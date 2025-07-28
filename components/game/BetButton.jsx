import React from 'react';

export default function BetButton({ betCount = 6, maxBets = 10 }) {
  return (
    <div style={{ width: '375px', height: '192px', position: 'relative', margin: '0 auto' }}>
      <svg width="375" height="192" viewBox="0 0 375 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_ddd_2236_47749)">
          <g clipPath="url(#clip0_2236_47749)">
            <rect x="39.5" y="64" width="292" height="64" rx="20" fill="#FF8A00"/>
            <rect x="39.5" y="64" width="292" height="64" rx="20" fill="url(#paint0_linear_2236_47749)" fillOpacity="0.1"/>
            <g filter="url(#filter1_f_2236_47749)">
              <ellipse cx="185.5" cy="63.5" rx="146" ry="22.5" fill="white" fillOpacity="0.5"/>
            </g>
            <rect x="37.7495" y="66.7412" width="49.1312" height="127.564" transform="rotate(-45 37.7495 66.7412)" fill="url(#paint1_linear_2236_47749)" fillOpacity="0.4"/>
            <rect x="117.5" y="46.4321" width="19.738" height="127.564" transform="rotate(-45 117.5 46.4321)" fill="url(#paint2_linear_2236_47749)" fillOpacity="0.4"/>
            <path d="M95.104 88.604C96.84 86.868 97.708 86 98.786 86C99.865 86 100.733 86.868 102.468 88.604L106.888 93.023C108.623 94.758 109.491 95.626 109.491 96.705C109.491 97.783 108.623 98.651 106.887 100.387C105.151 102.123 104.283 102.991 103.205 102.991C102.126 102.991 101.258 102.123 99.523 100.387L95.103 95.968C93.369 94.233 92.5 93.365 92.5 92.286C92.5 91.208 93.368 90.34 95.104 88.604Z" fill="white"/>
            <path opacity="0.5" d="M95.8448 96.71L90.3248 102.228C89.9828 102.571 89.8118 102.742 89.7088 102.92C89.5717 103.157 89.4995 103.427 89.4995 103.701C89.4995 103.975 89.5717 104.245 89.7088 104.482C89.8118 104.66 89.9828 104.832 90.3258 105.174C90.6678 105.516 90.8388 105.688 91.0178 105.791C91.2552 105.928 91.5246 106 91.7988 106C92.073 106 92.3423 105.928 92.5798 105.791C92.7578 105.688 92.9298 105.516 93.2718 105.174L98.7898 99.655L95.8448 96.71ZM106.155 92.29L106.528 91.918C106.87 91.575 107.042 91.404 107.145 91.226C107.282 90.9886 107.354 90.7192 107.354 90.445C107.354 90.1708 107.282 89.9015 107.145 89.664C107.042 89.485 106.87 89.314 106.528 88.972C106.186 88.629 106.014 88.458 105.836 88.355C105.598 88.2179 105.329 88.1458 105.055 88.1458C104.781 88.1458 104.511 88.2179 104.274 88.355C104.096 88.458 103.924 88.629 103.582 88.972L103.209 89.345L106.155 92.291V92.29Z" fill="white"/>
            <g filter="url(#filter2_d_2236_47749)">
              <path d="M134.492 95.264C135.516 95.472 136.332 95.96 136.94 96.728C137.564 97.48 137.876 98.368 137.876 99.392C137.876 100.816 137.396 101.944 136.436 102.776C135.492 103.592 134.116 104 132.308 104H125.036V87.056H132.164C133.876 87.056 135.188 87.432 136.1 88.184C137.028 88.936 137.492 89.992 137.492 91.352C137.492 92.408 137.212 93.272 136.652 93.944C136.108 94.616 135.388 95.056 134.492 95.264ZM128.42 94.16H131.468C132.316 94.16 132.956 93.976 133.388 93.608C133.836 93.224 134.06 92.68 134.06 91.976C134.06 91.272 133.844 90.728 133.412 90.344C132.98 89.96 132.316 89.768 131.42 89.768H128.42V94.16ZM131.636 101.24C132.532 101.24 133.22 101.048 133.7 100.664C134.18 100.264 134.42 99.688 134.42 98.936C134.42 98.184 134.172 97.608 133.676 97.208C133.196 96.792 132.508 96.584 131.612 96.584H128.42V101.24H131.636ZM143.631 89.744V94.136H149.631V96.728H143.631V101.288H150.351V104H140.247V87.056H150.351V89.744H143.631ZM164.376 87.056V89.744H159.696V104H156.312V89.744H151.656V87.056H164.376ZM185.818 104H182.434L174.85 92.48V104H171.466V87.056H174.85L182.434 98.672V87.056H185.818V104ZM196.824 86.816C198.408 86.816 199.84 87.184 201.12 87.92C202.416 88.656 203.432 89.688 204.168 91.016C204.92 92.328 205.296 93.816 205.296 95.48C205.296 97.144 204.92 98.64 204.168 99.968C203.432 101.296 202.416 102.328 201.12 103.064C199.84 103.8 198.408 104.168 196.824 104.168C195.24 104.168 193.8 103.8 192.504 103.064C191.224 102.328 190.208 101.296 189.456 99.968C188.72 98.64 188.352 97.144 188.352 95.48C188.352 93.816 188.72 92.328 189.456 91.016C190.208 89.688 191.224 88.656 192.504 87.92C193.8 87.184 195.24 86.816 196.824 86.816ZM196.824 89.936C195.832 89.936 194.96 90.16 194.208 90.608C193.456 91.056 192.864 91.704 192.432 92.552C192.016 93.384 191.808 94.36 191.808 95.48C191.808 96.6 192.016 97.584 192.432 98.432C192.864 99.264 193.456 99.904 194.208 100.352C194.96 100.8 195.832 101.024 196.824 101.024C197.816 101.024 198.688 100.8 199.44 100.352C200.192 99.904 200.776 99.264 201.192 98.432C201.624 97.584 201.84 96.6 201.84 95.48C201.84 94.36 201.624 93.384 201.192 92.552C200.776 91.704 200.192 91.056 199.44 90.608C198.688 90.16 197.816 89.936 196.824 89.936ZM230.065 87.056L225.913 104H221.737L218.569 91.712L215.377 104H211.225L207.073 87.056H210.745L213.337 100.184L216.697 87.056H220.417L223.801 100.184L226.393 87.056H230.065ZM246.174 91.664C245.918 90 245.07 89.168 243.63 89.168C242.51 89.168 241.694 89.664 241.182 90.656C240.67 91.632 240.446 93.168 240.51 95.264C240.766 94.496 241.262 93.888 241.998 93.44C242.75 92.976 243.622 92.744 244.614 92.744C246.246 92.744 247.526 93.24 248.454 94.232C249.398 95.208 249.87 96.6 249.87 98.408C249.87 99.528 249.646 100.52 249.198 101.384C248.75 102.248 248.078 102.928 247.182 103.424C246.302 103.92 245.23 104.168 243.966 104.168C241.502 104.168 239.806 103.408 238.878 101.888C237.95 100.352 237.486 98.24 237.486 95.552C237.486 92.464 237.982 90.176 238.974 88.688C239.982 87.2 241.606 86.456 243.846 86.456C245.558 86.456 246.87 86.944 247.782 87.92C248.694 88.896 249.214 90.144 249.342 91.664H246.174ZM240.798 98.168C240.798 99.064 241.054 99.808 241.566 100.4C242.094 100.976 242.862 101.264 243.87 101.264C244.734 101.264 245.422 101.008 245.934 100.496C246.446 99.984 246.702 99.272 246.702 98.36C246.702 97.4 246.438 96.664 245.91 96.152C245.398 95.64 244.702 95.384 243.822 95.384C242.99 95.384 242.278 95.624 241.686 96.104C241.094 96.584 240.798 97.272 240.798 98.168Z" fill="white"/>
              <path d="M260.598 81.272L254.094 108.344H250.83L257.334 81.272H260.598ZM260.546 90.224V87.056H266.642V104H263.09V90.224H260.546ZM275.788 104C271.468 104 269.308 101.128 269.308 95.384C269.308 89.656 271.468 86.792 275.788 86.792C278.076 86.792 279.724 87.56 280.732 89.096C281.74 90.632 282.244 92.728 282.244 95.384C282.244 98.056 281.74 100.16 280.732 101.696C279.724 103.232 278.076 104 275.788 104ZM278.26 99.416C278.692 98.472 278.908 97.128 278.908 95.384C278.908 93.656 278.692 92.328 278.26 91.4C277.844 90.456 277.02 89.984 275.788 89.984C274.54 89.984 273.7 90.456 273.268 91.4C272.852 92.328 272.644 93.656 272.644 95.384C272.644 97.128 272.852 98.472 273.268 99.416C273.7 100.344 274.54 100.808 275.788 100.808C277.02 100.808 277.844 100.344 278.26 99.416Z" fill="#E9D2B6"/>
            </g>
          </g>
          <rect x="40.5" y="65" width="290" height="62" rx="19" stroke="url(#paint3_linear_2236_47749)" strokeOpacity="0.5" strokeWidth="2"/>
        </g>
        <defs>
          <filter id="filter0_ddd_2236_47749" x="-24.5" y="0" width="420" height="192" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="8" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2236_47749"/>
            <feOffset dy="28"/>
            <feGaussianBlur stdDeviation="16"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.0235294 0 0 0 0 0.0470588 0 0 0 0 0.172549 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_47749"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="32"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.65 0 0 0 0 0 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow_2236_47749" result="effect2_dropShadow_2236_47749"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.550834 0 0 0 0 0.326378 0 0 0 0 0.0628872 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect2_dropShadow_2236_47749" result="effect3_dropShadow_2236_47749"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_2236_47749" result="shape"/>
          </filter>
          <filter id="filter1_f_2236_47749" x="-8.5" y="-7" width="388" height="141" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur_2236_47749"/>
          </filter>
          <filter id="filter2_d_2236_47749" x="121.036" y="79.272" width="165.208" height="35.072" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2236_47749"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2236_47749" result="shape"/>
          </filter>
          <linearGradient id="paint0_linear_2236_47749" x1="185.5" y1="64" x2="185.5" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_2236_47749" x1="62.3151" y1="66.7412" x2="62.3151" y2="194.306" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_2236_47749" x1="127.369" y1="46.4321" x2="127.369" y2="173.997" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint3_linear_2236_47749" x1="185.5" y1="64" x2="185.5" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <clipPath id="clip0_2236_47749">
            <rect x="39.5" y="64" width="292" height="64" rx="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
} 