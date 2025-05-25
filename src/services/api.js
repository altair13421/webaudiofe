import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error:', error.request);
    throw new Error('Network error - please check your connection');
  } else {
    // Other errors
    console.error('Error:', error.message);
    throw new Error('An unexpected error occurred');
  }
};

export const apiService = {
  async get(endpoint, params = {}) {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async post(endpoint, data = {}) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async put(endpoint, data = {}) {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async delete(endpoint) {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

export const musicApi = {
  searchSongs: (query) => apiService.get('/songs/search', { query }),
  getSongById: (id) => apiService.get(`/songs/${id}`),
  getArtistInfo: (id) => apiService.get(`/artists/${id}`),
  getPlaylist: () => apiService.get('/playlist'),
  addToPlaylist: (songId) => apiService.post('/playlist', { songId }),
  removeFromPlaylist: (songId) => apiService.delete(`/playlist/${songId}`)
};