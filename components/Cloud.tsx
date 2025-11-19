import React from 'react';
import { CloudSize } from '../types';

interface CloudProps {
  size: CloudSize;
  top: string;
  delay: string;
  opacity: number;
}

export const Cloud: React.FC<CloudProps> = ({ size, top, delay, opacity }) => {
  let scale = 1;
  let animationClass = 'cloud-slow';
  
  switch (size) {
    case CloudSize.SMALL:
      scale = 0.5;
      animationClass = 'cloud-slow';
      break;
    case CloudSize.MEDIUM:
      scale = 0.8;
      animationClass = 'cloud-medium';
      break;
    case CloudSize.LARGE:
      scale = 1.2;
      animationClass = 'cloud-fast';
      break;
  }

  return (
    <div 
      className={`absolute left-0 ${animationClass} pointer-events-none`}
      style={{ 
        top, 
        animationDelay: delay,
        opacity,
        transform: `scale(${scale})`,
        zIndex: size === CloudSize.LARGE ? 10 : 0 
      }}
    >
      <svg width="200" height="100" viewBox="0 0 200 100" fill="white">
        <path d="M25,60 a20,20 0 0,1 0,-40 a25,25 0 0,1 50,0 a20,20 0 0,1 40,0 a25,25 0 0,1 50,0 a20,20 0 0,1 0,40 z" />
      </svg>
    </div>
  );
};
