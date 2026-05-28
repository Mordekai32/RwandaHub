import { useState } from 'react';

const categories = ['All', 'Phones', 'Cars', 'Clothes', 'Houses', 'Electronics'];

export default function SearchFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    minPrice: '',
    maxPrice: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cleanFilters = {};
    if (filters.search.trim()) cleanFilters.search = filters.search.trim();
    if (filters.category !== 'All') cleanFilters.category = filters.category;
    if (filters.minPrice && !isNaN(Number(filters.minPrice))) cleanFilters.minPrice = Number(filters.minPrice);
    if (filters.maxPrice && !isNaN(Number(filters.maxPrice))) cleanFilters.maxPrice = Number(filters.maxPrice);
    if (filters.location.trim()) cleanFilters.location = filters.location.trim();
    
    onSearch(cleanFilters);
  };

  const handleReset = () => {
    const emptyFilters = { search: '', category: 'All', minPrice: '', maxPrice: '', location: '' };
    setFilters(emptyFilters);
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-[#CBD5E1]/30">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="p-3 border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition bg-white/50 text-[#0F172A] placeholder:text-gray-500"
        />

        {/* Category select */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-3 border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#10B981] outline-none bg-white/50 text-[#0F172A]"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Min price */}
        <input
          type="number"
          placeholder="💰 Min price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="p-3 border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition bg-white/50 text-[#0F172A] placeholder:text-gray-500"
        />

        {/* Max price */}
        <input
          type="number"
          placeholder="💰 Max price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="p-3 border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition bg-white/50 text-[#0F172A] placeholder:text-gray-500"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="📍 Location (e.g., Kigali)"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="p-3 border border-[#CBD5E1] rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none transition bg-white/50 text-[#0F172A] placeholder:text-gray-500"
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="flex-1 bg-[#F97316] hover:bg-[#EA580C] active:bg-[#C2410C] text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          🔍 Search & Filter
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 bg-gray-100 hover:bg-gray-200 text-[#0F172A] py-3 rounded-xl font-semibold transition-colors duration-200 border border-[#CBD5E1]"
        >
          Reset
        </button>
      </div>
    </form>
  );
}