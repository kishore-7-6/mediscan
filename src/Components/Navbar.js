import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the menu icons
import '../App.css';
import '../i18n'; // Assuming you have i18n configuration elsewhere
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import icon from "../Images/ic6.png";

const languages = [
  { value: 'en', text: 'English' },
  { value: 'hi', text: 'Hindi' },
  { value: 'kn', text: 'Kannada' },
  { value: 'ml', text: 'Malayalam' },
  { value: 'ta', text: 'Tamil' },
  { value: 'te', text: 'Telugu' },
  { value: 'ur', text: 'Urdu' },
];

const Navbar = ({ onLanguageChange }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/close
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const navigate = useNavigate();

  const changeLanguage = (value) => {
    onLanguageChange(value);
    i18n.changeLanguage(value)
      .then(() => {
        setCurrentLanguage(value);
        navigate();
      })
      .catch(err => console.log(err));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  // Function to handle link click and close sidebar
  const handleLinkClick = () => {
    setMenuOpen(false); // Close sidebar on link click
  };

  return (
    <div className="main-header">
      <div className="main-header-container">
        <div className="logo-container">
          <Link to="/mediscan" className="logo-link">
            <img src={icon} alt="Icon" className="logo-icon" />
            <h6 className="title">{t('MediScan')}</h6>
          </Link>
        </div>

        {/* Hamburger menu icon */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" style={{ color: 'white' }} />
        </div>

        {/* Navigation links */}
        <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/mediscan" onClick={handleLinkClick}>{t('Home')}</Link>
          <Link to="/Search" onClick={handleLinkClick}>{t('Search')}</Link>
          <Link to="/Feedback" onClick={handleLinkClick}>{t('Feedback')}</Link>
          <Link to="/Account" onClick={handleLinkClick}>{t('Account')}</Link>
          {/* Language dropdown (modify as needed based on your implementation) */}
          <div className="language-dropdown" onClick={toggleLanguageMenu}>
            <FontAwesomeIcon icon={faGlobe} size="2x" style={{ color: 'white', marginRight: '5px' }} />
            {currentLanguage.toUpperCase()}
            {languageMenuOpen && (
              <div className="language-options">
                {languages.map((item) => (
                  <div key={item.value} onClick={() => changeLanguage(item.value)}>
                    {item.value.toUpperCase()} - {item.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
