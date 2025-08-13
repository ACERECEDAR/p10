import React from 'react';
import { translateCategory } from '../utils/i18n';
import translations from '../utils/translations';
import { sanitizeUrl } from '../utils/links';
import { FaSpotify, FaYoutube, FaMusic } from 'react-icons/fa';

const SimpleSongCard = ({ song, onToggleSelect, onShowDetail, showCategory, currentLanguage }) => {
  const t = translations[currentLanguage] || translations['Español'];
const tLangs = translations[currentLanguage]?.languages || {};

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-all duration-300 ${
      song.selected ? 'ring-2 ring-yellow-400' : ''
    }`}>
      <div className="flex-1 min-w-0">
        <h3 
          className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
          onClick={() => onShowDetail(song)}
        >
          {song.title}
        </h3>

        {/* Chips de categoría e idioma */}
        <div className="flex flex-wrap gap-2 mt-1">
          {showCategory && (
            <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600">
              {translateCategory(song?.category, currentLanguage)}
            </span>
          )}
          {song.language && (
  <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 text-xs font-medium">
    {tLangs[song.language] || song.language}
  </span>
)}

        </div>

        {/* Enlaces con iconos */}
        <div className="flex flex-wrap gap-2 mt-2">
          {song.spotify && (
            <a
              href={sanitizeUrl(song.spotify)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded bg-green-100 text-green-700 hover:bg-green-200"
              title={t.listenOnSpotify}
            >
              <FaSpotify size={16} />
            </a>
          )}
          {song.youtube && (
            <a
              href={sanitizeUrl(song.youtube)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
              title={t.watchOnYouTube}
            >
              <FaYoutube size={16} />
            </a>
          )}
          {song.sheetMusic && (
            <a
              href={sanitizeUrl(song.sheetMusic)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
              title={t.viewSheetMusic}
            >
              <FaMusic size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4">
        <button
          onClick={() => onShowDetail(song)}
          className="p-2 text-gray-600 hover:text-black transition-colors"
          title={t.viewDetails}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
        <button
          onClick={() => onToggleSelect(song.id)}
          className={`p-2 rounded-full ${
            song.selected 
              ? 'bg-yellow-400 text-yellow-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={song.selected ? t.deselectSong : t.selectSong}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SimpleSongCard;
