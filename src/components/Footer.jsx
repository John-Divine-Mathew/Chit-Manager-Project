import React from 'react';
import { Globe, MessageCircle, Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo">
            <img src={logoImg} alt={t('footer.logoAlt')} className="logo-img" />
          </div>
          <p className="footer-desc">
            {t('footer.description')}
          </p>
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Chat"><MessageCircle size={18} /></a>
            <a href="#" aria-label="Share"><Share2 size={18} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>{t('footer.product')}</h4>
            <Link to="/features">{t('footer.features')}</Link>
            <Link to="/reports">{t('footer.reports')}</Link>
            <Link to="/">{t('footer.security')}</Link>
            <Link to="/">{t('footer.pricing')}</Link>
          </div>
          <div className="link-group">
            <h4>{t('footer.company')}</h4>
            <Link to="/">{t('footer.aboutUs')}</Link>
            <Link to="/">{t('footer.careers')}</Link>
            <Link to="/">{t('footer.blog')}</Link>
            <Link to="/contact">{t('footer.contact')}</Link>
          </div>
          <div className="link-group">
            <h4>{t('footer.legal')}</h4>
            <Link to="/">{t('footer.privacyPolicy')}</Link>
            <Link to="/">{t('footer.termsOfService')}</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        <div className="contact-info">
          <Mail size={16} />info@mediawavetech.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
