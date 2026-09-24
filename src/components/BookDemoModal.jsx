import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/constants';

const BookDemoModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
    // Delay resetting form state so exit transition is seamless
    setTimeout(() => {
      setFormData({
        fullName: '',
        businessName: '',
        mobileNumber: ''
      });
      setErrors({});
      setIsSubmitted(false);
      setIsSubmitting(false);
    }, 300);
  }, [onClose]);

  // Close on Escape key and lock background scroll completely
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Freeze background scroll
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [isOpen, handleClose]);

  const handleInputChange = (field, value) => {
    if (field === 'mobileNumber') {
      // Allow only numbers, max 10 digits
      const sanitized = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [field]: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Clear error for this field on edit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('bookDemo.validation.fullName');
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = t('bookDemo.validation.businessName');
    }

    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = t('bookDemo.validation.mobile');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Smooth 500ms transition to success card
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const getWhatsAppMessage = () => {
    return `*New Demo Request | Chit Master Pro*

Hello Chit Master Pro Team,

I would like to request a demo of the Chit Master Pro software.

*Business Details:*
• *Full Name:* ${formData.fullName}
• *Business / Chit Fund:* ${formData.businessName}
• *Mobile / WhatsApp:* ${formData.mobileNumber}

Kindly send the credentials of the software.
When is a good time to connect with the team of Chit Master Pro?

Regards,
*${formData.fullName}*`;
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  if (!isOpen) return null;

  return (
    <div 
      className="book-demo-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-demo-title"
    >
      <div className="book-demo-modal">
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          aria-label={t('bookDemo.closeAria')}
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="modal-header">
              <div className="modal-icon-badge">
                <Calendar size={22} />
              </div>
              <h3 id="book-demo-title" className="modal-title">
                {t('bookDemo.modalTitle')}
              </h3>
              <p className="modal-subtitle">
                {t('bookDemo.modalSubtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="demo-form" noValidate>
              <div className="demo-form-grid">
                {/* Full Name */}
                <div className="demo-field-group">
                  <label htmlFor="demo-full-name">
                    <span>{t('bookDemo.fullName')}</span>&nbsp;<span className="text-danger">*</span>
                  </label>
                  <input
                    id="demo-full-name"
                    type="text"
                    className={`demo-input ${errors.fullName ? 'has-error' : ''}`}
                    placeholder={t('bookDemo.fullNamePlaceholder')}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                  {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
                </div>

                {/* Business / Chit Fund Name */}
                <div className="demo-field-group">
                  <label htmlFor="demo-business-name">
                    <span>{t('bookDemo.businessName')}</span>&nbsp;<span className="text-danger">*</span>
                  </label>
                  <input
                    id="demo-business-name"
                    type="text"
                    className={`demo-input ${errors.businessName ? 'has-error' : ''}`}
                    placeholder={t('bookDemo.businessNamePlaceholder')}
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                  />
                  {errors.businessName && <span className="field-error-msg">{errors.businessName}</span>}
                </div>

                {/* Mobile / WhatsApp Number */}
                <div className="demo-field-group full-width">
                  <label htmlFor="demo-mobile">
                    <span>{t('bookDemo.mobile')}</span>&nbsp;<span className="text-danger">*</span>
                  </label>
                  <input
                    id="demo-mobile"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    className={`demo-input ${errors.mobileNumber ? 'has-error' : ''}`}
                    placeholder={t('bookDemo.mobilePlaceholder')}
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  />
                  {errors.mobileNumber && <span className="field-error-msg">{errors.mobileNumber}</span>}
                </div>
              </div>

              <div className="demo-modal-footer">
                <button 
                  type="submit" 
                  className="btn btn-primary demo-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>{t('bookDemo.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('bookDemo.submitButton')}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="demo-success-card">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} className="text-primary" />
            </div>

            <h3 className="success-title">
              {t('bookDemo.success.title')}
            </h3>

            <p className="success-message">
              {t('bookDemo.success.message')}
            </p>

            <p className="success-description">
              {t('bookDemo.success.description')}
            </p>

            <div className="success-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={20} />
                <span>{t('bookDemo.success.continueWhatsApp')}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDemoModal;
