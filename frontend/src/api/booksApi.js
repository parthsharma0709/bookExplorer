import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/books";

export const fetchBooks = async (params = {}) => {
  const res = await axios.get(BASE_URL, { params });
  return res.data; // contains page, totalPages, totalBooks, books
};

export const fetchBookById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data; // detailed book info
};
