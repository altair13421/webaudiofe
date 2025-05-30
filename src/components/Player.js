import React, { useState, useEffect, useCallback } from "react";
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
  background-color: var(--terminal-black);
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

const PlaybackMode = styled.div`
  color: var(--terminal-green);
  font-family: var(--terminal-font);
  margin-top: 10px;
  font-size: 0.8rem;
`;

// Create a global audio context to manage the player state across the application
export const PlayerContext = React.createContext({
  currentTrack: null,
  setCurrentTrack: () => {},
  playlist: [],
  setPlaylist: () => {},
  isPlaying: false,
  togglePlay: () => {},
  playTrack: () => {},
});

// PlayerProvider component to wrap the app and provide player state
export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Play a specific track and optionally set a new playlist
  const playTrack = useCallback((track, newPlaylist = null) => {
    if (newPlaylist) {
      setPlaylist(newPlaylist);
      setCurrentIndex(newPlaylist.findIndex(t => t.id === track.id));
    } else if (playlist.length > 0) {
      // If we're playing a track without a new playlist, find its index in the current playlist
      const index = playlist.findIndex(t => t.id === track.id);
      if (index !== -1) {
        setCurrentIndex(index);
      } else {
        // If the track isn't in the current playlist, create a single-track playlist
        setPlaylist([track]);
        setCurrentIndex(0);
      }
    } else {
      // No playlist exists, create a single-track playlist
      setPlaylist([track]);
      setCurrentIndex(0);
    }
    
    setCurrentTrack(track);
    setIsPlaying(true);
  }, [playlist]);
  
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  
  const nextTrack = useCallback(() => {
    if (playlist.length === 0 || currentIndex >= playlist.length - 1) return;
    
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setCurrentTrack(playlist[nextIndex]);
  }, [playlist, currentIndex]);
  
  const previousTrack = useCallback(() => {
    if (playlist.length === 0 || currentIndex <= 0) return;
    
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTrack(playlist[prevIndex]);
  }, [playlist, currentIndex]);
  
  return (
    <PlayerContext.Provider 
      value={{
        currentTrack,
        setCurrentTrack,
        playlist,
        setPlaylist,
        currentIndex,
        isPlaying,
        togglePlay,
        playTrack,
        nextTrack,
        previousTrack
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const Player = () => {
  const { 
    currentTrack, 
    playlist, 
    currentIndex,
    isPlaying, 
    togglePlay, 
    nextTrack, 
    previousTrack 
  } = React.useContext(PlayerContext);
  
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (currentTrack) {
      document.title = `${currentTrack.title} - ${currentTrack.artists ? currentTrack.artists[0].name : 'Unknown'}`;  
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      // The endpoint directly streams the audio file
      // We need to use the full API URL path
      const apiBaseUrl = ("http://localhost:8000/").replace(/\/$/, "");
      const audioUrl = `${apiBaseUrl}/track/${currentTrack.id}/play`;
      console.log("Audio URL:", audioUrl);
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback error:", err));
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleProgressChange = (e) => {
    const newValue = e.target.value;
    setProgress(newValue);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (newValue / 100) * audioRef.current.duration;
    }
  };

  // Handle track ended - play next track in playlist
  const handleTrackEnded = () => {
    nextTrack();
  };

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        const newProgress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(newProgress || 0);
      };
      
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", handleTrackEnded);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", updateProgress);
          audioRef.current.removeEventListener("ended", handleTrackEnded);
        }
      };
    }
  }, [nextTrack]);

  if (!currentTrack) {
    return (
      <PlayerContainer>
        <PlayerHeader>Music Player</PlayerHeader>
        <TrackInfo>
          <TrackTitle>No track selected</TrackTitle>
          <TrackArtist>Select a track to play</TrackArtist>
        </TrackInfo>
      </PlayerContainer>
    );
  }

  return (
    <PlayerContainer>
      <PlayerHeader>Now Playing</PlayerHeader>
      <TrackInfo>
        <TrackTitle>{currentTrack.title}</TrackTitle>
        <TrackArtist>
          {currentTrack.artists 
            ? currentTrack.artists.map(artist => artist.name).join(", ") 
            : "Unknown Artist"}
        </TrackArtist>
      </TrackInfo>
      <audio ref={audioRef} />
      <Controls>
        <ControlButton onClick={previousTrack}>
          <RetroButton
            emojicode="⏮️"
            fontSize={20}
            copyColor="#fff"
            shape="circle"
            fillButton={true}
          />
        </ControlButton>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </ControlButton>
        <ControlButton onClick={nextTrack}>
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
        value={progress || 0}
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
      
      {playlist.length > 1 && (
        <PlaybackMode>
          Playing track {currentIndex + 1} of {playlist.length}
        </PlaybackMode>
      )}
    </PlayerContainer>
  );
};

export default Player;
