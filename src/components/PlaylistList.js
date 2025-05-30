import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ListContainer = styled.div`
  margin: 20px 0;
`;

const PlaylistItem = styled.div`
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
    content: "►";
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

const SongCount = styled.p`
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

const PlaylistList = ({ playlists, onSelectPlaylist }) => {
  if (!playlists || playlists.length === 0) {
    return (
      <NoResults>
        <ASCIIDecoration>
          {`
          No playlists found...
          .----------------.
          |    Empty      |
          |    [>_<]     |
          '----------------'
          `}
        </ASCIIDecoration>
      </NoResults>
    );
  }

  return (
    <ListContainer>
      {/*<ASCIIDecoration>
        {`
        ╔═══ PLAYLISTS ═══╗
        ║   Collection   ║
        ╚═══════════════╝
        `}
      </ASCIIDecoration>*/}
      {playlists && playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          onClick={() => onSelectPlaylist(playlist)}
        >
          <Title>{playlist.name}</Title>
          <SongCount>{playlist.count || 0} songs</SongCount>
        </PlaylistItem>
      ))}
    </ListContainer>
  );
};

export default PlaylistList;
