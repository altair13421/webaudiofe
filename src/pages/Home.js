import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RetroButton from "../components/RetroButton";
import { generateArtistPlaylist } from "../services/api";

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem;
  overflow-y: auto;
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
      <ASCIIArt>
        {`
    ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫
    .-----------------------.
    |  [>] MUSIC TERMINAL  |
    |   Select Something   |
    |   to start playing   |
    '-----------------------'
    ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪
        `}
      </ASCIIArt>
      <ButtonContainer>
        <RetroButton onClick={() => navigate("/search")}>
          Search Music
        </RetroButton>
        <RetroButton onClick={() => navigate("/playlist")}>
          My Playlists
        </RetroButton>
      </ButtonContainer>
      <ButtonContainer>
        <RetroButton onClick={() => generateArtistPlaylist("", "random")}>
          Generate Playlist
        </RetroButton>
        <RetroButton onClick={() => generateArtistPlaylist("", "top")}>
          Generate Top
        </RetroButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;
