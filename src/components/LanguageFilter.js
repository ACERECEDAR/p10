import React from 'react';
import translations from '../utils/translations'; // Importar el archivo de traducciones

const LanguageFilter = ({ allLanguages, onLanguageChange, currentLanguage }) => {
  const t = translations[currentLanguage] || translations['Español']; // Obtener las traducciones para el idioma actual

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    onLanguageChange(prevSelected => {
      if (checked) {
        return [...prevSelected, value];
      } else {
        return prevSelected.filter(lang => lang !== value);
      }
    });
  };

  // Función para obtener el nombre traducido del idioma
  const getTranslatedLanguageName = (lang) => {
    const key = `language_${lang.replace(/ /g, '_')}`; // Ejemplo: "language_Español"
    return t[key] || lang; // Devuelve la traducción o el nombre original si no hay traducción
  };

  return (
    <div className="relative group">
      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap">
        {t.filterByLanguage}
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform scale-95 group-hover:scale-100">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {allLanguages.map(lang => (
            <label key={lang} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <input
                type="checkbox"
                value={lang}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-black transition duration-150 ease-in-out"
              />
              <span className="ml-2">{getTranslatedLanguageName(lang)}</span> {/* Usar la función de traducción */}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageFilter;