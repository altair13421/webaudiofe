import styled from "styled-components";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const ArtistCard = styled.div`
  border: 1px solid var(--terminal-green);
  padding: 20px 10px;
  background-color: rgba(0, 255, 0, 0.05);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;

  &:hover {
    background-color: rgba(0, 255, 0, 0.1);
    transform: translateY(-4px) scale(1.03);
  }
`;

const ArtistName = styled(Link)`
  color: #0ff;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: "Courier New", monospace;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ArtistList({ artists }) {
  return (
    <ListContainer>
      {artists? artists.map((artist) => (
        <ArtistCard key={artist.id}>
          <ArtistName to={`/artist/${artist.id}`}>{artist.name}</ArtistName>
        </ArtistCard>
      )): "No artists found."}
    </ListContainer>
  );
}
