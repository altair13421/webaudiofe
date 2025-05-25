import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = styled.button`
  background: transparent;
  border: 1px solid var(--terminal-green);
  color: var(--terminal-green);
  padding: 8px 16px;
  font-family: var(--terminal-font);
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:before {
    content: '<<';
    margin-right: 8px;
    opacity: 0.8;
  }

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 10px var(--terminal-green);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const RetroBackButton = () => {
  const navigate = useNavigate();

  return (
    <BackButton onClick={() => navigate(-1)}>
      Back
    </BackButton>
  );
};

export default RetroBackButton;