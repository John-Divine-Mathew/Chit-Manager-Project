import React from 'react';
import howItWorksImg from '../assets/how-it-works.jpg';
import { useLanguage } from '../context/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();

  const stepsList = t('howItWorks.steps');
  const steps = Array.isArray(stepsList) ? stepsList : [];

  return (
    <section className="section section-light page-section" id="how-it-works" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      {/* Decorative curved background */}
      <div className="how-it-works-bg-curve"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="how-it-works-grid">
          <div className="how-it-works-content">
            <div className="badge">{t('howItWorks.badge')}</div>
            <h2 className="section-title" style={{ textAlign: 'left', marginTop: '1rem' }}>{t('howItWorks.title')}</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>{t('howItWorks.subtitle')}</p>
            
            <div className="steps-container">
              {steps.map((step, index) => (
                <div key={index} className={`step-card step-card-${index + 1}`}>
                  <div className="step-number">{step.number}</div>
                  <div className="step-info">
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-desc">{step.desc || step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="how-it-works-image">
            <img src={howItWorksImg} alt={t('howItWorks.imageAlt')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
