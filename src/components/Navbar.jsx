import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import langBadge from '../assets/lang-badge.png';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.features'), path: '/features' },
    { name: t('navbar.howItWorks'), path: '/how-it-works' },
    { name: t('navbar.reports'), path: '/reports' },
    { name: t('navbar.contact'), path: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <img src={logoImg} alt={t('navbar.logoAlt')} className="logo-img" />
        </Link>

        <div className="nav-links desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.name}
            </Link>
          ))}
          <div className="lang-switcher" role="group" aria-label="Language selection">
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-label="Switch to English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'ta' ? 'active' : ''}`}
              onClick={() => setLanguage('ta')}
              aria-label="தமிழிற்கு மாற்றவும்"
              aria-pressed={language === 'ta'}
            >
              தமிழ்
            </button>
          </div>
          <Link to="/" className="btn btn-primary nav-btn">{t('navbar.getStarted')}</Link>
        </div>

        <div className="mobile-header-actions">
          <button
            type="button"
            className="mobile-lang-capsule-btn"
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            aria-label={language === 'en' ? 'தமிழிற்கு மாற்றவும்' : 'Switch to English'}
            title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
          >
            <img src={langBadge} alt="Language Switcher" className="mobile-lang-circle-img" />
            <span className="mobile-lang-capsule-label">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
          </button>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/" className="btn btn-primary mobile-nav-btn" onClick={() => setIsOpen(false)}>
            {t('navbar.getStarted')}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
