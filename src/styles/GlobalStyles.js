import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --terminal-green: #00ff00;
    --terminal-black: #000000;
    --terminal-dark: #0a0a0a;
    --terminal-font: 'Courier New', Courier, monospace;
    --terminal-glow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--terminal-black);
    color: var(--terminal-green);
    font-family: var(--terminal-font);
    line-height: 1.6;
    min-height: 100vh;
    padding: 20px;
  }

  /* Terminal-like text effect */
  .terminal-text {
    text-shadow: var(--terminal-glow);
    animation: cursor-blink 1s infinite;
  }

  /* Blinking cursor animation */
  @keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--terminal-dark);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--terminal-green);
    border-radius: 4px;
  }
`;

export default GlobalStyles;