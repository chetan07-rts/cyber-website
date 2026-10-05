import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-brand-container">
          <Link to="/" className="brand-link">
            <div className="banner-wrapper">
              <img src="/logo.png" alt="Official Government Portal" className="official-banner" />
              <div className="brand-text-wrapper">
                <div className="brand-text-hindi">राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल</div>
                <div className="brand-text-english">National Cyber Crime Reporting Portal</div>
              </div>
            </div>
          </Link>
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsOpen(false)}>{t('navbar.home')}</Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setIsOpen(false)}>{t('navbar.about')}</Link>
          <Link to="/awareness" className={`nav-link ${isActive('/awareness')}`} onClick={() => setIsOpen(false)}>{t('navbar.awareness')}</Link>
          <Link to="/track" className={`nav-link ${isActive('/track')}`} onClick={() => setIsOpen(false)}>{t('navbar.track_complaint')}</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setIsOpen(false)}>{t('navbar.contact')}</Link>
          <Link to="/report" className="nav-link btn btn-primary report-btn" onClick={() => setIsOpen(false)}>
            {t('navbar.report_threat')}
          </Link>

          <div className="nav-controls">
            <button className="control-btn" onClick={toggleTheme} title="Toggle Theme">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button className="control-btn" onClick={() => toggleLanguage(language === 'en' ? 'hi' : 'en')} title="Toggle Language">
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
          </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isOpen ? 'active' : ''}`}></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
