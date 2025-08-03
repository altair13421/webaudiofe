import React, { useContext } from "react";
import styled from "styled-components";
import RetroButton from "./RetroButton";
import { PlayerContext } from "./Player";

const AlbumContainer = styled.div`
  margin: 1rem 0;
  border: 2px solid #0f0;
  padding: 1rem;
`;

const AlbumArt = styled.img`
  width: 200px;
  height: 200px;
  border: 3px solid #0ff;
  margin-bottom: 1rem;
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  color: #0f0;
`;

const TrackItem = styled.li`
  padding: 0.5rem;
  font-family: "Courier New", monospace;
  &:hover {
    background: #111;
  }
`;

export default function AlbumList({ albums }) {
  const { playTrack } = useContext(PlayerContext);

  return (
    <div>
      {albums.map((album) => (
        <AlbumContainer key={album.id}>
          <AlbumArt
            src={`data:image/jpeg;base64,${album.cover_art_base64}`}
            alt={album.title}
          />
          <RetroButton
            onClick={(e) => {
              e.stopPropagation();
              // Play this album
              playTrack(album.tracks[0], album.tracks);
            }}
            key={album.artist.id}
          >
            Play Album
          </RetroButton>
          <h3>{album.title}</h3>
          <h4>{album.romaji_title}</h4>
          <TrackList>
            {album.tracks.map((track) => (
              <TrackItem onClick={(e) => {
                e.stopPropagation();
                // Play this single track
                playTrack(track);
              }} key={track.id}>◉ {track.title} <br /> <small>english:</small> {track.romaji_title}</TrackItem>
            ))}
          </TrackList>
        </AlbumContainer>
      ))}
    </div>
  );
}
