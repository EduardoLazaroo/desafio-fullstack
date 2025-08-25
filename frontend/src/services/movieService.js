import axios from "axios";

const API_URL = "http://localhost:8000/api/movies";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  // console.log("JWT token:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMovies = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching movie:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error.response?.data || error.message);
    throw error;
  }
};


export const addMovie = async (movieData) => {
  try {
    const response = await axios.post(API_URL, movieData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error.response?.data || error.message);
    throw error;
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, movieData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error.response?.data || error.message);
    throw error;
  }
};

export const getLatestUnwatchedMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest-unwatched`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching latest unwatched movies:", error.response?.data || error.message);
    throw error;
  }
};

export const getLatestWatchedMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest-watched`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching latest watched movies:", error.response?.data || error.message);
    throw error;
  }
};
