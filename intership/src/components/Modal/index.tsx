"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Функція для закриття модалки при кліку на фон
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Перевірка, чи клік був на фоні, а не на модалці
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick} // обробка кліку на фон
    >
      <div
        className="bg-gray-100 rounded-lg shadow-lg p-6 relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // запобігає закриттю при кліку всередині модалки
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
