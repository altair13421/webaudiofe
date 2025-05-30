import React from "react";
import styled from "styled-components";
import RetroButton from "./RetroButton";
import { useNavigate } from "react-router-dom";

const ListContainer = styled.div`
  margin: 20px 0;
`;

const MusicItem = styled.div`
  border: 1px solid var(--terminal-green);
  margin: 10px 0;
  padding: 15px;
  background-color: rgba(0, 255, 0, 0.05);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 255, 0, 0.1);
    transform: translateX(5px);
  }

  &:before {
    content: "♪";
    position: absolute;
    left: -20px;
    color: var(--terminal-green);
  }
`;

const Title = styled.h3`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin-bottom: 8px;
`;

const Artist = styled.p`
  color: rgba(0, 255, 0, 0.8);
  font-size: 0.9rem;
`;

const ASCIIDecoration = styled.pre`
  color: var(--terminal-green);
  font-size: 0.8rem;
  opacity: 0.5;
  margin: 10px 0;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--terminal-green);
  font-style: italic;
`;

const MusicList = ({ songs, loading, error, onSelectSong, actionLabel }) => {
  const navigate = useNavigate();
  console.log("MusicList songs:", songs);
  if (loading)
    return (
      <div style={{ color: "var(--terminal-green)" }}>LOADING TRACKS...</div>
    );
  if (error)
    return <div style={{ color: "var(--terminal-error)" }}>{error}</div>;
  if (!songs || songs.length === 0) {
    return (
      <NoResults>
        <ASCIIDecoration>
          {`
          No results found...
          .-----------------.
          |     404        |
          |    [>_<]      |
          '-----------------'
          `}
        </ASCIIDecoration>
      </NoResults>
    );
  }

  return (
    <ListContainer>
      <ASCIIDecoration>
        {`
        ╔════ MUSIC LIST ════╗
        ║    Now Playing    ║
        ╚══════════════════╝
        `}
      </ASCIIDecoration>
      {songs.map((song) => (
        <MusicItem key={song.id} onClick={() => onSelectSong(song)}>
          <Title>{song.title}</Title>
          {song.artists.map((artist, index) => (
            <Artist
              key={artist.id}
              onClick={() => {
                navigate(`/artist/${artist.id}`);
              }}
            >
              {artist.name} {artist.id}
            </Artist>
          ))}
          <RetroButton
            onClick={(e) => {
              e.stopPropagation();
              // Add play functionality here
            }}
          >
            ► Play
          </RetroButton>
        </MusicItem>
      ))}
    </ListContainer>
  );
};

export default MusicList;
