import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Automatically trigger search while typing
    if (e.target.value) {
      navigate(`/searchresults?query=${encodeURIComponent(e.target.value)}`);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      // Navigate to the search results page with the search term as a query parameter
      navigate(`/searchresults?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo"></div>
          <span className="brand-name">UrbanThreads</span>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search For Clothes"
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange} // Automatically triggers search on change
            onKeyDown={handleSearchKeyDown} // Handles Enter key press
          />
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <div className="navbar-right">
          <Link className="signin-button" to="/login">Login</Link>
          <Link to="/cart" className="cart-link">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
