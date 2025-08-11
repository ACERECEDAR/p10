import React, { useState, useEffect } from 'react';
import songsData from './mock/songs'; // Vuelve a importar los datos mock
import SongCard from './components/SongCard';
import SimpleSongCard from './components/SimpleSongCard';
import SongFilter from './components/SongFilter';
import SongSearch from './components/SongSearch';
// import AddSongForm from './components/AddSongForm'; // Ya no se necesita
import SongDetailModal from './components/SongDetailModal';
import LanguageFilter from './components/LanguageFilter';
// import BulkImportForm from './components/BulkImportForm'; // Ya no se necesita
import translations from './utils/translations';

const App = () => {
  const [songsList, setSongsList] = useState(songsData); // Vuelve a usar los datos mock
  const [filteredSongs, setFilteredSongs] = useState(songsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('Español');
  const [showMessageModal, setShowMessageModal] = useState(false); // Estado para el modal de mensaje
  // const [showBulkImport, setShowBulkImport] = useState(false); // Ya no se necesita
  // const [editingSong, setEditingSong] = useState(null); // Ya no se necesita
  const [showingDetailSong, setShowingDetailSong] = useState(null);
  // const [isAdmin, setIsAdmin] = useState(true); // Ya no se necesita para controlar botones de edición/importación

  const t = translations[currentLanguage] || translations['Español'];

  // Definición de categories y allLanguages
  // Aseguramos que estas listas se generen correctamente a partir de songsData
  const categories = ['Todos', ...new Set(songsData.map(song => song.category))];
  // allLanguages debe ser una lista fija de todos los idiomas posibles, no solo los presentes en songsData
  // Esto asegura que el filtro de idiomas siempre muestre todas las opciones, incluso si no hay canciones en ese idioma.
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

  // Actualizar filteredSongs cuando songsList o los filtros cambian
  useEffect(() => {
    let result = [...songsList];
    
    // Filtrar por categoría
    if (activeCategory !== 'Todos') {
      result = result.filter(song => song.category === activeCategory);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(song => 
        song.title.toLowerCase().includes(term) || 
        song.category.toLowerCase().includes(term) ||
        (song.language && song.language.toLowerCase().includes(term))
      );
    }

    // Filtrar por idiomas seleccionados
    if (selectedLanguages.length > 0) {
      result = result.filter(song => selectedLanguages.includes(song.language));
    }

    // Mantener seleccionados arriba y ordenar el resto
    const selected = result.filter(song => song.selected);
    const notSelected = result.filter(song => !song.selected);

    notSelected.sort((a, b) => a.title.localeCompare(b.title));

    result = [...selected, ...notSelected];
    
    setFilteredSongs(result);
  }, [activeCategory, searchTerm, songsList, selectedLanguages]);


  const toggleSongSelection = (songId) => {
    setSongsList(prevSongs => 
      prevSongs.map(song => 
        song.id === songId 
          ? { ...song, selected: !song.selected } 
          : song
      )
    );
  };

  // Las funciones de agregar, importar, editar y eliminar ahora solo simulan la acción
  // y muestran un mensaje, ya que la escritura a SheetDB no se implementará aquí.
  // Se eliminan las funciones handleAddSong, handleImportSongs, handleEditSong, handleUpdateSong, handleDeleteSong
  // ya que no se usarán ni siquiera para mostrar alerts, los botones serán eliminados.

  const handleShowDetail = (song) => {
    setShowingDetailSong(song);
  };

  const handleCloseDetail = () => {
    setShowingDetailSong(null);
  };

  const handleLanguageFilterChange = (languages) => {
    setSelectedLanguages(languages);
  };

  const handleInterfaceLanguageChange = (event) => {
    setCurrentLanguage(event.target.value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Selector de idioma de interfaz en la esquina superior derecha */}
        <div className="absolute top-4 right-4 z-20">
          <select
            value={currentLanguage}
            onChange={handleInterfaceLanguageChange}
            className="rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
          >
            {Object.keys(translations).map(langKey => (
              <option key={langKey} value={langKey}>{langKey}</option>
            ))}
          </select>
        </div>

        {/* Portada estilizada */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{t.appTitle}</h1>
          <p className="text-xl text-gray-700">{t.appSubtitle}</p>
        </div>
        
        {/* Buscador en la primera línea */}
        <div className="mb-4">
          <SongSearch onSearch={handleSearch} />
        </div>

        {/* Botones en la segunda línea */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <LanguageFilter allLanguages={allLanguages} onLanguageChange={handleLanguageFilterChange} currentLanguage={currentLanguage} />
          
          {/* Se elimina el botón de Importar Cantos */}
          {/* {isAdmin && ( 
            <button
              onClick={() => {
                setShowBulkImport(!showBulkImport);
                setShowMessageModal(false); 
                setEditingSong(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              {showBulkImport ? 'Cancelar Importación' : 'Importar Cantos'}
            </button>
          )} */}

          <button
            onClick={() => {
              setShowMessageModal(!showMessageModal); // Alternar visibilidad del modal de mensaje
              // setShowBulkImport(false); // Ya no se necesita
              // setEditingSong(null); // Ya no se necesita
            }}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            {t.addSongButton}
          </button>
        </div>

        {/* Pestañas en la tercera línea */}
        <div className="mb-8">
           <SongFilter categories={categories} onFilterChange={handleFilterChange} currentLanguage={currentLanguage} />
        </div>
        
        {/* Modal de mensaje para agregar canto */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 text-center shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">¡Muchas gracias por su colaboración!</h3>
              <p className="text-gray-700 mb-6">
                Por favor, envíe el nuevo canto a <a href="mailto:cancioneroliturgico1@gmail.com" className="text-blue-600 hover:underline">cancioneroliturgico1@gmail.com</a>.
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

        {/* Formulario de agregar/editar canto (eliminado) */}
        {/* Formulario de importación masiva (eliminado) */}
        
        <div className="grid gap-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              song.selected ? (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  onToggleSelect={toggleSongSelection}
                  // onEditSong={handleEditSong} // Se elimina el prop onEditSong
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
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{t.noSongsFound}</p>
            </div>
          )}
        </div>
      </div>

      {showingDetailSong && (
        <SongDetailModal 
          song={showingDetailSong} 
          onClose={handleCloseDetail} 
          // onEditSong={handleEditSong} // Se elimina el prop onEditSong
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};

export default App;