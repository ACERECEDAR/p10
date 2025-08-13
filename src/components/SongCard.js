// src/components/SongCard.jsx
// src/components/SongCard.jsx
import React from 'react';
import translations from '../utils/translations';
import { translateCategory } from '../utils/i18n';
import { sanitizeUrl } from '../utils/links';
import { FaSpotify, FaYoutube, FaMusic } from 'react-icons/fa';

export default function SongCard({ song, onToggleSelect, onShowDetail, currentLanguage }) {
  const tLangs = translations[currentLanguage]?.languages || {};
  if (!song) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 ring-2 ring-yellow-400">
      <div className="flex items-start justify-between gap-4">
        {/* Título + chips */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl font-bold text-gray-900 cursor-pointer hover:text-gray-700"
            onClick={() => onShowDetail && onShowDetail(song)}
          >
            {song.title}
          </h3>

          {/* Chips: categoría (gris) + idioma (amarillo) */}
          <div className="flex flex-wrap gap-2 mt-2">
            {song.category && (
              <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600">
                {translateCategory(song.category, currentLanguage)}
              </span>
            )}
       {song.language && (
  <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 text-xs font-medium">
    {tLangs[song.language] || song.language}
  </span>
)}
          </div>

          {/* Enlaces con iconos */}
          <div className="flex flex-wrap gap-2 mt-3">
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

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onShowDetail && onShowDetail(song)}
            className="p-2 text-gray-600 hover:text-black transition-colors"
            title={t.viewDetails}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>

          <button
            onClick={() => onToggleSelect && onToggleSelect(song.id)}
            className="p-2 rounded-full bg-yellow-400 text-yellow-800"
            title={t.deselectSong}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
