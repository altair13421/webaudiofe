import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import RetroButton from "./RetroButton";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 10px 5px;
  width: 100%;
  max-width: 230px;
  overflow: hidden;
`;

const PlayerHeader = styled.h2`
  color: var(--terminal-text);
  font-family: var(--terminal-font);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  font-family: var(--terminal-font);
  color: var(--terminal-text);
  width: 100%;
`;

const TrackTitle = styled.h3`
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrackArtist = styled.p`
  font-size: 0.75rem;
  margin: 0;
  text-align: center;
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const ControlButton = styled.button`
  background: var(--terminal-bg);
  color: var(--terminal-text);
  border: 1px solid var(--terminal-primary);
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 5px;
  font-family: var(--terminal-font);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: var(--terminal-primary);
    color: var(--terminal-bg);
  }
`;

const NavButton = styled.button`
  background: transparent;
  color: var(--terminal-text);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--terminal-primary);
  }
`;

const ProgressBar = styled.input`
  width: 95%;
  margin: 5px 0;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  height: 4px;
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: var(--terminal-border);
    border-radius: 2px;
  }
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: var(--terminal-primary);
    margin-top: -4px;
  }
`;

const VolumeBar = styled.input`
  width: 70px;
  margin: 5px 0;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  height: 3px;
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    background: var(--terminal-border);
    border-radius: 1.5px;
  }
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: var(--terminal-primary);
    margin-top: -3.5px;
  }
`;

const VolumeLabel = styled.p`
  color: var(--terminal-text);
  font-family: var(--terminal-font);
  margin: 0;
  font-size: 0.7rem;
`;

const VolumeSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: 100%;
`;

const PlaybackMode = styled.div`
  color: var(--terminal-text);
  font-family: var(--terminal-font);
  margin-top: 5px;
  font-size: 0.7rem;
  text-align: center;
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
  
  // In the PlayerProvider component
  const nextTrack = useCallback(() => {
    if (playlist.length === 0 || currentIndex >= playlist.length - 1) return;
    
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setCurrentTrack(playlist[nextIndex]);
    // Make sure we're playing when navigating
    setIsPlaying(true);
  }, [playlist, currentIndex]);
  
  const previousTrack = useCallback(() => {
    if (playlist.length === 0 || currentIndex <= 0) return;
    
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTrack(playlist[prevIndex]);
    // Make sure we're playing when navigating
    setIsPlaying(true);
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
      const apiBaseUrl = ("http://localhost:8000/").replace(/\/$/, "");
      const audioUrl = `${apiBaseUrl}/track/${currentTrack.id}/play`;
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback error:", err));
      }
    }
  }, [currentTrack]); 
  
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
        <NavButton onClick={previousTrack}>⏮️</NavButton>
        <ControlButton onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </ControlButton>
        <NavButton onClick={nextTrack}>⏭️</NavButton>
      </Controls>
      <ProgressBar
        type="range"
        min="0"
        max="100"
        value={progress || 0}
        onChange={handleProgressChange}
      />
      <VolumeSlider>
        <span style={{ fontSize: '0.7rem', marginRight: '5px' }}>🔈</span>
        <VolumeBar
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <span style={{ fontSize: '0.7rem', marginLeft: '5px' }}>🔊</span>
      </VolumeSlider>
      <VolumeLabel>{volume}%</VolumeLabel>
      
      {playlist.length > 1 && (
        <PlaybackMode>
          Track {currentIndex + 1}/{playlist.length}
        </PlaybackMode>
      )}
    </PlayerContainer>
  );
};

export default Player;
