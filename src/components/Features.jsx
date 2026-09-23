import React from 'react';
import { 
  Users, FolderGit2, CalendarCheck, IndianRupee, 
  Gavel, AlertTriangle, FileText, Bell, BarChart2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const featureIcons = [
    FolderGit2,
    Users,
    CalendarCheck,
    IndianRupee,
    Gavel,
    AlertTriangle,
    FileText,
    Bell,
    BarChart2
  ];

  const featureNames = t('features.items');
  const items = Array.isArray(featureNames) ? featureNames : [];

  return (
    <section className="section page-section" id="features">
      <div className="container">
        <div className="text-center">
          <div className="badge">{t('features.badge')}</div>
          <h2 className="section-title">{t('features.title')}</h2>
          <p className="section-subtitle">{t('features.subtitle')}</p>
        </div>
        
        <div className="features-grid">
          {items.map((name, idx) => {
            const IconComponent = featureIcons[idx % featureIcons.length];
            return (
              <div key={idx} className="feature-item">
                <div className="feature-icon"><IconComponent /></div>
                <h4 className="feature-name">{name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
