import axios from 'axios';

const API_URL = 'http://localhost:8000/api/movies';

export const getMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

export const addMovie = async (movieData) => {
  try {
    await axios.post(API_URL, movieData);
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};
