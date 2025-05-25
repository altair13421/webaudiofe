import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MusicList from '../components/MusicList';
import { musicApi } from '../services/api';
import RetroBackButton from '../components/RetroBackButton';

const PlaylistContainer = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin-bottom: 1rem;
`;

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await musicApi.getPlaylist();
        setPlaylist(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  if (loading) return <div>Loading playlist...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <PlaylistContainer>
      <RetroBackButton />
      <Title> > My Playlist_</Title>
      <MusicList 
        songs={playlist}
        onSelectSong={(song) => musicApi.removeFromPlaylist(song.id)}
        actionLabel="Remove"
      />
    </PlaylistContainer>
  );
};

export default Playlist;