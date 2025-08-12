import React, { useState, useEffect } from 'react';
import SongCard from './components/SongCard';
import SimpleSongCard from './components/SimpleSongCard';
import SongFilter from './components/SongFilter';
import SongSearch from './components/SongSearch';
import SongDetailModal from './components/SongDetailModal';
import LanguageFilter from './components/LanguageFilter';
import translations from './utils/translations';

const App = () => {
  // Estados principales
  const [songsList, setSongsList] = useState([]);        // Datos desde SheetDB
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('Español');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showingDetailSong, setShowingDetailSong] = useState(null);

  const t = translations[currentLanguage] || translations['Español'];

  // ✅ Lista FIJA de categorías: SIEMPRE visibles
  const ALL_CATEGORIES = [
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

  // Lista fija de idiomas (como ya tenías)
  const allLanguages = [
    'Alemán',
    'Catalán',
    'Español',
    'Francés',
    'Gallego',
    'Inglés',
    'Italiano',
    'Latín',
    'Portugués',
    'Vasco',
    'Otro'
  ].sort();

  // 1) Cargar datos desde SheetDB al montar la app
  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/vvgqm7l6rkuds')
      .then((res) => res.json())
      .then((data) => {
        // Normalizamos por si las columnas usan otros nombres
        const normalized = (Array.isArray(data) ? data : []).map((row, idx) => ({
          id: row.id || row.ID || idx + 1,
          title: row.title || row.titulo || row.name || 'Sin título',
          category: row.category || row.categoria || 'Otro',
          language: row.language || row.idioma || 'Español',
          selected:
            row.selected === true ||
            row.selected === 'TRUE' ||
            row.seleccionado === 'TRUE' ||
            false,
             spotify: row.spotify || row.spotify_link || row.Spotify || row.link_spotify || '',
  youtube: row.youtube || row.youtube_link || row.YouTube || row.link_youtube || '',
  sheetMusic:
    row.sheetMusic || row.sheet_music || row.partitura || row.partition ||
    row.score || row.pdf_url || row.sheet || '',

          ...row
        }));
        setSongsList(normalized);
      })
      .catch((err) => {
        console.error('Error cargando canciones desde SheetDB', err);
        setSongsList([]); // Deja vacío si falla
      });
  }, []);

  // 2) Recalcular la lista filtrada cada vez que cambien filtros o datos
  useEffect(() => {
    let result = [...songsList];

    // Filtrar por categoría (si no es 'Todos')
    if (activeCategory !== 'Todos') {
      result = result.filter((song) => (song.category || 'Otro') === activeCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((song) =>
        (song.title || '').toLowerCase().includes(term) ||
        (song.category || '').toLowerCase().includes(term) ||
        (song.language || '').toLowerCase().includes(term)
      );
    }

    // Filtrar por idiomas seleccionados
    if (selectedLanguages.length > 0) {
      result = result.filter((song) => selectedLanguages.includes(song.language));
    }

    // Mantener seleccionados arriba y ordenar el resto alfabéticamente por título
    const selected = result.filter((song) => song.selected);
    const notSelected = result.filter((song) => !song.selected);
    notSelected.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

    setFilteredSongs([...selected, ...notSelected]);
  }, [activeCategory, searchTerm, songsList, selectedLanguages]);

  // ✅ Usamos SIEMPRE la lista fija
  const categories = ALL_CATEGORIES;

  const toggleSongSelection = (songId) => {
    setSongsList((prev) =>
      prev.map((song) =>
        song.id === songId ? { ...song, selected: !song.selected } : song
      )
    );
  };

  const handleShowDetail = (song) => setShowingDetailSong(song);
  const handleCloseDetail = () => setShowingDetailSong(null);
  const handleLanguageFilterChange = (languages) => setSelectedLanguages(languages);
  const handleInterfaceLanguageChange = (e) => setCurrentLanguage(e.target.value);
  const handleSearch = (term) => setSearchTerm(term);
  const handleFilterChange = (category) => setActiveCategory(category);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative">
        {/* Selector de idioma de interfaz */}
        <div className="absolute top-4 right-4 z-20">
          <select
            value={currentLanguage}
            onChange={handleInterfaceLanguageChange}
            className="rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
          >
            {Object.keys(translations).map((langKey) => (
              <option key={langKey} value={langKey}>{langKey}</option>
            ))}
          </select>
        </div>

        {/* Portada */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{t.appTitle}</h1>
          <p className="text-xl text-gray-700">{t.appSubtitle}</p>
        </div>

        {/* Buscador */}
        <div className="mb-4">
          <SongSearch onSearch={handleSearch} />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <LanguageFilter
            allLanguages={allLanguages}
            onLanguageChange={handleLanguageFilterChange}
            currentLanguage={currentLanguage}
          />

          <button
            onClick={() => setShowMessageModal(!showMessageModal)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            {t.addSongButton}
          </button>
        </div>

        {/* Pestañas de categorías */}
        <div className="mb-8">
          <SongFilter
            categories={categories}           
            onFilterChange={handleFilterChange}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* Modal de mensaje */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¡Muchas gracias por su colaboración!</h3>
              <p className="text-gray-700 mb-6">
                Por favor, envíe el nuevo canto a{' '}
                <a href="mailto:cancioneroliturgico1@gmail.com" className="text-blue-600 hover:underline">
                  cancioneroliturgico1@gmail.com
                </a>.
                Los administradores comprobarán que es litúrgico y lo añadirán a la plataforma.
              </p>
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Lista de cantos */}
        <div className="grid gap-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) =>
              song.selected ? (
                <SongCard
                  key={song.id}
                  song={song}
                  onToggleSelect={toggleSongSelection}
                  currentLanguage={currentLanguage}
                />
              ) : (
                <SimpleSongCard
                  key={song.id}
                  song={song}
                  onToggleSelect={toggleSongSelection}
                  onShowDetail={() => handleShowDetail(song)}
                  showCategory={activeCategory === 'Todos'}
                  currentLanguage={currentLanguage}
                />
              )
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {/* Mensaje cuando una categoría está vacía */}
                No hay cantos en esta categoría todavía.
              </p>
            </div>
          )}
        </div>
      </div>

      {showingDetailSong && (
        <SongDetailModal
          song={showingDetailSong}
          onClose={handleCloseDetail}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};

export default App;
