import React, { useState } from 'react';
import SheetMusicViewer from './SheetMusicViewer';
import translations from '../utils/translations';
import { sanitizeUrl } from '../utils/links';
import { translateCategory } from '../utils/i18n';

const SongDetailModal = ({ song, onClose, currentLanguage }) => { // Se elimina onEditSong de los props
  const [showSheetMusic, setShowSheetMusic] = useState(false);
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(song.sheetMusicLink);

  const t = translations[currentLanguage] || translations['Español'];

  // Soportar nombres antiguos (…Link) y los normalizados (sin Link)
const spotify   = song.spotify     || song.spotifyLink     || '';
const youtube   = song.youtube     || song.youtubeLink     || '';
const sheetUrl  = song.sheetMusic  || song.sheetMusicLink  || '';

const hasSpotify = !!spotify;
const hasYouTube = !!youtube;
const hasSheet   = !!sheetUrl;
const hasLyrics  = !!song?.lyrics;


  if (!song) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900">{song.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700">
             {translateCategory(song?.category, currentLanguage)}

            </span>
            {song.language && (
              <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700">
                {song.language}
              </span>
            )}
          </div>

          {hasSpotify ? (
  <a
    href={sanitizeUrl(spotify)}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm5.485 17.278a.749.749 0 01-1.03.262c-2.819-1.726-6.366-2.115-10.548-1.16a.75.75 0 11-.33-1.464c4.53-1.022 8.428-.58 11.5 1.318a.75.75 0 01.408 1.044zm1.373-3.062a.938.938 0 01-1.291.327c-3.229-1.922-8.155-2.486-11.973-1.364a.938.938 0 11-.52-1.804c4.266-1.23 9.639-.6 13.334 1.606a.938.938 0 01.45 1.235zm.13-3.212a1.125 1.125 0 01-1.548.392c-3.695-2.243-9.333-2.446-12.688-1.34a1.125 1.125 0 01-.69-2.15c3.9-1.253 10.183-1.01 14.393 1.545a1.125 1.125 0 01.533 1.553z"/></svg>
    {t.listenOnSpotify}
  </a>
) : (
  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm5.485 17.278a.749.749 0 01-1.03.262c-2.819-1.726-6.366-2.115-10.548-1.16a.75.75 0 11-.33-1.464c4.53-1.022 8.428-.58 11.5 1.318a.75.75 0 01.408 1.044zm1.373-3.062a.938.938 0 01-1.291.327c-3.229-1.922-8.155-2.486-11.973-1.364a.938.938 0 11-.52-1.804c4.266-1.23 9.639-.6 13.334 1.606a.938.938 0 01.45 1.235zm.13-3.212a1.125 1.125 0 01-1.548.392c-3.695-2.243-9.333-2.446-12.688-1.34a1.125 1.125 0 01-.69-2.15c3.9-1.253 10.183-1.01 14.393 1.545a1.125 1.125 0 01.533 1.553z"/></svg>
    {t.listenOnSpotify}
  </button>
)}

           {hasYouTube ? (
  <a
    href={sanitizeUrl(youtube)}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.004 3.004 0 00-2.117-2.123C19.633 3.5 12 3.5 12 3.5s-7.633 0-9.381.563A3.004 3.004 0 00.502 6.186C0 7.94 0 12 0 12s0 4.06.502 5.814a3.004 3.004 0 002.117 2.123C4.367 20.5 12 20.5 12 20.5s7.633 0 9.381-.563a3.004 3.004 0 002.117-2.123C24 16.06 24 12 24 12s0-4.06-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    {t.watchOnYouTube}
  </a>
) : (
  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.004 3.004 0 00-2.117-2.123C19.633 3.5 12 3.5 12 3.5s-7.633 0-9.381.563A3.004 3.004 0 00.502 6.186C0 7.94 0 12 0 12s0 4.06.502 5.814a3.004 3.004 0 002.117 2.123C4.367 20.5 12 20.5 12 20.5s7.633 0 9.381-.563a3.004 3.004 0 002.117-2.123C24 16.06 24 12 24 12s0-4.06-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    {t.watchOnYouTube}
  </button>
)}
{hasSheet ? (
  <a
    href={sanitizeUrl(sheetUrl)}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2a2 2 0 00-2 2v16l6-3 6 3V4a2 2 0 00-2-2H6z"/></svg>
    {t.viewSheetMusic}
  </a>
) : (
  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2a2 2 0 00-2 2v16l6-3 6 3V4a2 2 0 00-2-2H6z"/></svg>
    {t.viewSheetMusic}
  </button>
)}


          {song.lyrics && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.lyricsTitle}</h3>
              <pre className="whitespace-pre-wrap font-sans text-gray-700 text-base bg-gray-50 p-4 rounded-lg border border-gray-200">
                {song.lyrics}
              </pre>
            </div>
          )}
        </div>

        {/* Se elimina el botón de edición del modal */}
        {/* <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => onEditSong(song)}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            {t.editSongButton}
          </button>
        </div> */}
      </div>

      {showSheetMusic && (
        <SheetMusicViewer 
          fileUrl={song.sheetMusicLink} 
          onClose={() => setShowSheetMusic(false)} 
        />
      )}
    </div>
  );
};

export default SongDetailModal;