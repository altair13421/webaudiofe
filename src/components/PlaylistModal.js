import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--terminal-black);
  border: 1px solid var(--terminal-green);
  box-shadow: 0 0 20px var(--terminal-glow);
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;

  /* Terminal window style */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25px;
    background: var(--terminal-green);
    opacity: 0.1;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 10px;

  h2 {
    color: var(--terminal-green);
    font-size: 1.2rem;
    margin: 0;
    
    &:before {
      content: '> ';
      opacity: 0.7;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--terminal-green);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: var(--terminal-error);
  }
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SongItem = styled.li`
  color: var(--terminal-green);
  padding: 10px;
  border-bottom: 1px dashed var(--terminal-green);
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:before {
    content: '$ ';
    opacity: 0.5;
  }
  
  &:hover {
    opacity: 1;
    padding-left: 15px;
    background: rgba(0, 255, 0, 0.1);
  }

  .song-duration {
    float: right;
    opacity: 0.5;
  }
`;

const PlaylistModal = ({ playlist, onClose }) => {
    console.log(playlist);
  if (!playlist) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h2>{playlist.name}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <SongList>
          {playlist.tracks?.map((song, index) => (
            <SongItem key={song.id}>
              {song.title} - {song.artists.map((artist, index) => artist.name).join(', ')}
              <span className="song-duration">{song.duration}</span>
            </SongItem>
          ))}
        </SongList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PlaylistModal;
