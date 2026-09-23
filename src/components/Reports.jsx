import React from 'react';
import { FileBarChart } from 'lucide-react';
import reportsImg from '../assets/reports-image.jpg';
import { useLanguage } from '../context/LanguageContext';

const Reports = () => {
  const { t } = useLanguage();

  const reports = t('reports.items');
  const reportsList = Array.isArray(reports) ? reports : [];

  return (
    <section className="section" id="reports">
      <div className="container">
        <div className="reports-layout">
          <div className="reports-content">
            <div className="badge">{t('reports.badge')}</div>
            <h2 className="section-title">{t('reports.title')}</h2>
            <p className="section-subtitle" style={{marginLeft: 0}}>
              {t('reports.subtitle')}
            </p>
            
            <ul className="reports-list">
              {reportsList.map((item, idx) => (
                <li key={idx}>
                  <FileBarChart className="text-primary" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="reports-visual">
            <img src={reportsImg} alt={t('reports.imageAlt')} className="slide-in-right" style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
