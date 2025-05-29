import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RetroButton from "./RetroButton";
import { musicApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid var(--terminal-green);
  border-radius: 10px;
  padding: 20px;
  background-color: var(--terminal-green);
  box-shadow: 0 0 10px var(--terminal-green);
  width: 100%;
  max-width: 600px;
`;
const PlayerHeader = styled.h2`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  font-family: var(--terminal-font);
  color: var(--terminal-green);
`;
const TrackTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;
const TrackArtist = styled.p`
  font-size: 1rem;
  margin: 0;
`;
const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const ControlButton = styled(RetroButton)`
  margin: 0 10px;
`;
const ProgressBar = styled.input`
  width: 100%;
  margin: 10px 0;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  border-radius: 10px;
  height: 5px;
`;
const VolumeBar = styled.input`
  width: 100px;
  margin: 10px 0;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  border-radius: 10px;
  height: 5px;
`;
const VolumeLabel = styled.p`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin: 0;
`;
const VolumeSlider = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const VolumeIcon = styled.i`
  font-size: 1.5rem;
  color: var(--terminal-green);
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: var(--terminal-yellow);
  }
`;
const VolumeIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 5px var(--terminal-green);
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
const VolumeIconContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 5px var(--terminal-green);
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Player = ({
  currentTrack,
  currentPlaylist,
  allTracks,
  setCurrentTrack,
  currentTrackIndex,
}) => {
  const [trackInfo, setTrackInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (currentTrack) {
      document.title = `${currentTrack.title} - ${currentTrack.artist}`;
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      setProgress(0);
      setIsPlaying(false);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleNextTrack = () => {
    if (currentTrackIndex < allTracks.length - 1) {
      setCurrentTrack(allTracks[currentTrackIndex + 1]);
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrack(allTracks[currentTrackIndex - 1]);
    }
  };
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newValue = e.target.value;
    setProgress(newValue);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (newValue / 100) * audioRef.current.duration;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", () => {
        const newProgress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(newProgress);
      });
    }
  });
  return (
    <PlayerContainer>
      <PlayerHeader>Now Playing</PlayerHeader>
      {currentTrack && (
        <TrackInfo>
          <TrackTitle>{currentTrack.title}</TrackTitle>
          <TrackArtist>{currentTrack.artist}</TrackArtist>
        </TrackInfo>
      )}
      <audio ref={audioRef} src={currentTrack?.url} />
      <Controls>
        <ControlButton onClick={handlePreviousTrack}>
          <RetroButton
            emojicode="⏮️"
            fontSize={20}
            copyColor="#fff"
            shape="circle"
            fillButton={true}
          />
        </ControlButton>
        <ControlButton onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </ControlButton>
        <ControlButton onClick={handleNextTrack}>
          <RetroButton
            emojicode="⏭️"
            fontSize={20}
            copyColor="#fff"
            shape="circle"
            fillButton={true}
          />
        </ControlButton>
      </Controls>
      <ProgressBar
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
      />
      <VolumeSlider>
        <VolumeIconContainer>
          <VolumeIcon className="fas fa-volume-down" />
        </VolumeIconContainer>
        <VolumeBar
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <VolumeIconContainer>
          <VolumeIcon className="fas fa-volume-up" />
        </VolumeIconContainer>
      </VolumeSlider>
      <VolumeLabel>{volume}%</VolumeLabel>
    </PlayerContainer>
  );
};
export default Player;
