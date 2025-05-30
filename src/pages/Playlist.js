import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MusicList from "../components/MusicList";
import PlaylistList from "../components/PlaylistList";
import { playlistApi } from "../services/api";
import RetroBackButton from "../components/RetroBackButton";

const PlaylistContainer = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin-bottom: 1rem;
`;

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await playlistApi.getPlaylists();
        setPlaylists(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      if (!selectedPlaylist) return;

      setLoading(true);
      try {
        const data = await playlistApi.getPlaylistById(selectedPlaylist.id);
        setPlaylistSongs(data.tracks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistSongs();
  }, [selectedPlaylist]);

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBack = () => {
    setSelectedPlaylist(null);
    setPlaylistSongs([]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <PlaylistContainer>
      <RetroBackButton onClick={selectedPlaylist ? handleBack : undefined} />
      <Title>
        {selectedPlaylist ? `> ${selectedPlaylist.name}_` : "> My Playlists_"}
      </Title>

      {selectedPlaylist ? (
        <MusicList
          songs={playlistSongs}
          onSelectSong={async (song) => {
            try {
              console.log(song);
            } catch (err) {
              setError(err.message);
            }
          }}
          actionLabel="Remove"
        />
      ) : (
        <PlaylistList
          playlists={playlists}
          onSelectPlaylist={handlePlaylistSelect}
        />
      )}
    </PlaylistContainer>
  );
};

export default Playlist;
