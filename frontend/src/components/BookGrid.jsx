import React, { useState } from "react";
import BookCard from "./BookCard";
import BookDetailModal from "./BookDetailsModal";

export default function BookGrid({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="p-6">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl p-2 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 border border-gray-200"
            >
              <BookCard
                book={book}
                onClick={() => setSelectedBook(book)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12 text-lg font-medium">
            No books found.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
