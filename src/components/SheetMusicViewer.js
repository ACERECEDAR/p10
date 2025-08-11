import React from 'react';

const SheetMusicViewer = ({ fileUrl, onClose }) => {
  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Partitura Completa</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="bg-white p-2 rounded-lg overflow-auto h-full max-h-[80vh]">
          {isImage ? (
            <img 
              src={fileUrl} 
              alt="Partitura"
              className="w-full h-auto"
            />
          ) : (
            <embed 
              src={fileUrl} 
              type="application/pdf" 
              className="w-full h-[75vh]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SheetMusicViewer;