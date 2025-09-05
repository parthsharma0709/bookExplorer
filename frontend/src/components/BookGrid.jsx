import React, { useState } from "react";
import BookCard from "./BookCard";
import BookDetailModal from "./BookDetailsModal";

export default function BookGrid({ books }) {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="p-8">
      {/* Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-6
        "
      >
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="
                bg-white 
                rounded-2xl 
                p-3 
                shadow-md 
                hover:shadow-xl 
                transition 
                transform 
                hover:-translate-y-1 
                hover:scale-105 
                border 
                border-gray-100
              "
            >
              <BookCard book={book} onClick={() => setSelectedBook(book)} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-16 text-lg font-medium">
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
