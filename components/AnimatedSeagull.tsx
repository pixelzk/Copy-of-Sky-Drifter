import React from 'react';

export const AnimatedSeagull: React.FC = () => {
  return (
    <div className="w-64 h-64 md:w-96 md:h-96 relative animate-float">
      <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible drop-shadow-xl">
        <defs>
          <filter id="feather-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Far Wing (Left/Background) */}
        <g className="animate-flap-far">
          <path
            d="M 130,100 C 100,80 60,50 20,80 C 50,110 100,110 130,100"
            fill="#F8FAFC" // Slate-50 (White-ish)
            stroke="#CBD5E1" // Slate-300
            strokeWidth="2"
          />
          {/* Wing Detail */}
          <path d="M 110,95 C 90,85 60,70 40,85" fill="none" stroke="#E2E8F0" strokeWidth="2" />
        </g>

        {/* Feet (Tucked) */}
        <path
          d="M 140,145 C 140,155 135,160 145,160 M 150,145 C 150,155 145,160 155,160"
          stroke="#EF4444" // Red-500
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body */}
        <ellipse cx="150" cy="120" rx="50" ry="30" fill="#FFFFFF" filter="url(#feather-shadow)" />
        
        {/* Tail */}
        <path
          d="M 110,120 L 80,110 L 80,130 Z"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1"
        />

        {/* Head */}
        <circle cx="190" cy="105" r="20" fill="#FFFFFF" filter="url(#feather-shadow)" />

        {/* Eye */}
        <circle cx="195" cy="100" r="2.5" fill="#000000" />
        <circle cx="196" cy="99" r="0.8" fill="#FFFFFF" />

        {/* Beak */}
        <path
          d="M 208,100 Q 230,105 230,115 Q 210,115 205,112"
          fill="#EF4444" // Red-500
        />
        {/* Beak Detail (Line) */}
        <path d="M 208,108 L 220,110" stroke="#991B1B" strokeWidth="0.5" />

        {/* Near Wing (Right/Foreground) */}
        <g className="animate-flap-near">
          <path
            d="M 150,110 C 160,60 230,20 270,70 C 220,120 180,120 150,110"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="2"
            filter="url(#feather-shadow)"
          />
           {/* Wing Detail */}
           <path d="M 170,100 C 190,70 230,50 250,70" fill="none" stroke="#E2E8F0" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};
