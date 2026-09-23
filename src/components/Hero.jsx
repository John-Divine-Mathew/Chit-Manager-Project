import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Users, Award } from 'lucide-react';
import heroImg from '../assets/hero image.png';
import { useLanguage } from '../context/LanguageContext';
import { useDemoModal } from '../context/useDemoModal';

const Hero = () => {
  const { t } = useLanguage();
  const { openDemoModal } = useDemoModal();

  const renderMultiLine = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        {idx < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <section className="hero" id="home" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#e9f7f1' }}>
      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <div className="badge animate-fade-in-up">{t('hero.badge')}</div>
          <h1 className="hero-title animate-fade-in-up delay-100">
            {t('hero.titleLine1')} <br/>
            <span className="text-primary">{t('hero.titleLine2')}</span>
          </h1>
          <p className="hero-description animate-fade-in-up delay-200">
            {t('hero.description')}
          </p>
          <div className="hero-buttons animate-fade-in-up delay-300">
            <a href="#cta" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '999px', fontSize: '1rem', fontWeight: '600' }}>
               {t('hero.getStarted')} <ArrowRight size={18} />
            </a>
            <button
              type="button"
              onClick={openDemoModal}
              className="btn btn-outline"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '999px', fontSize: '1rem', fontWeight: '600', backgroundColor: 'white', color: '#0f172a', borderColor: '#e2e8f0', cursor: 'pointer' }}
            >
               {t('hero.requestDemo')}
            </button>
          </div>

          <div className="hero-features animate-fade-in-up delay-400">
            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <ShieldCheck size={22} />
              </div>
              <span>
                {renderMultiLine(t('hero.features.secure'))}
              </span>
            </div>
            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Zap size={22} />
              </div>
              <span>
                {renderMultiLine(t('hero.features.processing'))}
              </span>
            </div>
            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Users size={22} />
              </div>
              <span>
                {renderMultiLine(t('hero.features.management'))}
              </span>
            </div>
            <div className="hero-feature-item">
              <div className="hero-feature-icon">
                <Award size={22} />
              </div>
              <span>
                {renderMultiLine(t('hero.features.platform'))}
              </span>
            </div>
          </div>
        </div>
        <div className="animate-fade-in-up delay-400 hero-preview-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={heroImg} alt={t('hero.previewAlt')} className="hero-mockup-img" style={{ maxWidth: '100%', maxHeight: '480px', height: 'auto', width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
