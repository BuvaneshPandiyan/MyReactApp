import React, { useState } from 'react';
import './Footer.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-logo"></div>
          <span className="footer-brand-name">UrbanThreads</span>
        </div>
        
        <div className="footer-links">
          <Link to="/aboutus" className="footer-link" role="button">About Me</Link>  
          <button className="footer-link contact-button" onClick={toggleModal}>Contact Me</button>
          <a href="#privacy" className="footer-link">Privacy Policy</a>
        </div>
        
        <div className="footer-right">
          <span>&copy; 2024 UrbanThreads. All rights reserved.</span>
        </div>
      </footer>

      {/* Modal Section */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Contact Me</h2>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> Email: 
              <a href="mailto:buvaneshpandiyandurai@gmail.com"> buvaneshpandiyandurai@gmail.com</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp: 
              <a href="https://wa.me/7338816479" target="_blank" rel="noopener noreferrer"> +91 7338816479</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faInstagram} /> Instagram: 
              <a href="https://www.instagram.com/buvaneshwarx" target="_blank" rel="noopener noreferrer"> @buvaneshwarx</a>
            </p>
            <button className="close-button" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
