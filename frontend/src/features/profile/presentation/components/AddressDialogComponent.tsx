// components/AddressDialog.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface DialogProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClose: () => void;
}

export const AddressDialog: React.FC<DialogProps> = ({ 
  children, 
  title = "Add Address", 
  className, 
  onClose 
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-6 rounded-lg w-full max-w-md mx-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4 ">
          {children}
        </div>
      </div>
    </div>
  );
};