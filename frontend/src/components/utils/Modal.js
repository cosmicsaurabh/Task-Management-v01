import React, { useEffect } from "react";
// import './styles'; // Assuming you create a Modal.css for styling
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    // //console.log('Component rendered');
    return () => {
      // //console.log('Component unmounted');
    };
  }, []);

  return (
    // <div className='App' onBlur={4} >
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
    // </div>
  );
};

export default Modal;
