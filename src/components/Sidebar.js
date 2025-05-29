import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PlaylistModal from "./PlaylistModal";
import { playlistApi } from "../services/api";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  background: var(--terminal-black);
  border-right: 1px solid var(--terminal-green);
  width: 250px;
  height: 100vh;
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;

  /* Terminal-like scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--terminal-black);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--terminal-green);
    border-radius: 4px;
  }
`;

const SidebarTitle = styled.h2`
  color: var(--terminal-green);
  font-size: 1.2rem;
  padding: 0 20px;
  margin-bottom: 20px;

  &:before {
    content: "# ";
    opacity: 0.7;
  }
`;

const PlaylistTab = styled(Link)`
  display: block;
  color: var(--terminal-green);
  padding: 10px 20px;
  text-decoration: none;
  font-family: var(--terminal-font);
  position: relative;
  transition: all 0.3s ease;

  /* Tab indicator */
  &:before {
    content: "|--";
    opacity: 0.7;
    margin-right: 8px;
  }

  /* Active state */
  &.active {
    background: var(--terminal-green);
    color: var(--terminal-black);

    &:before {
      content: "|> ";
      opacity: 1;
    }
  }

  /* Hover state */
  &:hover {
    background: rgba(0, 255, 0, 0.1);
    padding-left: 25px;

    &:not(.active):before {
      content: "|> ";
    }
  }

  /* Playlist number */
  &:after {
    content: attr(data-number);
    position: absolute;
    right: 20px;
    opacity: 0.5;
  }
`;

const Divider = styled.div`
  border-top: 1px dashed var(--terminal-green);
  margin: 10px 20px;
  opacity: 0.3;
`;

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const data = await playlistApi.getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Error loading playlists:", error);
    }
  };

  const handlePlaylistClick = async (playlist) => {
    try {
      const playlistData = await playlistApi.getPlaylistById(playlist.id);
      setSelectedPlaylist(playlistData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading playlist details:", error);
    }
  };

  return (
    <>
      <SidebarContainer>
        <SidebarTitle>Recent Playlists</SidebarTitle>
        {playlists.map((playlist, index) => (
          <React.Fragment key={playlist.id}>
            <PlaylistTab
              onClick={() => handlePlaylistClick(playlist)}
              data-number={`[${index + 1}]`}
              className={
                location.pathname === `/playlist/${playlist.id}` ? "active" : ""
              }
            >
              {playlist.name}
            </PlaylistTab>
            {index < playlists.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </SidebarContainer>

      {isModalOpen && (
        <PlaylistModal
          playlist={selectedPlaylist}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
