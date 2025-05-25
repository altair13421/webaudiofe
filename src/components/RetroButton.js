import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--terminal-black);
  color: var(--terminal-green);
  border: 1px solid var(--terminal-green);
  padding: 8px 16px;
  font-family: var(--terminal-font);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '>';
    margin-right: 8px;
    display: inline-block;
  }

  &:hover {
    background-color: var(--terminal-green);
    color: var(--terminal-black);
    box-shadow: var(--terminal-glow);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  /* Glitch effect on hover */
  &:hover:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 0, 0.1);
    animation: glitch 0.3s infinite;
  }

  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
`;

const RetroButton = ({ children, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default RetroButton;