import React, { useState } from 'react';
import translations from '../utils/translations';

export default function SongSearch({ onSearch, currentLanguage }) {
  const t = translations[currentLanguage] || translations['Español'];
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    if (typeof onSearch === 'function') onSearch(v);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={t.searchPlaceholder || 'Buscar cantos…'}
        aria-label={t.searchPlaceholder || 'Buscar cantos…'}
        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
