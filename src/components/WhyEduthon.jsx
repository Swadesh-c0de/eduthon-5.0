import { useInView } from 'react-intersection-observer';
import { FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const WhyEduthon = () => {
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

  const reasons = [
    "India's only education summit uniting 500+ decision-makers under one roof",
    "Sparks real conversations on curriculum, classrooms, and co-scholastic learning",
    "Platform for diverse voices: educators, youth, policymakers, entrepreneurs",
    "Known for inspiring action — not just dialogue"
  ];

  return (
    <section id="why-eduthon" className="section" style={{
      backgroundColor: '#000000',
      paddingTop: isMobile ? '4rem' : '6rem',
      paddingBottom: isMobile ? '4rem' : '6rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="section-bg-gradient" style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.08) 0%, rgba(0, 0, 0, 0) 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
    
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="text-center" style={{ 
          maxWidth: '800px', 
          margin: '0 auto 1rem',
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontWeight: 600,
          letterSpacing: '0.02em'
        }}>
          Why EDUTHON Matters?
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
          maxWidth: '800px',
          margin: isMobile ? '1rem auto 2.5rem' : '1.5rem auto 4rem',
          color: 'var(--secondary-color)',
          padding: '0 1rem',
          lineHeight: 1.6,
          letterSpacing: '0.01em'
        }}>
          Not Just a Summit. A National Platform for Educational Change.
        </p>
        
        <div className="card why-card" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: isMobile ? '1.75rem 1.5rem' : 'clamp(2rem, 5vw, 3rem)',
          borderRadius: '14px',
          background: 'rgba(30, 30, 30, 0.7)',
          boxShadow: '0 6px 30px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="card-gradient-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0) 50%)',
            pointerEvents: 'none',
            zIndex: 0
          }}></div>
          
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            position: 'relative',
            zIndex: 1
          }}>
            {reasons.map((reason, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: isMobile ? '1.25rem' : 'clamp(1.25rem, 3vw, 1.75rem)',
                fontSize: isMobile ? '0.95rem' : 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: '1.7',
                paddingRight: '0.5rem',
                transition: 'transform 0.3s ease',
                color: 'rgba(255, 255, 255, 0.9)'
              }} className="reason-item">
                <span style={{ 
                  color: 'var(--secondary-color)',
                  marginRight: '1rem',
                  marginTop: '0.3rem',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '20px' : '24px',
                  height: isMobile ? '20px' : '24px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  boxShadow: '0 2px 8px rgba(212, 175, 55, 0.2)'
                }}>
                  <FaCheck size={isMobile ? 10 : 12} />
                </span>
                {reason}
              </li>
            ))}
          </ul>
          
          <div style={{
            margin: isMobile ? '2.5rem 0 0' : '3rem 0 0',
            padding: isMobile ? '1.5rem 1rem' : 'clamp(1.75rem, 4vw, 2.25rem)',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            textAlign: 'center',
            background: 'rgba(212, 175, 55, 0.08)',
            borderRadius: '10px',
            position: 'relative',
            zIndex: 1
          }} className="quote-container">
            <p style={{
              fontSize: isMobile ? '1.05rem' : 'clamp(1.1rem, 3vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'var(--secondary-color)',
              margin: 0,
              lineHeight: 1.6,
              letterSpacing: '0.01em',
              position: 'relative'
            }}>
              <span className="quote-mark open" style={{
                position: 'absolute',
                top: '-0.7em',
                left: isMobile ? '-0.2em' : '-0.4em',
                fontSize: isMobile ? '1.5em' : '2em',
                lineHeight: 1,
                opacity: 0.3
              }}>&#8220;</span>
              At EDUTHON, we don't just discuss the future of education — we shape it.
              <span className="quote-mark close" style={{
                position: 'absolute',
                bottom: '-0.7em',
                right: isMobile ? '-0.2em' : '-0.4em',
                fontSize: isMobile ? '1.5em' : '2em',
                lineHeight: 1,
                opacity: 0.3
              }}>&#8221;</span>
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        .reason-item {
          transition: transform 0.3s ease;
        }
        
        .reason-item:hover {
          transform: translateX(5px);
        }
        
        .quote-container {
          transition: all 0.3s ease;
        }
        
        .quote-container:hover {
          background: rgba(212, 175, 55, 0.12);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default WhyEduthon;