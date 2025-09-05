import React, { useState, useEffect } from "react";

export default function SearchFilter({ filters, onFiltersChange }) {
  const [search, setSearch] = useState(filters.search || "");
  const [rating, setRating] = useState(filters.rating || "");
  const [availability, setAvailability] = useState(filters.availability || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");

  useEffect(() => {
    setSearch(filters.search || "");
    setRating(filters.rating || "");
    setAvailability(filters.availability || "");
    setMinPrice(filters.minPrice || "");
    setMaxPrice(filters.maxPrice || "");
  }, [filters]);

  const handleApplyFilters = () => {
    onFiltersChange({
      search,
      rating,
      availability,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setSearch("");
    setRating("");
    setAvailability("");
    setMinPrice("");
    setMaxPrice("");
    onFiltersChange({
      search: "",
      rating: "",
      availability: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 mb-10 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
        {/* Search */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm md:text-base font-bold text-gray-700 mb-2">
            Search by Title
          </label>
          <input
            type="text"
            placeholder="Type book title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition shadow-sm"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm md:text-base font-bold text-gray-700 mb-2">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition shadow-sm"
          >
            <option value="">All Ratings</option>
            <option value="1">★ 1</option>
            <option value="2">★★ 2</option>
            <option value="3">★★★ 3</option>
            <option value="4">★★★★ 4</option>
            <option value="5">★★★★★ 5</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm md:text-base font-bold text-gray-700 mb-2">
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition shadow-sm"
          >
            <option value="">All</option>
            <option value="In stock">In stock</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm md:text-base font-bold text-gray-700 mb-2">
              Min Price (£)
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm md:text-base font-bold text-gray-700 mb-2">
              Max Price (£)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 transition shadow-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 md:justify-end mt-2 md:mt-0">
          <button
            onClick={handleReset}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 shadow-md transition-all hover:scale-105"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 shadow-md transition-all hover:scale-105"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
