import React, { useState } from 'react';
import SheetMusicViewer from './SheetMusicViewer';
import translations from '../utils/translations';

const SongCard = ({ song, onToggleSelect, currentLanguage }) => { // Se elimina onEditSong de los props
  const [showLyrics, setShowLyrics] = useState(false);
  const [showSheetMusic, setShowSheetMusic] = useState(false);
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(song.sheetMusicLink);

  const t = translations[currentLanguage] || translations['Español'];

  // Determinar si faltan campos importantes para los botones
  const missingSpotify = !song.spotifyLink;
  const missingYoutube = !song.youtubeLink;
  const missingSheetMusic = !song.sheetMusicLink;
  const missingLyrics = !song.lyrics;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
      song.selected ? 'ring-2 ring-yellow-400' : ''
    }`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{song.title}</h3>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {song.category}
            </span>
            {song.language && (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {song.language}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {/* Se elimina el botón de edición */}
            {/* <button
              onClick={() => onEditSong(song)}
              className="p-2 text-gray-600 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button> */}
            <button
              onClick={() => onToggleSelect(song.id)}
              className={`p-2 rounded-full ${
                song.selected 
                  ? 'bg-yellow-400 text-yellow-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <a 
            href={song.spotifyLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center transition-colors ${
              missingSpotify ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:text-green-800'
            }`}
            onClick={(e) => missingSpotify && e.preventDefault()}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.56 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Escuchar en Spotify
          </a>
          <a 
            href={song.youtubeLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center transition-colors ${
              missingYoutube ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'
            }`}
            onClick={(e) => missingYoutube && e.preventDefault()}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            Ver en YouTube
          </a>
          <button
            onClick={() => !missingSheetMusic && setShowSheetMusic(true)}
            className={`flex items-center transition-colors w-full ${
              missingSheetMusic ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
            }`}
            disabled={missingSheetMusic}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            {t.viewSheetMusic}
          </button>
          <button
            onClick={() => !missingLyrics && setShowLyrics(true)}
            className={`flex items-center transition-colors w-full ${
              missingLyrics ? 'text-gray-400 cursor-not-allowed' : 'text-purple-600 hover:text-purple-800'
            }`}
            disabled={missingLyrics}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            {t.viewLyrics}
          </button>
        </div>
      </div>

      {showLyrics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">{t.modalLyricsTitle} {song.title}</h3>
              <button 
                onClick={() => setShowLyrics(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap font-sans text-lg">{song.lyrics}</pre>
            </div>
          </div>
        </div>
      )}

      {showSheetMusic && (
        <SheetMusicViewer 
          fileUrl={song.sheetMusicLink} 
          onClose={() => setShowSheetMusic(false)} 
        />
      )}
    </div>
  );
};

export default SongCard;