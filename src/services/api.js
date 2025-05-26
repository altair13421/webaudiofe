import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/',
});

// Add these playlist-related methods
export const playlistApi = {
  // Get all playlists
  getPlaylists: async () => {
    try {
      const response = await api.get(`playlists/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
    }
  },

  // Get a specific playlist with its songs
  getPlaylistById: async (playlistId) => {
    try {
      const response = await api.get(`playlists/${playlistId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching playlist ${playlistId}:`, error);
      throw error;
    }
  },

  // Add a song to a playlist
  addSongToPlaylist: async (playlistId, songId) => {
    try {
      const response = await api.post(`playlists/${playlistId}/add_track`, { songId });
      return response.data;
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      throw error;
    }
  },

  // Remove a song from a playlist
  // NOT YET DONE
  removeSongFromPlaylist: async (playlistId, songId) => {
    try {
      const response = await api.delete(`/playlists/${playlistId}/songs/${songId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing song from playlist:', error);
      throw error;
    }
  },

  // Create a new playlist
  createPlaylist: async (playlistData) => {
    try {
      const response = await api.post('/playlists', playlistData);
      return response.data;
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
    }
  },
};

export const musicApi = {
  getArtistInfo: async (artistId) => {
    try {
      const response = await api.get(`/artists/${artistId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching artist info:', error);
      throw error;
    }
  },

  getArtistSongs: async (artistId) => {
    try {
      const response = await api.get(`/artists/${artistId}/tracks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching artist songs:', error);
      throw error;
    }
  },

    getArtistAlbums: async (artistId) => {
      try {
        const response = await api.get(`/artists/${artistId}/albums/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching artist albums:', error);
        throw error;
      }
    },

  searchSongs: async (query) => {
    try {
      const response = await api.get('/search/', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Error searching songs:', error);
      throw error;
    }
  },

  // NOT ADDED YET
  addToPlaylist: async (songId) => {
    try {
      const response = await api.post('/playlist/add', { songId });
      return response.data;
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      throw error;
    }
  },

  
  getTopArtists: async () => {
    try {
      const response = await api.post('/artists/top');
      return response.data;
    } catch (error) {
      console.error('Error getTopArtists', error);
      throw error;
    }
  },

  getRandomArtists: async () => {
    try {
      const response = await api.post('/artists/random');
      return response.data;
    } catch (error) {
      console.error('Error getRandomArtists', error);
      throw error;
    }
  },
};

export default api;

// Add to existing API methods