import { useState, useEffect } from "react";
import styled from "styled-components";
import ArtistList from "../components/ArtistList";
import RetroBackButton from "../components/RetroBackButton";
import { musicApi } from "../services/api";

const PageContainer = styled.div`
  text-align: center;
  padding: 2rem;
  overflow-y: auto;
  color: var(--terminal-green);
`;

const SectionTitle = styled.h2`
  font-family: var(--terminal-font);
  margin-bottom: 2rem;
`;

const LoadMoreButton = styled.button`
  margin: 2rem auto;
  display: block;
  background: var(--terminal-bg);
  color: var(--terminal-green);
  border: 1px solid var(--terminal-green);
  padding: 0.5rem 2rem;
  font-family: var(--terminal-font);
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background: var(--terminal-green);
    color: var(--terminal-bg);
  }
`;

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 20; // Number of artists per page

  const fetchArtists = async (reset = false) => {
    setLoading(true);
    try {
      const response = await musicApi.getArtists({
        page: reset ? 1 : pageNumber,
      });
      if (reset) {
        setArtists(response.results);
      } else {
        setArtists((prev) => [...prev, ...response.results]);
      }
      setHasMore(response.count > LIMIT * pageNumber);
      setPageNumber((prev) => (reset ? 1 : prev + 1));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists(true);
    // eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      <RetroBackButton />
      <SectionTitle>All Artists</SectionTitle>
      <ArtistList artists={artists} />
      {loading && <div>Loading artists...</div>}
      {hasMore && !loading && (
        <LoadMoreButton onClick={() => fetchArtists(false)}>
          Load More {pageNumber}
        </LoadMoreButton>
      )}
    </PageContainer>
  );
}

export default ArtistsPage;
