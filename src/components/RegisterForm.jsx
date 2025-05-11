import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const RegisterForm = ({ type, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    organization: '',
    city: '',
    message: '',
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally submit the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your interest! We will get back to you soon.');
    onClose();
  };
  
  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: isMobile ? '0.75rem' : 'clamp(0.5rem, 2vw, 1rem)',
      backdropFilter: 'blur(5px)',
    }}
    onClick={(e) => {
      // Close if clicking outside the form
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="form-title"
    >
      <div style={{
        backgroundColor: '#0c0c0c',
        borderRadius: '8px',
        padding: isMobile ? '1.25rem' : 'clamp(1.5rem, 4vw, 2rem)',
        width: '100%',
        maxWidth: '500px',
        maxHeight: isMobile ? '100vh' : '90vh',
        overflowY: 'auto',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        transform: 'translateY(0)',
        opacity: 1,
        animation: 'fadeIn 0.3s ease',
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '50%',
            color: 'var(--secondary-color)',
            cursor: 'pointer',
            fontSize: '1rem',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          aria-label="Close form"
        >
          <FaTimes />
        </button>
        
        <h2 
          id="form-title"
          style={{ 
            marginBottom: isMobile ? '1.5rem' : '2rem', 
            textAlign: 'center',
            fontSize: isMobile ? '1.3rem' : 'clamp(1.5rem, 5vw, 2rem)',
            color: 'var(--secondary-color)',
            paddingRight: '30px', // Space for the close button
          }}
        >
          {type === 'interest' ? 'Register Your Interest' : 'Become a Sponsor'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}>
            <label 
              htmlFor="name"
              className="form-label"
              style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                marginBottom: '0.4rem',
              }}
            >
              Full Name *
            </label>
            <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              style={{
                padding: isMobile ? '0.7rem' : '0.875rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              placeholder="Enter your full name"
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}>
            <label 
              htmlFor="email"
              className="form-label"
              style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                marginBottom: '0.4rem',
              }}
            >
              Email *
            </label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              style={{
                padding: isMobile ? '0.7rem' : '0.875rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              placeholder="Enter your email"
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}>
            <label 
              htmlFor="role"
              className="form-label"
              style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                marginBottom: '0.4rem',
              }}
            >
              Role *
            </label>
            <input 
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="form-input"
              style={{
                padding: isMobile ? '0.7rem' : '0.875rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              placeholder="Your position/role"
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}>
            <label 
              htmlFor="organization"
              className="form-label"
              style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                marginBottom: '0.4rem',
              }}
            >
              Organization *
            </label>
            <input 
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              className="form-input"
              style={{
                padding: isMobile ? '0.7rem' : '0.875rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              placeholder="Your organization/school"
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}>
            <label 
              htmlFor="city"
              className="form-label"
              style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                marginBottom: '0.4rem',
              }}
            >
              City *
            </label>
            <input 
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-input"
              style={{
                padding: isMobile ? '0.7rem' : '0.875rem',
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              placeholder="Your city"
            />
          </div>
          
          {type === 'sponsor' && (
            <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem' }}>
              <label 
                htmlFor="message"
                className="form-label"
                style={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  marginBottom: '0.4rem',
                }}
              >
                Message (Optional)
              </label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={isMobile ? 3 : 4}
                className="form-input"
                style={{
                  resize: 'vertical',
                  padding: isMobile ? '0.7rem' : '0.875rem',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                }}
                placeholder="How can we help you?"
              />
            </div>
          )}
          
          <button 
            type="submit"
            className="btn"
            style={{
              width: '100%',
              marginTop: isMobile ? '1rem' : '1.5rem',
              padding: isMobile ? '0.8rem' : '1rem',
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            Submit
          </button>
          
          <p style={{
            textAlign: 'center',
            marginTop: '1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: isMobile ? '0.8rem' : '0.9rem'
          }}>
            We respect your privacy and will not share your data.
          </p>
        </form>
      </div>
      
      <style>
        {`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
};

export default RegisterForm;