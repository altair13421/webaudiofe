import React from 'react';
import styled from 'styled-components';

const ArtistContainer = styled.div`
  border: 2px solid var(--terminal-green);
  padding: 20px;
  margin: 20px 0;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 10px var(--terminal-green);
  position: relative;
  overflow: hidden;

  &:before {
    content: '>';
    position: absolute;
    top: 10px;
    left: 10px;
    color: var(--terminal-green);
    font-family: var(--terminal-font);
  }
`;

const ArtistName = styled.h2`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin-left: 25px;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;

  @keyframes glitch {
    0% { transform: none; opacity: 1; }
    7% { transform: skew(-0.5deg, -0.9deg); opacity: 0.75; }
    10% { transform: none; opacity: 1; }
    27% { transform: none; opacity: 1; }
    30% { transform: skew(0.8deg, -0.1deg); opacity: 0.75; }
    35% { transform: none; opacity: 1; }
    52% { transform: none; opacity: 1; }
    55% { transform: skew(-1deg, 0.2deg); opacity: 0.75; }
    50% { transform: none; opacity: 1; }
    100% { transform: none; opacity: 1; }
  }

  &:hover {
    animation: glitch 1s infinite;
  }
`;

const InfoSection = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-left: 1px solid var(--terminal-green);
  color: rgba(0, 255, 0, 0.8);
`;

const Label = styled.span`
  color: var(--terminal-green);
  font-weight: bold;
  margin-right: 10px;
  &:before {
    content: '$';
    margin-right: 5px;
    opacity: 0.7;
  }
`;

const ASCIIFrame = styled.pre`
  color: var(--terminal-green);
  font-size: 0.8rem;
  opacity: 0.6;
  margin-top: 20px;
  text-align: center;
`;

const ArtistInfo = ({ artist }) => {
  if (!artist) {
    return (
      <ArtistContainer>
        <ASCIIFrame>
          {`
          .------------------.
          |   No Artist      |
          |   Selected      |
          |   [>_<]         |
          '------------------'
          `}
        </ASCIIFrame>
      </ArtistContainer>
    );
  }

  return (
    <ArtistContainer>
      <ArtistName>{artist.name}</ArtistName>
      <InfoSection>
        <p><Label>Genre</Label>{artist.genre}</p>
        <p><Label>Albums</Label>{artist.albums?.length || 0}</p>
        <p><Label>Bio</Label>{artist.bio}</p>
      </InfoSection>
      <ASCIIFrame>
        {`
        .-----------------------.
        |     Artist Profile    |
        |         ♪ ♫          |
        '-----------------------'
        `}
      </ASCIIFrame>
    </ArtistContainer>
  );
};

export default ArtistInfo;