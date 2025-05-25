import React from 'react';
import styled from 'styled-components';

const TerminalContainer = styled.div`
  background-color: var(--terminal-black);
  border: 2px solid var(--terminal-green);
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  box-shadow: var(--terminal-glow);
  min-height: 400px;
  overflow-y: auto;
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--terminal-green);
`;

const TerminalTitle = styled.h1`
  color: var(--terminal-green);
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  &:before {
    content: '> ';
  }
`;

const TerminalContent = styled.div`
  padding: 10px;
`;

const Terminal = ({ children }) => {
  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalTitle>Music Terminal v1.0</TerminalTitle>
      </TerminalHeader>
      <TerminalContent>
        {children}
      </TerminalContent>
    </TerminalContainer>
  );
};

export default Terminal;