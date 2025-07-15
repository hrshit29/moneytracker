import React from 'react';
import { useWindowSize } from '../help/windowsize';
import { useTheme } from '../context/ThemeContext';

function Orb() {
  const { width, height } = useWindowSize();
  const { theme } = useTheme();

  // fallback values if width/height are undefined
  const moveX = width > 0 ? width / 3 : 200;
  const moveY = height > 0 ? height / 4 : 150;

  // choose gradient based on theme
  const gradient =
    theme === 'dark'
      ? 'linear-gradient(180deg, rgba(245,102,146,0.4) 0%, rgba(242,153,74,0.4) 100%)'
      : 'linear-gradient(180deg, rgba(245,102,146,0.6) 0%, rgba(242,153,74,0.6) 100%)';

  const style: React.CSSProperties = {
    width: '70vh',
    height: '70vh',
    borderRadius: '50%',
    marginLeft: '-35vh',
    marginTop: '-35vh',
    background: gradient,
    filter: 'blur(230px)',
    animation: `moveOrb 16s ease-in-out infinite alternate`,
    position: 'absolute',
    zIndex: 0,
    pointerEvents: 'none',
  };

  return (
    <>
      <style>
        {`
          @keyframes moveOrb {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            25% {
              transform: translate(${moveX}px, ${-moveY}px) scale(1.05);
            }
            50% {
              transform: translate(${moveX / 2}px, ${moveY}px) scale(1.1);
            }
            75% {
              transform: translate(-${moveX / 2}px, ${moveY / 2}px) scale(1.05);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
        `}
      </style>
      <div style={style} />
    </>
  );
}

export default Orb;
