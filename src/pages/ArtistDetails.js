import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ArtistInfo from "../components/ArtistInfo";
import AlbumList from "../components/AlbumList";
import Singles from "../components/Singles";
import { musicApi } from "../services/api";
import RetroBackButton from "../components/RetroBackButton";

const ArtistDetailsContainer = styled.div`
  padding: 1rem;
`;

function ArtistDetails() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  // const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const [artistData, artistAlbums] = await Promise.all([
          musicApi.getArtistInfo(id),
          musicApi.getArtistAlbums(id),
        ]);
        setArtist(artistData);
        setAlbums(artistAlbums);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [id]);

  if (loading) return <div>Loading artist details...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <ArtistDetailsContainer>
      <RetroBackButton />
      <ArtistInfo artist={artist} />
      <AlbumList albums={albums} />
      <Singles singles={artist.singles} />
    </ArtistDetailsContainer>
  );
}

export default ArtistDetails;
