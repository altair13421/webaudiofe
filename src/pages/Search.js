import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { playlistApi, musicApi } from "../services/api";
import RetroBackButton from "../components/RetroBackButton";
import SearchResults from "../components/SearchResults";
const SearchContainer = styled.div`
  padding: 1rem;
`;

const RecentSearches = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--terminal-green);
  border-radius: 4px;
  background: rgba(0, 255, 0, 0.05);
`;

const RecentSearchTitle = styled.h3`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin-bottom: 0.5rem;
  &:before {
    content: "> ";
  }
`;

const SearchItem = styled.div`
  color: var(--terminal-green);
  cursor: pointer;
  padding: 0.3rem 0;
  font-family: monospace;
  &:before {
    content: "$ ";
    opacity: 0.7;
  }
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [results, setResults] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    const searchSongs = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await musicApi.searchSongs(query);
        setSongs(response.tracks || []);
        setArtists(response.artists || []);
        setAlbums(response.albums || []);
        setPlaylists(response.playlists || []);
        setResults(response);

        // Add to recent searches
        if (query.trim()) {
          const updatedSearches = [
            query,
            ...recentSearches.filter((s) => s !== query),
          ].slice(0, 5);
          setRecentSearches(updatedSearches);
          localStorage.setItem(
            "recentSearches",
            JSON.stringify(updatedSearches)
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchSongs();
    }
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery });
  };

  const handleSelectSong = async (song) => {
    try {
      const artistInfo = await playlistApi.getArtistInfo(song.artistId);
      setSelectedArtist(artistInfo);
      navigate(`/artist/${song.artistId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SearchContainer>
      <RetroBackButton />
      <SearchBar onSearch={handleSearch} initialValue={query} />

      {!query && recentSearches.length > 0 && (
        <RecentSearches>
          <RecentSearchTitle>Recent Searches_</RecentSearchTitle>
          {recentSearches.map((search, index) => (
            <SearchItem key={index} onClick={() => handleSearch(search)}>
              {search}
            </SearchItem>
          ))}
        </RecentSearches>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Searching...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          <SearchResults results={results} />
        </div>
      )}
    </SearchContainer>
  );
};

export default Search;
