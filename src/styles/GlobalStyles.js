import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Modern terminal colors */
    --terminal-bg: #2E3436;
    --terminal-text: #D3D7CF;
    --terminal-primary: #729FCF;
    --terminal-secondary: #AD7FA8;
    --terminal-success: #8AE234;
    --terminal-warning: #FCE94F;
    --terminal-error: #EF2929;
    --terminal-comment: #888A85;
    --terminal-selection: rgba(114, 159, 207, 0.3);
    --terminal-cursor: #D3D7CF;
    --terminal-border: #555753;

    /* Terminal font */
    --terminal-font: 'Consolas', 'Monaco', 'Courier New', monospace;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--terminal-bg);
    color: var(--terminal-text);
    font-family: var(--terminal-font);
    line-height: 1.6;
  }

  /* Terminal-style scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--terminal-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--terminal-border);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--terminal-comment);
  }

  /* Selection style */
  ::selection {
    background: var(--terminal-selection);
    color: var(--terminal-text);
  }

  /* Terminal cursor animation */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

export default GlobalStyles;
