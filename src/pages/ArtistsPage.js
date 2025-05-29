import { useState, useEffect } from "react";
import styled from "styled-components";
import ArtistList from "../components/ArtistList";
import RetroBackButton from "../components/RetroBackButton";
import { musicApi } from "../services/api";

const PageContainer = styled.div`
  padding: 2rem;
  border: 2px solid #0f0;
  margin: 1rem;
`;

const SectionTitle = styled.h2`
  color: #0ff;
  border-bottom: 2px dashed #0f0;
  font-family: "Courier New", monospace;
`;

function ArtistsPage() {
  const [topArtists, setTopArtists] = useState([]);
  const [randomArtists, setRandomArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [top, random] = await Promise.all([
          musicApi.get("/artists/top"),
          musicApi.get("/artists/random"),
        ]);
        setTopArtists(top.data);
        setRandomArtists(random.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageContainer>
      <RetroBackButton />
      <SectionTitle>Top Artists</SectionTitle>
      <ArtistList artists={topArtists} />

      <SectionTitle>Random Picks</SectionTitle>
      <ArtistList artists={randomArtists} />
    </PageContainer>
  );
}

export default ArtistsPage;
