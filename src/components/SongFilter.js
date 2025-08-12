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

  // Scroll con flechas
  const scrollByPx = (px) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: px, behavior: 'smooth' });
  };

  // Drag para desplazar con ratón/touch
  const [drag, setDrag] = useState({ down:false, startX:0, scrollLeft:0 });
  const onMouseDown = (e) => {
    const el = trackRef.current; if (!el) return;
    setDrag({ down:true, startX:e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft });
  };
  const onMouseLeave = () => setDrag(d => ({ ...d, down:false }));
  const onMouseUp = () => setDrag(d => ({ ...d, down:false }));
  const onMouseMove = (e) => {
    const el = trackRef.current; if (!el || !drag.down) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - drag.startX); // sensibilidad
    el.scrollLeft = drag.scrollLeft - walk;
  };

  return (
    <div className="relative">
      {/* Flecha izquierda (visible también en móvil) */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => scrollByPx(-240)}
        className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10
                   h-8 w-8 rounded-full bg-white/90 border shadow hover:bg-white"
      >
        ‹
      </button>

      {/* Carrusel */}
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar px-10 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollBehavior: 'smooth' }}
        role="tablist"
        aria-label="Categorías"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
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

      {/* Flecha derecha */}
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => scrollByPx(240)}
        className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10
                   h-8 w-8 rounded-full bg-white/90 border shadow hover:bg-white"
      >
        ›
      </button>
    </div>
  );
}
