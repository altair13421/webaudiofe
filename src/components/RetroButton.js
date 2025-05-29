import React from "react";
import styled from "styled-components";

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
  text-transform: uppercase;
  letter-spacing: 1px;

  /* Terminal-like outline */
  &:before {
    content: "[";
    margin-right: 8px;
    color: var(--terminal-green);
  }

  &:after {
    content: "]";
    margin-left: 8px;
    color: var(--terminal-green);
  }

  /* Hover effects */
  &:hover {
    background-color: var(--terminal-green);
    color: var(--terminal-black);
    box-shadow: var(--terminal-glow);
    transform: translateY(-2px);

    &:before,
    &:after {
      color: var(--terminal-black);
    }
  }

  &:active {
    transform: translateY(0);
  }

  /* Glitch effect on hover */
  &:hover:after {
    content: "]";
    position: relative;
    margin-left: 8px;
    color: inherit;
    text-shadow: 2px 2px var(--terminal-error);
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:before {
      content: "x";
    }
    &:after {
      content: "x";
    }
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
