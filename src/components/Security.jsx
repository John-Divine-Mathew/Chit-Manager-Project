import React from 'react';
import { Lock, UserCheck, Shield, Activity, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Security = () => {
  const { t } = useLanguage();

  const securityIcons = [
    Lock,
    UserCheck,
    Shield,
    Activity,
    Database
  ];

  const featuresList = t('security.features');
  const features = Array.isArray(featuresList) ? featuresList : [];

  return (
    <section className="section section-light" id="security">
      <div className="container text-center">
        <div className="badge">{t('security.badge')}</div>
        <h2 className="section-title">{t('security.title')}</h2>
        <p className="section-subtitle">{t('security.subtitle')}</p>
        
        <div className="security-badges">
          {features.map((featName, idx) => {
            const IconComponent = securityIcons[idx % securityIcons.length];
            return (
              <div key={idx} className="security-badge-item">
                <div className="security-icon"><IconComponent size={20} /></div>
                <span>{featName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Security;
