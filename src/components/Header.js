// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Create a new CSS file for header-specific styles

const Header = () => {
  return (
    <div className="header-container">
      <h1>CREATORVERSE</h1>
      <div className="header-buttons">
        <Link to="/" className="view-button">VIEW ALL CREATORS</Link>
        <Link to="/new" className="add-button">ADD A CREATOR</Link>
      </div>
    </div>
  );
};

export default Header;
