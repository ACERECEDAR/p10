import React from 'react';

const SongModal = ({ content, type, onClose }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">
            {type === 'lyrics' ? 'Letra del canto' : 'Partitura'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {type === 'lyrics' ? (
            <pre className="whitespace-pre-wrap font-sans text-lg">{content}</pre>
          ) : (
            <embed 
              src={content} 
              type="application/pdf" 
              className="w-full min-h-[70vh]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SongModal;