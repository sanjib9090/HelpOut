import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const SearchAndFilters = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [userRole] = useState("provider"); // Note: This assumes userRole is managed in parent; could pass as prop if needed

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 sm:mb-6">
        <div className="flex-1 relative w-full">
          <Search className={`absolute left-4 top-3 w-5 h-5 ${theme === "light" ? "text-gray-400" : "text-gray-300"}`} />
          <input
            type="text"
            placeholder={userRole === "poster" ? "Search your tasks..." : "Search available tasks..."}
            className={`w-full pl-12 pr-4 py-3 ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700 text-white"} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 ${theme === "light" ? "text-gray-700 bg-white border-gray-200" : "text-gray-300 bg-gray-800 border-gray-700"} font-medium px-4 py-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition w-full md:w-auto`}
          aria-expanded={showFilters}
          aria-label="Toggle filters"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className={`rounded-2xl shadow-md border ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"} p-4 sm:p-6`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-1`}>Category</label>
              <select className={`w-full py-2 px-3 ${theme === "light" ? "bg-gray-50 border-gray-200 text-gray-800" : "bg-gray-700 border-gray-600 text-white"} border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400`}>
                <option>All Categories</option>
                <option>Moving</option>
                <option>Pet Care</option>
                <option>Handyman</option>
                <option>Cleaning</option>
                <option>Delivery</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-1`}>Urgency</label>
              <select className={`w-full py-2 px-3 ${theme === "light" ? "bg-gray-50 border-gray-200 text-gray-800" : "bg-gray-700 border-gray-600 text-white"} border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400`}>
                <option>All Urgency</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-1`}>Price Range</label>
              <select className={`w-full py-2 px-3 ${theme === "light" ? "bg-gray-50 border-gray-200 text-gray-800" : "bg-gray-700 border-gray-600 text-white"} border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400`}>
                <option>All Prices</option>
                <option>$0 - $25</option>
                <option>$25 - $50</option>
                <option>$50 - $100</option>
                <option>$100+</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"} mb-1`}>Location</label>
              <input
                type="text"
                placeholder="Filter by location..."
                className={`w-full py-2 px-3 ${theme === "light" ? "bg-gray-50 border-gray-200 text-gray-800" : "bg-gray-700 border-gray-600 text-white"} border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;