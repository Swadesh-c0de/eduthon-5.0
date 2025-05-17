import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaBriefcase, FaBuilding, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const RegisterPage = () => {
  const { type = 'interest' } = useParams();
  const formType = type === 'sponsor' ? 'sponsor' : 'interest';
  const navigate = useNavigate();
  const formRef = useRef(null);
  
  // Create refs for each input field
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    role: useRef(null),
    organization: useRef(null),
    city: useRef(null),
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    organization: '',
    city: '',
  });
  
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1); // Added step state for multi-step form
  
  // Initialize form with animation
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);
  
  // Maintain focus on inputs when typing
  useEffect(() => {
    if (focusedField && inputRefs[focusedField]?.current) {
      const input = inputRefs[focusedField].current;
      input.focus();
      
      // Set cursor position to the end of input - only for text inputs
      // Email inputs don't support setSelectionRange in all browsers
      const length = input.value.length;
      
      try {
        // Only use setSelectionRange for supported input types
        if (input.type !== 'email' && input.setSelectionRange) {
          setTimeout(() => {
            input.setSelectionRange(length, length);
          }, 0);
        }
      } catch (error) {
        console.log('Selection range not supported for this input type');
      }
    }
  }, [formData, focusedField]);
  
  // Form validation
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'role':
        if (!value.trim()) error = 'Role is required';
        break;
      case 'organization':
        if (!value.trim()) error = 'Organization is required';
        break;
      case 'city':
        if (!value.trim()) error = 'City is required';
        break;
      default:
        break;
    }
    
    return error;
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };
  
  // Handle input focus
  const handleFocus = (name) => {
    setFocusedField(name);
  };
  
  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Add small delay to prevent losing focus when clicking within the same input
    setTimeout(() => {
      setFocusedField(null);
    }, 100);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If on first step of form, validate first step fields and move to next
    if (step === 1) {
      const firstStepFields = ['name', 'email'];
      let hasErrors = false;
      
      let formErrors = {...errors};
      
      firstStepFields.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          formErrors[field] = error;
          hasErrors = true;
        }
      });
      
      setErrors(formErrors);
      setTouched(prev => ({
        ...prev,
        name: true,
        email: true
      }));
      
      if (hasErrors) return;
      
      // Move to step 2
      setStep(2);
      return;
    }
    
    // Validate all fields
    let formErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        formErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(formErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (!isValid) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.input-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          // Better scrolling for Safari
          inline: 'nearest' 
        });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Disable scroll while submitting to prevent jarring interactions
      document.body.style.overflow = 'hidden';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      
      // Success notification - more mobile-friendly than alert
      const successMessage = document.createElement('div');
      successMessage.className = 'success-notification';
      successMessage.innerHTML = `
        <div class="success-icon">✓</div>
        <div class="success-message">Thank you for your interest!</div>
        <div class="success-subtitle">We will get back to you soon.</div>
      `;
      document.body.appendChild(successMessage);
      
      // Animate in
      setTimeout(() => {
        successMessage.classList.add('visible');
      }, 10);
      
      // Remove after delay and navigate
      setTimeout(() => {
        successMessage.classList.remove('visible');
        setTimeout(() => {
          document.body.removeChild(successMessage);
          document.body.style.overflow = '';
          navigate('/');
        }, 300);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      document.body.style.overflow = '';
    }
  };
  
  // Go back to previous step
  const handlePrevStep = () => {
    setStep(1);
  };
  
  // Input field component
  const InputField = ({ name, label, icon, type = 'text' }) => (
    <div className={`input-group ${errors[name] ? 'input-error' : ''}`}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      
      <div className="input-wrapper">
        <span className="input-icon">{icon}</span>
        <input
          type={type}
          id={name}
          name={name}
          ref={inputRefs[name]}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => handleFocus(name)}
          onBlur={handleBlur}
          className="form-input"
          placeholder={`Enter your ${label.toLowerCase()}`}
          disabled={isSubmitting}
          autoComplete="off"
        />
      </div>
      
      {errors[name] && touched[name] && (
        <p className="error-message">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className={`register-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="background-overlay"></div>
      <div className="background-pattern"></div>
      
      <button 
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Go back to home"
        disabled={isSubmitting}
      >
        <FaArrowLeft />
      </button>
      
      <div className="form-container">
        <div className="form-header">
          <div className="logo-container">
            <img src="/logo.png" alt="EDUTHON 5.0" className="logo" />
          </div>
          <h1 className="form-title">
            {formType === 'interest' ? 'Register Your Interest' : 'Become a Sponsor'}
          </h1>
          <p className="form-subtitle">
            Join us for India's premier education summit
          </p>
          
          {/* Step indicators */}
          <div className="step-indicators">
            <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Your Info</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Details</span>
            </div>
          </div>
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="register-form">
          {step === 1 ? (
            <div className="form-step step-1">
              <div className="form-fields">
                <InputField 
                  name="name" 
                  label="Full Name" 
                  icon={<FaUser />} 
                />
                
                <InputField 
                  name="email" 
                  label="Email Address" 
                  icon={<FaEnvelope />} 
                  type="email" 
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-button next-button"
                disabled={isSubmitting}
              >
                <span>Continue</span>
                <span className="arrow-icon">→</span>
              </button>
            </div>
          ) : (
            <div className="form-step step-2">
              <div className="form-fields">
                <InputField 
                  name="role" 
                  label="Your Role" 
                  icon={<FaBriefcase />} 
                />
                
                <InputField 
                  name="organization" 
                  label="Organization" 
                  icon={<FaBuilding />} 
                />
                
                <InputField 
                  name="city" 
                  label="City" 
                  icon={<FaMapMarkerAlt />} 
                />
              </div>
              
              <div className="form-buttons">
                <button 
                  type="button" 
                  className="back-step-button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                >
                  <span className="arrow-icon">←</span>
                  <span>Back</span>
                </button>
                
                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Now</span>
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </div>
              
              <p className="form-disclaimer">
                We respect your privacy and will not share your data with third parties.
              </p>
            </div>
          )}
        </form>
      </div>
      
      <style>
        {`
        /* Base Styles */
        :root {
          --primary-color: #000000;
          --secondary-color: #D4AF37;
          --secondary-light: rgba(212, 175, 55, 0.5);
          --secondary-ultra-light: rgba(212, 175, 55, 0.1);
          --secondary-dark: rgba(182, 149, 35, 0.95);
          --text-light: #FFFFFF;
          --text-muted: rgba(255, 255, 255, 0.6);
          --error-color: #FF5252;
          --success-color: #4CAF50;
          --input-bg: rgba(15, 15, 15, 0.7);
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
          --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.24);
          --border-radius-sm: 4px;
          --border-radius-md: 8px;
          --border-radius-lg: 12px;
          --transition-fast: 0.2s ease;
          --transition-normal: 0.3s ease;
          --transition-slow: 0.5s ease;
          --cubic-bezier: cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        /* Layout and Animation */
        .register-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 1rem 0.75rem;
          position: relative;
          background-color: var(--primary-color);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity var(--transition-normal), transform var(--transition-normal);
          overflow-x: hidden;
        }
        
        .register-container.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), 
                           url("/src/assets/images/hero-bg.jpg");
          background-size: cover;
          background-position: center;
          background-attachment: scroll;
          z-index: -2;
        }
        
        .background-pattern {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle, var(--secondary-ultra-light) 1px, transparent 1px),
            radial-gradient(circle, var(--secondary-ultra-light) 1px, transparent 2px);
          background-size: 30px 30px, 80px 80px;
          background-position: 0 0;
          opacity: 0.25;
          z-index: -1;
          animation: patternMove 30s linear infinite;
        }
        
        @keyframes patternMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 100px;
          }
        }
        
        .back-button {
          position: absolute; /* Changed from fixed to absolute for better positioning */
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: var(--secondary-color);
          border: 2px solid var(--secondary-color);
          width: 44px; /* Minimum tap target size */
          height: 44px; /* Minimum tap target size */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          z-index: 1000; /* Very high z-index to ensure visibility */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(212, 175, 55, 0.1);
          backdrop-filter: blur(8px);
          font-size: 1.1rem;
          transform: translate3d(0,0,0); /* Force hardware acceleration */
        }
        
        .back-button:hover:not(:disabled) {
          transform: translateX(-3px);
          background: rgba(212, 175, 55, 0.15);
          box-shadow: var(--shadow-md);
        }
        
        .back-button:active:not(:disabled) {
          transform: translateX(-1px);
        }
        
        .back-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .form-container {
          width: 100%;
          max-width: 480px;
          background: rgba(8, 8, 8, 0.85);
          backdrop-filter: blur(10px);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.15);
          display: flex;
          flex-direction: column;
          margin: 1rem 0;
          opacity: 0;
          transform: translateY(20px);
          animation: card-slide-up 0.5s var(--cubic-bezier) forwards 0.2s;
        }
        
        .loaded .form-container {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Form Header */
        .form-header {
          padding: 1.75rem 1.25rem 0.75rem;
          text-align: center;
          position: relative;
          background: linear-gradient(to bottom, rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.4), transparent);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          overflow: visible;
        }
        
        .form-header:before {
          content: '';
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent 70%);
          border-radius: 50%;
          z-index: 1;
        }
        
        .logo-container {
          width: 100%;
          position: relative;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }

        .logo-container:after {
          content: '';
          position: absolute;
          width: 40%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
          bottom: -5px;
          left: 30%;
        }
        
        .logo {
          height: 45px;
          display: block;
          filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3));
          animation: gentle-pulse 3s infinite alternate;
          transform: translateY(-5px);
          position: relative;
          z-index: 2;
        }
        
        .form-title {
          color: var(--secondary-color);
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, var(--secondary-color), #E9C767);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .form-subtitle {
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 400;
          max-width: 85%;
          margin: 0 auto 0.5rem;
        }
        
        /* Step indicators */
        .step-indicators {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
          padding-bottom: 0.25rem;
        }
        
        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.6;
          transition: opacity var(--transition-fast);
        }
        
        .step-indicator.active {
          opacity: 1;
        }
        
        .step-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          transition: all var(--transition-normal);
        }
        
        .step-indicator.active .step-number {
          background: var(--secondary-color);
          color: var(--primary-color);
          transform: scale(1.1);
        }
        
        .step-label {
          font-size: 0.7rem;
          color: var(--text-light);
          font-weight: 500;
        }
        
        .step-connector {
          height: 1px;
          width: 50px;
          background: linear-gradient(to right, 
            var(--secondary-color), 
            rgba(212, 175, 55, 0.3)
          );
          margin: 0 0.75rem;
          margin-bottom: 1.25rem;
        }
        
        /* Form Content */
        .register-form {
          padding: 0.75rem 1.25rem 1.5rem;
        }
        
        .form-step {
          animation: fadeIn 0.4s var(--cubic-bezier);
        }
        
        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        
        .input-group {
          position: relative;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          margin-bottom: 0.35rem;
          will-change: transform;
        }
        
        .input-group.input-error .input-wrapper {
          border-color: var(--error-color);
          box-shadow: 0 0 0 1px rgba(255, 82, 82, 0.2);
        }
        
        .input-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--secondary-color);
          margin-bottom: 0.25rem;
          letter-spacing: 0.01em;
          padding-left: 0.1rem;
        }
        
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(15, 15, 15, 0.65);
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: var(--border-radius-md);
          transition: all var(--transition-fast);
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .input-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 0.75rem;
          color: rgba(212, 175, 55, 0.7);
          transition: color var(--transition-fast), transform var(--transition-fast);
          pointer-events: none;
          font-size: 0.85rem;
        }
        
        .form-input {
          width: 100%;
          padding: 0.7rem 0.75rem 0.7rem 2.3rem;
          background: transparent;
          color: var(--text-light);
          border: none;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
          -webkit-appearance: none;
          appearance: none;
          height: 2.6rem;
        }
        
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        
        .form-input:focus {
          outline: none;
        }
        
        .form-input:focus + .input-icon {
          color: var(--secondary-color);
          transform: scale(1.1);
        }
        
        .input-wrapper:hover {
          border-color: var(--secondary-color);
        }
        
        .input-wrapper:focus-within {
          border-color: var(--secondary-color);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
          background: rgba(20, 20, 20, 0.75);
        }
        
        .input-group:focus-within {
          transform: translateY(-2px);
          z-index: 2;
        }
        
        .error-message {
          color: var(--error-color);
          font-size: 0.7rem;
          margin-top: 0.3rem;
          animation: slideIn var(--transition-fast);
          background: rgba(255, 82, 82, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 2px;
          border-left: 2px solid var(--error-color);
          font-weight: 500;
        }
        
        /* Buttons */
        .form-buttons {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        
        .submit-button,
        .back-step-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-weight: 600;
          padding: 0 1rem;
          border: none;
          border-radius: var(--border-radius-md);
          cursor: pointer;
          font-size: 0.85rem;
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.02em;
          height: 2.8rem;
        }
        
        .submit-button {
          background: linear-gradient(135deg, var(--secondary-color), var(--secondary-dark));
          color: var(--primary-color);
          flex: 1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(212, 175, 55, 0.15);
          font-weight: 700;
          letter-spacing: 0.03em;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          font-size: 0.95rem;
          height: 3.2rem;
        }
        
        .next-button {
          margin-top: 1.25rem;
          min-height: 3.2rem;
          width: 100%;
          max-width: none; /* Full width on all devices */
          margin-left: auto;
          margin-right: auto;
          font-weight: 700;
          letter-spacing: 0.03em;
          height: 3.2rem;
          font-size: 0.95rem;
          padding: 0 1.75rem;
        }
        
        .back-step-button {
          background: rgba(30, 30, 30, 0.8);
          color: var(--text-light);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 0 0.75rem;
          min-width: 100px;
        }
        
        .arrow-icon {
          font-size: 1rem;
          font-weight: 700;
          transition: transform var(--transition-fast);
        }
        
        .submit-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: all 0.6s;
        }
        
        .submit-button:hover:not(:disabled):before {
          left: 100%;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }
        
        .submit-button:hover:not(:disabled) .arrow-icon {
          transform: translateX(3px);
        }
        
        .back-step-button:hover:not(:disabled) .arrow-icon {
          transform: translateX(-3px);
        }
        
        .back-step-button:hover:not(:disabled) {
          background: rgba(40, 40, 40, 0.8);
          transform: translateY(-2px);
        }
        
        .submit-button:active:not(:disabled),
        .back-step-button:active:not(:disabled) {
          transform: translateY(1px);
        }
        
        .submit-button.submitting {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.7), rgba(182, 149, 35, 0.7));
          cursor: not-allowed;
        }
        
        .form-disclaimer {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.7rem;
          margin-top: 1rem;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.4rem 0.5rem;
          border-radius: 4px;
          max-width: 90%;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.4;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .spinner {
          display: inline-block;
          width: 1.1rem;
          height: 1.1rem;
          border: 2px solid rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          border-top-color: rgba(0, 0, 0, 0.8);
          animation: spin 0.7s linear infinite;
        }
        
        /* Animations */
        @keyframes gentle-pulse {
          0% {
            filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.2));
          }
          100% {
            filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.4));
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes card-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Desktop styles */
        @media (min-width: 769px) {
          .register-container {
            padding: 1.5rem;
            align-items: center;
          }
          
          .form-container {
            max-width: 560px;
            margin: 2rem 0;
            border-radius: var(--border-radius-lg);
          }
          
          .form-header {
            padding: 2.25rem 2rem 1.25rem;
          }
          
          .form-header:before {
            top: -35px;
            width: 100px;
            height: 100px;
          }
          
          .logo {
            height: 55px;
            margin-bottom: 1.5rem;
            transform: translateY(-10px);
          }
          
          .form-title {
            font-size: 1.5rem;
          }
          
          .form-subtitle {
            font-size: 0.95rem;
          }
          
          .step-indicators {
            margin-top: 1.5rem;
          }
          
          .step-number {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
          }
          
          .step-label {
            font-size: 0.75rem;
          }
          
          .step-connector {
            width: 70px;
          }
          
          .register-form {
            padding: 1.25rem 2rem 2rem;
          }
          
          .form-fields {
            gap: 1rem;
          }
          
          .input-label {
            font-size: 0.85rem;
            margin-bottom: 0.3rem;
          }
          
          .form-input {
            padding: 0.8rem 0.85rem 0.8rem 2.5rem;
            font-size: 0.95rem;
            height: 2.8rem;
          }
          
          .input-icon {
            left: 0.85rem;
            font-size: 0.9rem;
          }
          
          .submit-button,
          .back-step-button {
            height: 3rem;
            font-size: 0.9rem;
          }
          
          .form-disclaimer {
            font-size: 0.75rem;
            max-width: 85%;
          }
        }
        
        /* Smaller laptops and tablets landscape */
        @media (max-width: 768px) {
          .register-container {
            padding: 0.75rem 0.5rem;
            align-items: flex-start;
          }
        }
        
        /* Tablets portrait and phones landscape */
        @media (max-width: 480px) {
          .back-button {
            position: fixed; /* Force fixed position on mobile */
            top: 15px;
            left: 15px;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            z-index: 9999;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
            background: rgba(0, 0, 0, 0.9);
            border-width: 2px;
          }
          
          .form-container {
            padding-top: 10px; /* Add space at top to avoid overlap with back button */
            margin-top: 30px;
          }
          
          .submit-button,
          .back-step-button {
            height: 56px; /* Much larger tap target for mobile */
            padding: 0 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
          }
          
          .next-button {
            height: 56px;
            padding: 0 1.5rem;
            width: 100%;
            font-size: 1rem;
            margin-top: 1.5rem;
            border-radius: 8px;
          }
          
          .form-buttons {
            gap: 12px;
            margin-top: 1.5rem;
            flex-direction: column-reverse; /* Put the primary button on top */
          }
          
          /* Visual separation between buttons */
          .back-step-button {
            background: rgba(30, 30, 30, 0.9);
            border: 1px solid rgba(212, 175, 55, 0.5);
            box-shadow: none;
            color: var(--secondary-color);
          }
          
          .submit-button {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 3px 8px rgba(212, 175, 55, 0.2);
          }
        }
        
        /* Small phones */
        @media (max-width: 360px) {
          .form-header:before {
            top: -20px;
            width: 60px;
            height: 60px;
          }
          
          .logo {
            height: 35px;
            transform: translateY(-8px);
          }
          
          .form-title {
            font-size: 1.1rem;
          }
          
          .step-indicators {
            transform: scale(0.9);
            margin-top: 0.75rem;
          }
          
          .form-buttons {
            /* Already handled in the 480px breakpoint with column-reverse */
            gap: 14px;
            margin: 1.5rem 0 1.25rem;
          }
          
          .back-step-button {
            height: 52px;
            font-size: 0.9rem;
            width: 100%;
            margin-bottom: 0;
            display: flex;
            justify-content: center;
          }
          
          .submit-button {
            height: 56px;
            width: 100%;
            font-size: 1rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(212, 175, 55, 0.2);
          }
          
          .next-button {
            height: 56px;
            padding: 0 1.5rem;
            font-size: 1rem;
            margin-top: 2rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(212, 175, 55, 0.2);
          }
          
          .back-button {
            top: 12px;
            left: 12px;
            width: 48px;
            height: 48px;
            font-size: 1.1rem;
          }
          
          /* Fix form margins on small screens */
          .form-container {
            margin-top: 40px;
          }
          
          /* Extra padding around the form */
          .register-form {
            padding-bottom: 2rem;
          }
        }
        
        /* Fix sticky mobile hover states */
        @media (hover: none) {
          .submit-button:hover:not(:disabled) {
            transform: none;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
          }
          
          .back-button:hover:not(:disabled) {
            transform: none;
          }
        }
        
        /* Success notification */
        .success-notification {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid var(--secondary-color);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          text-align: center;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: all 0.3s ease;
          max-width: 90%;
          width: 320px;
        }
        
        .success-notification.visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        
        .success-icon {
          background: var(--secondary-color);
          color: var(--primary-color);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.8rem;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);
        }
        
        .success-message {
          color: var(--secondary-color);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .success-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        @media (max-width: 480px) {
          .success-notification {
            padding: 1.25rem;
            width: 280px;
          }
          
          .success-icon {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          .success-message {
            font-size: 1.1rem;
          }
          
          .success-subtitle {
            font-size: 0.8rem;
          }
        }
        
        /* iOS specific fixes */
        @supports (-webkit-touch-callout: none) {
          .background-overlay {
            background-attachment: scroll;
          }
          
          input, select, textarea, button {
            font-size: 16px !important; /* Prevents zoom on input focus */
          }
          
          .input-wrapper, .submit-button, .back-step-button {
            -webkit-appearance: none;
            border-radius: var(--border-radius-md) !important; /* Ensure border-radius works on iOS */
          }
          
          /* Fix iOS button rendering */
          .submit-button, .back-button, .back-step-button {
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Enhance scrolling */
          .register-container {
            -webkit-overflow-scrolling: touch;
          }
          
          /* Back button specific iOS fixes */
          .back-button {
            -webkit-appearance: none;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4) !important;
            position: fixed !important;
            background: rgba(0, 0, 0, 0.85) !important;
          }
          
          /* Submit button fixes for iOS */
          .submit-button {
            -webkit-appearance: none;
            border-radius: 10px !important;
          }
          
          /* Add slightly more padding for iOS keyboard */
          @media (max-width: 480px) {
            .form-container {
              margin-bottom: 2rem;
              margin-top: 60px !important; /* Ensure space for back button */
            }
            
            .form-disclaimer {
              padding-bottom: 0.75rem;
            }
            
            /* Much better tap targets for iOS */
            .back-button {
              min-height: 54px !important; /* Extra large tap target for iOS */
              min-width: 54px !important;
              top: env(safe-area-inset-top, 15px) !important;
              left: env(safe-area-inset-left, 15px) !important;
              font-size: 1.25rem !important;
              border-width: 2px !important;
            }
            
            .submit-button,
            .back-step-button {
              min-height: 56px !important; /* Larger tap targets for important actions */
              padding-top: 0.25rem;
              padding-bottom: 0.25rem;
              border-radius: 10px !important;
            }
            
            /* Even bigger actions on iOS */
            .submit-button {
              min-height: 60px !important;
            }
            
            /* Respect iOS safe areas */
            .register-container {
              padding-top: env(safe-area-inset-top, 20px);
              padding-left: env(safe-area-inset-left, 15px);
              padding-right: env(safe-area-inset-right, 15px);
              padding-bottom: env(safe-area-inset-bottom, 20px);
            }
            
            /* Adjust form padding on iOS */
            .register-form {
              padding-top: 5px;
              padding-bottom: 25px !important;
            }
          }
        }
        `}
      </style>
    </div>
  );
};

export default RegisterPage; 