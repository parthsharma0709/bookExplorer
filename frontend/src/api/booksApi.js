import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const fetchBooks = async (params = {}) => {
  const res = await axios.get(`${BASE_URL}/books`, { params });
  return res.data;
};

export const fetchBookById = async (id) => {
  const res = await axios.get(`${BASE_URL}/books/${id}`);
  return res.data;
};
