import React, { useState } from 'react';
import translations from '../utils/translations';

const SongSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };
const t = translations[currentLanguage] || translations['Español'];

  return (
    <div className="w-full mb-4"> {/* Asegurar que ocupe todo el ancho */}
      <div className="relative">
        <input
          type="text"
          placeholder={t.searchPlaceholder || "Buscar canto"}
          aria-label={t.searchPlaceholder || "Buscar canto"}
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
        />
        <svg
          className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SongSearch;