import translations from './translations';

// Normaliza y traduce categorías según el idioma activo
export function translateCategory(cat, currentLanguage) {
  if (!cat) return '';
  const key = String(cat).trim();
  const map = translations[currentLanguage]?.categories || {};
  return map[key] || key; // si no hay traducción, muestra el original
}
