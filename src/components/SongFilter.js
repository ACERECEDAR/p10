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
    // Carrusel horizontal: una sola línea con scroll X
    <div className="relative -mx-2 px-2">
      <div
        className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar py-1"
        role="tablist"
        aria-label="Categorías"
        tabIndex={0}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={
              'shrink-0 inline-block px-3 py-1 rounded-full border shadow-sm transition ' +
              (active === cat ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100')
            }
            role="tab"
            aria-selected={active === cat}
          >
            {tCats[cat] || cat}
          </button>
        ))}
      </div>
    </div>
  );
}
