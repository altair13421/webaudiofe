import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ArtistCard = styled.div`
  border: 1px solid #0f0;
  padding: 1rem;
  margin: 1rem 0;
  transition: all 0.3s;
  
  &:hover {
    background: #112211;
    transform: translateX(10px);
  }
`;

const ArtistName = styled(Link)`
  color: #0ff;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function ArtistList({ artists }) {
  return (
    <div>
      {artists.map(artist => (
        <ArtistCard key={artist.id}>
          <ArtistName to={`/artist/${artist.id}`}>
            {artist.name}
          </ArtistName>
        </ArtistCard>
      ))}
    </div>
  );
}