import React, { useContext } from "react";
import styled from "styled-components";
import { PlayerContext } from "./Player";

const AlbumContainer = styled.div`
  margin: 1rem 0;
  border: 2px solid #0f0;
  padding: 1rem;
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

export default function Singles({ singles }) {
  const { playTrack } = useContext(PlayerContext);
  console.log(singles);
  return (
    <div>
        <AlbumContainer>
          <h3>Singles</h3>
          <TrackList>
            {singles && singles.length > 0 ? (
              singles.map((track) => (
                <TrackItem onClick={(e) => {
                  e.stopPropagation();
                  // Play this single track
                  console.log(`Playing track: ${track}`);
                  playTrack(track);
                }} key={track.id}>◉ {track.title}</TrackItem>
              ))
            ) : (
              <TrackItem>No singles available</TrackItem>
            )}
          </TrackList>
        </AlbumContainer>

    </div>
  );
}
