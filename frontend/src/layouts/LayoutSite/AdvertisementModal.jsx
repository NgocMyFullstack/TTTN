import React from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import "./AdvertisementModal.css";

Modal.setAppElement("#root");

export default function AdvertisementModal({ isOpen, onClose }) {
  const location = useLocation();

  // Kiểm tra nếu không phải đường dẫn http://localhost:3000/ thì không render modal
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="advertisement-modal"
      overlayClassName="advertisement-overlay"
    >
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <video className="advertisement-video" autoPlay muted loop>
          <source src="/video3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  );
}
