import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const JoinMovement = ({ onRegisterClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <section id="join-movement" className="section" style={{
      backgroundColor: '#000000',
      paddingTop: isMobile ? '4rem' : '6rem',
      paddingBottom: isMobile ? '4rem' : '6rem',
      background: 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("/src/assets/images/join-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }}>
      {/* Overlay with golden gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to top, rgba(212, 175, 55, 0.2), transparent)',
        zIndex: 1
      }}></div>
      
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="text-center" style={{ 
          maxWidth: '800px', 
          margin: '0 auto 1rem',
          fontSize: isMobile ? '1.5rem' : '2rem',
          padding: '0 0.75rem'
        }}>
          Join the Movement
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
          maxWidth: '700px',
          margin: isMobile ? '1rem auto 2.5rem' : '1.5rem auto 4rem',
          color: 'var(--secondary-color)',
          padding: '0 1rem',
        }}>
          Want to attend? Want to partner? Start here.
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '1rem' : 'clamp(1rem, 4vw, 2rem)',
          flexWrap: 'wrap',
          padding: '0 1rem',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          maxWidth: isMobile ? '300px' : 'none',
          margin: '0 auto'
        }}>
          <button 
            className="btn"
            onClick={() => onRegisterClick('interest')}
            style={{
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : 'clamp(180px, 40vw, 220px)',
              fontSize: isMobile ? '0.95rem' : 'clamp(0.95rem, 2vw, 1rem)',
              padding: isMobile ? '0.9rem 1rem' : 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.5rem)',
              margin: isMobile ? '0 auto 1rem' : '0',
              minHeight: '50px',
              fontWeight: '600'
            }}
          >
            Register Your Interest
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={() => window.open('https://wa.me/919815088426', '_blank')}
            style={{
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : 'clamp(180px, 40vw, 220px)',
              fontSize: isMobile ? '0.9rem' : 'clamp(0.95rem, 2vw, 1rem)',
              padding: isMobile ? '0.8rem 1rem' : 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            Talk to Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinMovement;