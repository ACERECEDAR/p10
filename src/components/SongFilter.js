// src/components/SongFilter.js
import React, { useState } from 'react';
import translations from '../utils/translations';

export default function SongFilter({ categories = [], onFilterChange, currentLanguage }) {
  const [active, setActive] = useState('Todos');
  const tCats = translations[currentLanguage]?.categories || {};

  const handleClick = (cat) => {
    setActive(cat);
    if (typeof onFilterChange === 'function') onFilterChange(cat);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={
            'px-3 py-1 rounded-full border shadow-sm transition ' +
            (active === cat ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100')
          }
        >
          {tCats[cat] || cat}
        </button>
      ))}
    </div>
  );
}
