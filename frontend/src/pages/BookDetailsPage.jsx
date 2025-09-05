import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookDetailPage() {
  const { id } = useParams(); // get book id from route
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/books/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch book details.",err);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!book) return <div className="text-center mt-10">Book not found</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg p-6">
        {/* Book Image */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={book.thumbnailUrl}
            alt={book.title}
            className="w-full h-auto rounded"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Price:</span> £{book.price}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Rating:</span> {book.rating} ⭐
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Availability:</span> {book.availability}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Detail Page:</span>{" "}
            <a
              href={book.detailPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Visit Book Page
            </a>
          </p>

          {/* Optional Description Placeholder */}
          <p className="text-gray-700 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
            lectus vitae turpis venenatis tincidunt. You can add more info here.
          </p>
        </div>
      </div>
    </div>
  );
}
