import { useInView } from 'react-intersection-observer';
import { FaBullseye, FaGlobe, FaMicrophone, FaHandshake, FaLightbulb } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Sponsors = ({ onRegisterClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const benefits = [
    {
      icon: <FaBullseye size={isMobile ? 20 : 24} />,
      title: 'Direct Access to 500+ Decision Makers',
    },
    {
      icon: <FaGlobe size={isMobile ? 20 : 24} />,
      title: 'Premium Brand Visibility',
    },
    {
      icon: <FaMicrophone size={isMobile ? 20 : 24} />,
      title: 'Stage + Content Integration',
    },
    {
      icon: <FaHandshake size={isMobile ? 20 : 24} />,
      title: 'Partnership-Driven Networking',
    },
    {
      icon: <FaLightbulb size={isMobile ? 20 : 24} />,
      title: 'Association with Purpose and Trust',
    },
  ];

  const textStyles = {
    baseText: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    heading: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      marginBottom: '1rem',
    },
    subheading: {
      fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
      margin: isMobile ? '1rem auto 1.5rem' : '1.5rem auto 2rem',
      color: 'var(--secondary-color)',
    },
    paragraph: {
      fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
      margin: isMobile ? '0 auto 2.5rem' : '0 auto 4rem',
    }
  };

  return (
    <section id="sponsors" className="section" style={{
      backgroundColor: '#0c0c0c',
      paddingTop: isMobile ? '4rem' : '6rem',
      paddingBottom: isMobile ? '4rem' : '6rem',
    }}>
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`}>
        <h2 className="text-center" style={{ 
          ...textStyles.baseText, 
          ...textStyles.heading 
        }}>
          Be a Sponsor
        </h2>
        
        <p className="text-center" style={{
          ...textStyles.baseText,
          ...textStyles.subheading
        }}>
          Reach decision-makers. Build lasting visibility. Shape the future of education.
        </p>
        
        <p className="text-center" style={{
          ...textStyles.baseText,
          ...textStyles.paragraph
        }}>
          Sponsoring EDUTHON 5.0 means standing at the intersection of influence and impact.
          Your brand becomes a part of the national dialogue on education, AI, and leadership.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: isMobile ? '1.25rem' : 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '900px',
          margin: '0 auto 3rem',
          padding: '0 1rem',
          alignItems: 'stretch',
          justifyContent: 'center'
        }}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="card sponsor-benefit-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.75rem' : '1rem',
                padding: isMobile ? '1.1rem 1rem' : '1.2rem',
                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 215, 0, 0.15)',
                boxSizing: 'border-box',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                margin: isMobile ? '0 auto' : '0',
                width: isMobile ? '92%' : '100%',
                maxWidth: isMobile ? '300px' : 'none',
                justifyContent: isMobile ? 'flex-start' : 'flex-start',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <div style={{ 
                color: 'var(--secondary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.12)',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                {benefit.icon}
              </div>
              <p style={{ 
                margin: 0, 
                fontWeight: '500',
                fontSize: isMobile ? '0.9rem' : 'clamp(0.9rem, 2vw, 1rem)',
                lineHeight: 1.5,
                textAlign: 'left',
                letterSpacing: '0.02em'
              }}>
                {benefit.title}
              </p>
            </div>
          ))}
        </div>
        
        <div className="card sponsor-quote-card" style={{
          maxWidth: isMobile ? '92%' : '700px',
          margin: isMobile ? '2rem auto' : '3rem auto',
          padding: isMobile ? '1.5rem 1.25rem' : 'clamp(1.5rem, 4vw, 2rem)',
          background: 'rgba(212, 175, 55, 0.07)',
          textAlign: 'center',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '14px',
          boxSizing: 'border-box',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          position: 'relative'
        }}>
          <p style={{
            fontSize: isMobile ? '0.95rem' : 'clamp(1rem, 2vw, 1.2rem)',
            fontStyle: 'italic',
            color: 'var(--secondary-color)',
            margin: '2px',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1
          }}>
            This isn't just a sponsorship. It's a front-row seat to India's education revolution — and a chance to shape it.
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '2.5rem' : '3rem',
        }}>
          <button 
            className="btn sponsor-cta-btn"
            onClick={() => onRegisterClick('sponsor')}
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              padding: isMobile ? '0.8rem 1.75rem' : 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              minWidth: isMobile ? '220px' : 'clamp(180px, 40vw, 220px)',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
              transition: 'all 0.3s ease',
              borderRadius: '10px',
              fontWeight: 500,
              letterSpacing: '0.03em',
              border: '1px solid rgba(212, 175, 55, 0.4)'
            }}
          >
            View Sponsorship Tiers
          </button>
        </div>
      </div>
      <style>{`
        .sponsor-benefit-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.15), 0 6px 6px rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.3);
        }
        
        .sponsor-quote-card::before,
        .sponsor-quote-card::after {
          content: '"';
          position: absolute;
          font-size: ${isMobile ? '3rem' : '4rem'};
          color: rgba(212, 175, 55, 0.15);
          font-family: serif;
          line-height: 1;
          z-index: 0;
        }
        
        .sponsor-quote-card::before {
          top: 0.5rem;
          left: 1rem;
        }
        
        .sponsor-quote-card::after {
          bottom: 0;
          right: 1rem;
        }
        
        .sponsor-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.25);
          background-color: rgba(212, 175, 55, 0.95);
        }
        
        @media (max-width: 768px) {
          .sponsor-benefit-card {
            margin: 0 auto;
            width: 92%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Sponsors;