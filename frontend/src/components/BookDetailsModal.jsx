import React from "react";

export default function BookDetailModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 line-clamp-2">
            {book.title}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-900 text-2xl font-bold transition"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-full md:w-48 h-64 md:h-auto overflow-hidden rounded-2xl">
            <img
              src={book.thumbnailUrl}
              alt={book.title}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-gray-700 text-base md:text-lg">
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-indigo-600 font-bold text-lg md:text-xl">
                £{book.price.toFixed(2)}
              </span>
            </div>

            <div className="text-gray-700 text-base md:text-lg">
              <span className="font-semibold">Availability:</span>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm md:text-base font-semibold ${
                  book.availability === "In stock"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {book.availability}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700 text-base md:text-lg">
                Rating:
              </span>
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
              <span className="text-gray-500 text-sm md:text-base">{book.rating}/5</span>
            </div>

            <div className="mt-2 text-gray-700 text-base md:text-lg">
              <span className="font-semibold">Detail Page:</span>{" "}
              <a
                href={book.detailPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline break-words"
              >
                View on Source
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t flex justify-end">
          <button
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-purple-500 hover:to-pink-500 transition text-lg md:text-xl"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
