import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ArtistInfo from '../components/ArtistInfo';
import MusicList from '../components/MusicList';
import { musicApi } from '../services/api';
import RetroBackButton from '../components/RetroBackButton';

const ArtistDetailsContainer = styled.div`
  padding: 1rem;
`;

const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const [artistData, artistSongs] = await Promise.all([
          musicApi.getArtistInfo(id),
          musicApi.searchSongs(`artist:${id}`)
        ]);
        setArtist(artistData);
        setSongs(artistSongs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [id]);

  if (loading) return <div>Loading artist details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <ArtistDetailsContainer>
      <RetroBackButton />
      <ArtistInfo artist={artist} />
      <MusicList 
        songs={songs}
        onSelectSong={async (song) => {
          try {
            await musicApi.addToPlaylist(song.id);
            // Show success message or notification
          } catch (err) {
            setError(err.message);
          }
        }}
        actionLabel="Add to Playlist"
      />
    </ArtistDetailsContainer>
  );
};

export default ArtistDetails;