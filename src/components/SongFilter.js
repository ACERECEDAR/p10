import React, { useState } from 'react';
import translations from '../utils/translations';

const SongFilter = ({ categories, onFilterChange, currentLanguage }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const t = translations[currentLanguage] || translations['Español'];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  const categoryOrder = [
    'Todos',
    'Entrada',
    'Penitencia',
    'Gloria', // Nueva categoría
    'Aleluya',
    'Credo',
    'Ofertorio',
    'Santo',
    'Padre Nuestro',
    'Paz',
    'Cordero de Dios',
    'Comunión',
    'Salida',
    'Marianas',
    'Espíritu Santo'
  ];

  const orderedCategories = categoryOrder.filter(cat => 
    cat === 'Todos' || categories.includes(cat)
  );

  const getTranslatedCategoryName = (category) => {
    if (category === 'Todos') return t.categoryAll;
    const key = `category_${category.replace(/ /g, '_')}`;
    return t[key] || category;
  };

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-2 pb-2">
        {orderedCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {getTranslatedCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongFilter;