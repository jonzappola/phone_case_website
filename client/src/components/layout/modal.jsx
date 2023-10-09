// Modal.jsx
import React from 'react';
import '../../styles/modal.css'; 

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;