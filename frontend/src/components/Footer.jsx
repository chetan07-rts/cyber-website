import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-title">Gov<span className="logo-dot">.</span>in</h3>
            <p className="footer-text">
              {t('footer.about_text')}
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.quick_links')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('navbar.home')}</Link></li>
              <li><Link to="/about">{t('navbar.about')}</Link></li>
              <li><Link to="/awareness">{t('navbar.awareness')}</Link></li>
              <li><Link to="/report">{t('navbar.report_threat')}</Link></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">{t('footer.contact_info')}</h4>
            <ul className="footer-contact">
              <li>{t('footer.hq')}</li>
              <li>{t('footer.toll_free')}</li>
              <li>{t('footer.email')}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} National Cyber Security Protection Portal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
