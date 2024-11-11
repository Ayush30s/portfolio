// src/api/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const getEmployees = () => {
  return axios.get(`${API_URL}/employees`);
};