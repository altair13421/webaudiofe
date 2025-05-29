import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TerminalContainer = styled.div`
  background-color: var(--terminal-black);
  border: 2px solid var(--terminal-green);
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  box-shadow: var(--terminal-glow);
  min-height: 400px;
  overflow-y: auto;
  position: relative;

  /* Terminal window decorations */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25px;
    background: var(--terminal-green);
    opacity: 0.1;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  /* Terminal scanlines effect */
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 255, 0, 0.02) 1px,
      transparent 1px
    );
    background-size: 100% 2px;
    pointer-events: none;
    z-index: 1;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--terminal-green);
  position: relative;
  z-index: 2;

  &:before {
    content: "⬤ ⬤ ⬤";
    position: absolute;
    top: -18px;
    left: -10px;
    color: var(--terminal-green);
    opacity: 0.5;
    font-size: 12px;
    letter-spacing: 4px;
  }
`;

const TerminalTitle = styled.h1`
  color: var(--terminal-green);
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 5px var(--terminal-green);

  &:before {
    content: "> ";
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const TerminalContent = styled.div`
  padding: 10px;
  position: relative;
  z-index: 2;

  /* Line numbers */
  & > * {
    position: relative;
    padding-left: 20px;

    &:before {
      content: "$";
      position: absolute;
      left: 0;
      color: var(--terminal-green);
      opacity: 0.5;
    }
  }
`;

const Terminal = ({ children }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/");
  };
  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalTitle onClick={handleTitleClick}>
          Music Terminal v1.0
        </TerminalTitle>
      </TerminalHeader>
      <TerminalContent>{children}</TerminalContent>
    </TerminalContainer>
  );
};

export default Terminal;
