import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ImageModal({ isOpen, onClose, imageUrl }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-4xl mx-auto mt-10 bg-white rounded-lg p-2 relative z-[60]"
      overlayClassName="fixed inset-0 bg-black/90 z-50"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt="Full view"
          className="max-h-[80vh] max-w-[90vw] object-contain mx-auto"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
        >
          &times;
        </button>
      </div>
    </Modal>
  );
}

export default ImageModal;