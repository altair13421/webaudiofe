import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RetroButton from '../components/RetroButton';

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--terminal-green);
`;

const Title = styled.h1`
  font-family: var(--terminal-font);
  margin-bottom: 2rem;
`;

const ASCIIArt = styled.pre`
  color: var(--terminal-green);
  margin: 2rem 0;
  font-size: 0.8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title>Retro Music Terminal</Title>
      <ASCIIArt>
        {`
    ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫
    .-----------------------.
    |  [>] MUSIC TERMINAL  |
    |     Version 1.0      |
    |   © 2024 RetroFM    |
    '-----------------------'
    ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪
        `}
      </ASCIIArt>
      <ButtonContainer>
        <RetroButton onClick={() => navigate('/search')}>Search Music</RetroButton>
        <RetroButton onClick={() => navigate('/playlist')}>My Playlist</RetroButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;