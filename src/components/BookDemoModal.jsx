import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/constants';

const BookDemoModal = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobileNumber: '',
    activeGroups: ''
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
        mobileNumber: '',
        activeGroups: ''
      });
      setErrors({});
      setIsSubmitted(false);
      setIsSubmitting(false);
    }, 300);
  }, [onClose]);

  // Close on Escape key and handle body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
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

    if (!formData.activeGroups) {
      newErrors.activeGroups = t('bookDemo.validation.activeGroups');
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
    if (language === 'ta') {
      return `வணக்கம் ChitManager குழுவினருக்கு,\n\nChitManager மென்பொருளுக்கான தனிப்பயன் டெமோவை முன்பதிவு செய்ய விரும்புகிறேன்.\n\nபெயர்: ${formData.fullName}\nவணிகம் / சீட்டு நிதி: ${formData.businessName}\nமொபைல் / WhatsApp: ${formData.mobileNumber}\nசெயலில் உள்ள சீட்டு குழுக்கள்: ${formData.activeGroups}\n\nChitManager பற்றிய கூடுதல் தகவல்களை அறிந்து, எனக்கு ஏற்ற டெமோ நேரத்தை திட்டமிட விரும்புகிறேன்.\n\nநன்றி.`;
    }

    return `Hello ChitManager Team,\n\nI would like to book a personalized demo.\n\nName: ${formData.fullName}\nBusiness / Chit Fund: ${formData.businessName}\nMobile / WhatsApp: ${formData.mobileNumber}\nActive Chit Groups: ${formData.activeGroups}\n\nI would like to know more about ChitManager and schedule a suitable demo time.\n\nThank you.`;
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  const activeGroupOptions = t('bookDemo.activeGroupOptions');
  const optionsList = Array.isArray(activeGroupOptions) ? activeGroupOptions : ['1–5', '6–20', '20+'];

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
                    {t('bookDemo.fullName')} <span className="text-danger">*</span>
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
                    {t('bookDemo.businessName')} <span className="text-danger">*</span>
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
                <div className="demo-field-group">
                  <label htmlFor="demo-mobile">
                    {t('bookDemo.mobile')} <span className="text-danger">*</span>
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

                {/* Number of Active Chit Groups */}
                <div className="demo-field-group">
                  <label htmlFor="demo-active-groups">
                    {t('bookDemo.activeGroups')} <span className="text-danger">*</span>
                  </label>
                  <select
                    id="demo-active-groups"
                    className={`demo-select ${errors.activeGroups ? 'has-error' : ''}`}
                    value={formData.activeGroups}
                    onChange={(e) => handleInputChange('activeGroups', e.target.value)}
                  >
                    <option value="">{t('bookDemo.activeGroupsPlaceholder')}</option>
                    {optionsList.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.activeGroups && <span className="field-error-msg">{errors.activeGroups}</span>}
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
