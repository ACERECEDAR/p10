// src/components/SongFilter.js
import React, { useRef, useState } from 'react';
import translations from '../utils/translations';

export default function SongFilter({ categories = [], onFilterChange, currentLanguage }) {
  const [active, setActive] = useState('Todos');
  const tCats = translations[currentLanguage]?.categories || {};
  const trackRef = useRef(null);

  const handleClick = (cat) => {
    setActive(cat);
    if (typeof onFilterChange === 'function') onFilterChange(cat);
  };

  const scrollByPx = (px) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: px, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Botón izquierdo */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => scrollByPx(-240)}
        className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10
                   h-8 w-8 rounded-full bg-white/90 border shadow hover:bg-white"
      >
        ‹
      </button>

      {/* Pista desplazable */}
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar px-8"
        style={{ scrollBehavior: 'smooth' }}
        role="tablist"
        aria-label="Categorías"
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

      {/* Botón derecho */}
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => scrollByPx(240)}
        className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10
                   h-8 w-8 rounded-full bg-white/90 border shadow hover:bg-white"
      >
        ›
      </button>
    </div>
  );
}
