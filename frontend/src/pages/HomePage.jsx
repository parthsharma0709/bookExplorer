import React, { useEffect, useState } from "react";
import axios from "axios";
import BookGrid from "../components/BookGrid";
import SearchFilter from "../components/SearchFilter";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    rating: "",
    availability: "",
    minPrice: "",
    maxPrice: "",
  });


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const fetchBooks = async (currentPage = 1, currentFilters = filters) => {
    
    try {
      setLoading(true);
      setError("");
      const query = new URLSearchParams({ page: currentPage, ...currentFilters }).toString();
      const res = await axios.get(`${BASE_URL}/books?${query}`);
      setBooks(res.data.books);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch books.",err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    fetchBooks(1, newFilters);
  };

  const handlePageChange = (newPage) => {
    fetchBooks(newPage);
  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight 
               bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
               text-transparent bg-clip-text">
  Book Explorer
</h1>


        {/* Search & Filters */}
        <SearchFilter filters={filters} onFiltersChange={handleFiltersChange} />

        {loading && (
          <div className="text-center mt-16 text-gray-500 text-lg animate-pulse">
            Loading books...
          </div>
        )}
        {error && <div className="text-center mt-16 text-red-500 text-lg">{error}</div>}

        {!loading && !error && books.length === 0 && (
          <div className="text-center mt-16 text-gray-400 text-lg">
            No books found.
          </div>
        )}

        {!loading && books.length > 0 && (
          <>
            {/* Book Grid */}
            <BookGrid books={books} onBookClick={handleBookClick} />

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-3 flex-wrap">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium transition"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    page === i + 1
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 font-medium transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
