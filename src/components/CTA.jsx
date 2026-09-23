import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="section cta-section" id="cta">
      <div className="container">
        <div className="cta-box text-center">
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.description')}</p>
          <div className="cta-buttons">
            <button className="btn btn-primary cta-btn">
              {t('cta.startTrial')} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
