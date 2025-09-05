import React from "react";

export default function BookCard({ book, onClick }) {
  return (
    <div
      className="bg-white shadow-lg rounded-3xl overflow-hidden transform transition hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="h-56 w-full overflow-hidden rounded-t-3xl">
        <img
          src={book.thumbnailUrl}
          alt={book.title}
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      {/* Book Info */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
          {book.title}
        </h3>

        {/* Price & Availability */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-indigo-600 font-extrabold text-lg md:text-xl">
            £{book.price.toFixed(2)}
          </span>
          <span
            className={`text-sm md:text-base font-semibold px-3 py-1 rounded-full ${
              book.availability === "In stock"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.availability}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <svg
              key={idx}
              className={`w-5 h-5 md:w-6 md:h-6 ${
                idx < book.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.964c.3.922-.755 1.688-1.538 1.118l-3.376-2.455a1 1 0 00-1.176 0l-3.376 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.964a1 1 0 00-.364-1.118L2.047 9.392c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.965z" />
            </svg>
          ))}
          <span className="ml-3 text-gray-600 text-sm md:text-base font-medium">
            {book.rating}/5
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onClick}
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-2xl hover:from-purple-500 hover:to-blue-500 transition text-lg md:text-xl"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
