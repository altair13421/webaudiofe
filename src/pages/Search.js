import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MusicList from '../components/MusicList';
import ArtistInfo from '../components/ArtistInfo';
import { musicApi } from '../services/api';
import RetroBackButton from '../components/RetroBackButton';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [songs, setSongs] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';

  useEffect(() => {
    const searchSongs = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const results = await musicApi.searchSongs(query);
        setSongs(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchSongs();
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery });
  };

  const handleSelectSong = async (song) => {
    try {
      const artistInfo = await musicApi.getArtistInfo(song.artistId);
      setSelectedArtist(artistInfo);
      navigate(`/artist/${song.artistId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <RetroBackButton />
      <SearchBar onSearch={handleSearch} initialValue={query} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>Searching...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <MusicList songs={songs} onSelectSong={handleSelectSong} />
          <ArtistInfo artist={selectedArtist} />
        </div>
      )}
    </div>
  );
};

export default Search;