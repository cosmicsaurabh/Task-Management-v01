import React, { useEffect } from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    // Add the modal-open class to the body when the modal is open
    document.body.classList.add('modal-open');
    
    // Remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
