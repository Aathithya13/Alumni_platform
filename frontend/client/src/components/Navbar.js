import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">AlumniConnect</div>
      
      {/* Toggle button */}
      <div className={`navbar__toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="navbar__toggle-icon"></span>
        <span className="navbar__toggle-icon"></span>
        <span className="navbar__toggle-icon"></span>
      </div>

      <nav className={`navbar__menu ${isOpen ? 'active' : ''}`}>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/alumnidashboard" className="navbar__link">Home</Link>
          </li>
          <li className="navbar__item">
            <Link to="/alumniprofile" className="navbar__link">Profile</Link>
          </li>
          <li className="navbar__item">
            <Link to="/alumniposts" className="navbar__link">Posts</Link>
          </li>
          <li className="navbar__item">
            <Link to="/donation" className="navbar__link">Donation</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
