import React from "react";
import styled from "styled-components";

const Section = styled.div`
  margin-bottom: 2rem;
  border-left: 3px solid var(--terminal-primary);
  padding-left: 1rem;
`;

const SectionTitle = styled.h2`
  color: var(--terminal-primary);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-family: var(--terminal-font);
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 0.4rem;
  color: var(--terminal-text);
  font-family: var(--terminal-font);
`;

const Highlight = styled.span`
  color: var(--terminal-secondary);
`;

const SearchResults = ({ results }) => {
  if (!results) return null;

  return (
    <div>
      <Section>
        <SectionTitle>Tracks</SectionTitle>
        <List>
          {results.tracks && results.tracks.length > 0 ? (
            results.tracks.map((track) => (
              <ListItem key={track.id}>
                <Highlight>{track.title}</Highlight>
                {" — "}
                {track.artist__name}
                {track.album__title ? ` (${track.album__title})` : ""}
              </ListItem>
            ))
          ) : (
            <ListItem>No tracks found.</ListItem>
          )}
        </List>
      </Section>

      <Section>
        <SectionTitle>Playlists</SectionTitle>
        <List>
          {results.playlists && results.playlists.length > 0 ? (
            results.playlists.map((playlist) => (
              <ListItem key={playlist.id}>
                <Highlight>{playlist.name}</Highlight>
              </ListItem>
            ))
          ) : (
            <ListItem>No playlists found.</ListItem>
          )}
        </List>
      </Section>

      <Section>
        <SectionTitle>Artists</SectionTitle>
        <List>
          {results.artists && results.artists.length > 0 ? (
            results.artists.map((artist) => (
              <ListItem key={artist.id}>
                <Highlight>{artist.name}</Highlight>
              </ListItem>
            ))
          ) : (
            <ListItem>No artists found.</ListItem>
          )}
        </List>
      </Section>

      <Section>
        <SectionTitle>Albums</SectionTitle>
        <List>
          {results.albums && results.albums.length > 0 ? (
            results.albums.map((album) => (
              <ListItem key={album.id}>
                <Highlight>{album.title}</Highlight>
                {album.artist ? ` — ${album.artist}` : ""}
              </ListItem>
            ))
          ) : (
            <ListItem>No albums found.</ListItem>
          )}
        </List>
      </Section>
    </div>
  );
};

export default SearchResults;
