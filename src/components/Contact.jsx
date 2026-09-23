import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import contactImg from '../assets/contact-image.png';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="section section-light page-section" id="contact" style={{ position: 'relative', backgroundColor: '#f8fafc' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-banner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', marginBottom: '2rem', padding: '0 0 1rem 0' }}>
          <div className="contact-banner-content">
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', lineHeight: 1.1, color: '#0f172a', marginBottom: '1.25rem' }}>
              {t('contact.titlePrefix')} <br/>
              {t('contact.titleWith')} <span style={{ color: 'var(--primary-color)' }}>{t('contact.titleBrand')}</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '450px', lineHeight: 1.6 }}>
              {t('contact.subtitle')}
            </p>
          </div>
          <div className="contact-banner-image" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={contactImg} alt={t('contact.agentAlt')} className="slide-in-right" style={{ maxWidth: '100%', height: 'auto', maxHeight: '420px', borderRadius: '12px' }} />
          </div>
        </div>
        
        <div className="contact-grid">
          
          <div className="contact-form-card contact-info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="contact-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="contact-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '1rem', borderRadius: '0.75rem' }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>{t('contact.callUs')}</h4>
                <p>+91  63691 53235</p>
                <p>{t('contact.callTime')}</p>
              </div>
            </div>
            
            <div className="contact-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="contact-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '1rem', borderRadius: '0.75rem' }}>
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>{t('contact.emailUs')}</h4>
                <p>info@mediawavetech.com</p>
              </div>
            </div>
            
            <div className="contact-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="contact-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '1rem', borderRadius: '0.75rem' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>{t('contact.visitUs')}</h4>
                <p>{t('contact.addressLine1')}</p>
                <p>{t('contact.addressLine2')}</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-card">
            <form onSubmit={(e) => e.preventDefault()} className="contact-form">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>{t('contact.fullName')}</label>
                <input type="text" placeholder={t('contact.namePlaceholder')} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>{t('contact.emailAddress')}</label>
                <input type="email" placeholder={t('contact.emailPlaceholder')} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>{t('contact.message')}</label>
                <textarea placeholder={t('contact.messagePlaceholder')} rows="4" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', outline: 'none', resize: 'none' }}></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{t('contact.sendMessage')}</button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
