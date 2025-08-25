import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token } = response.data;

    if (token) {
      localStorage.setItem("authToken", token);
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const registerUser = async (name, email, password, confirmPassword) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

export const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};
