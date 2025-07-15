import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }

  :root {
    /* 🌞 Light theme colors */
    --primary-color: #222260;                          /* headings */
    --primary-color2: rgba(34, 34, 96, 0.8);           /* body text */
    --primary-color3: rgba(34, 34, 96, 0.4);
    --color-green: #10b981;                            /* teal green */
    --color-grey: #9ca3af;                             /* neutral grey */
    --color-accent: #ec4899;                           /* pink accent */
    --color-delete: #ef4444;                           /* red delete */
    --color-bg: #f9fafb;                               /* soft white */
    --color-bg-alt: rgba(255, 255, 255, 0.5);
    --glass-bg: rgba(255, 255, 255, 0.6);              /* frosted glass */
    --border-color: rgba(0, 0, 0, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.08);
  }

  [data-theme='dark'] {
    /* 🌙 Dark theme colors */
    --primary-color: #e2e8f0;                          /* light slate headings */
    --primary-color2: rgba(226, 232, 240, 0.85);       /* body text */
    --primary-color3: rgba(226, 232, 240, 0.4);
    --color-green: #34d399;                            /* vibrant green */
    --color-grey: #64748b;                             /* muted slate grey */
    --color-accent: #f472b6;                           /* softer pink */
    --color-delete: #f87171;                           /* salmon red */
    --color-bg: #1e293b;                               /* dark slate background */
    --color-bg-alt: rgba(30, 41, 59, 0.6);
    --glass-bg: rgba(30, 41, 59, 0.7);
    --border-color: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.5);
  }

  body {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    background: var(--color-bg);
    color: var(--primary-color2);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    line-height: 1.6;
    transition: background 0.4s ease, color 0.4s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
    font-weight: 700;
    letter-spacing: 0.5px;
    transition: color 0.4s ease;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--color-accent);
  }

  button {
    cursor: pointer;
    background: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-weight: 600;
    box-shadow: 0 4px 12px var(--shadow-color);
    transition: background 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    background: #e25582;
    transform: translateY(-2px);
  }

  .error {
    color: var(--color-delete);
    animation: shake 0.4s ease-in-out;
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(4px); }
    50% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
    100% { transform: translateX(0); }
  }

  /* ✨ Glass card utility */
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    box-shadow: 0 8px 24px var(--shadow-color);
    padding: 1.2rem;
    transition: background 0.3s ease, border 0.3s ease;
  }

  /* 🖱 Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color3);
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color2);
  }
`;
