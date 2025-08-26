import axios from "axios";
import { logoutUser } from "./authService"; // sua função existente

const API_URL = "http://localhost:8000/api/movies";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const getMovies = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};

export const getMovieById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};

export const addMovie = async (movieData) => {
  const response = await axiosInstance.post("/", movieData);
  return response.data;
};

export const updateMovie = async (id, movieData) => {
  const response = await axiosInstance.put(`/${id}`, movieData);
  return response.data;
};

export const getLatestUnwatchedMovies = async () => {
  const response = await axiosInstance.get("/latest-unwatched");
  return response.data;
};

export const getLatestWatchedMovies = async () => {
  const response = await axiosInstance.get("/latest-watched");
  return response.data;
};
