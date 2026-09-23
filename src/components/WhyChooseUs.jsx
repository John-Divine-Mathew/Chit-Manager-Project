import React from 'react';
import { ShieldCheck, Zap, Clock, PieChart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const reasonsList = t('whyChooseUs.reasons');
  const reasonsData = Array.isArray(reasonsList) ? reasonsList : [];
  const icons = [Zap, ShieldCheck, Clock, PieChart];

  return (
    <section className="section section-light" id="why-choose-us">
      <div className="container">
        <div className="text-center">
          <div className="badge">{t('whyChooseUs.badge')}</div>
          <h2 className="section-title">{t('whyChooseUs.title')}</h2>
          <p className="section-subtitle">{t('whyChooseUs.subtitle')}</p>
        </div>
        
        <div className="reasons-grid">
          {reasonsData.map((reason, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div key={index} className="reason-card">
                <div className="reason-icon-wrapper">
                  <IconComponent size={24} />
                </div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
