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
      paddingBottom: isMobile ? '5rem' : '7rem',
      background: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.92)), url("/src/assets/images/join-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Overlay with golden gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        background: 'linear-gradient(to top, rgba(212, 175, 55, 0.25), transparent)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Additional light effect */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="text-center" style={{ 
          maxWidth: '800px', 
          margin: '0 auto 1rem',
          fontSize: isMobile ? '1.5rem' : '2rem',
          padding: '0 0.75rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          Join the Movement
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          maxWidth: '700px',
          margin: isMobile ? '1.25rem auto 3rem' : '1.75rem auto 4.5rem',
          color: 'var(--secondary-color)',
          padding: '0 1rem',
          fontWeight: 500,
          letterSpacing: '0.01em',
          textShadow: '0 1px 8px rgba(0, 0, 0, 0.3)'
        }}>
          Want to attend? Want to partner? Start here.
        </p>
        
        <div className="join-buttons-container" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '1.5rem' : 'clamp(1.5rem, 4vw, 3rem)',
          flexWrap: 'wrap',
          padding: '0 1rem',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          maxWidth: isMobile ? '320px' : '700px',
          margin: '0 auto'
        }}>
          <button 
            className="btn primary-join-btn"
            onClick={() => onRegisterClick('interest')}
            style={{
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : 'clamp(200px, 40vw, 250px)',
              fontSize: isMobile ? '1rem' : 'clamp(1rem, 2vw, 1.1rem)',
              padding: isMobile ? '1rem 1.25rem' : 'clamp(0.9rem, 2vw, 1.1rem) clamp(1.5rem, 3vw, 2rem)',
              margin: isMobile ? '0 auto' : '0',
              minHeight: isMobile ? '54px' : '60px',
              fontWeight: '600',
              letterSpacing: '0.02em',
              borderRadius: '10px',
              boxShadow: '0 6px 20px rgba(212, 175, 55, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            Register Your Interest
          </button>
          
          <button 
            className="btn btn-outline secondary-join-btn"
            onClick={() => window.open('https://wa.me/919815088426', '_blank')}
            style={{
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : 'clamp(200px, 40vw, 250px)',
              fontSize: isMobile ? '1rem' : 'clamp(1rem, 2vw, 1.1rem)',
              padding: isMobile ? '0.9rem 1.25rem' : 'clamp(0.9rem, 2vw, 1.1rem) clamp(1.5rem, 3vw, 2rem)',
              minHeight: isMobile ? '54px' : '60px',
              fontWeight: '500',
              letterSpacing: '0.02em',
              borderRadius: '10px',
              borderWidth: '2px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              borderColor: 'rgba(212, 175, 55, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            Talk to Our Team
          </button>
        </div>
      </div>
      
      <style>{`
        .primary-join-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent, 
            rgba(212, 175, 55, 0.1), 
            transparent
          );
          transform: rotate(45deg);
          transition: all 0.5s ease;
          z-index: -1;
        }
        
        .primary-join-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3), 0 6px 12px rgba(0, 0, 0, 0.25);
        }
        
        .primary-join-btn:hover::before {
          left: 150%;
          transition: all 1s ease;
        }
        
        .secondary-join-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .secondary-join-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(212, 175, 55, 0.1),
            transparent
          );
          transition: all 0.6s ease;
        }
        
        .secondary-join-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
          border-color: rgba(212, 175, 55, 0.7);
          background-color: rgba(212, 175, 55, 0.05);
          color: var(--secondary-color);
        }
        
        .secondary-join-btn:hover::before {
          left: 100%;
        }
      `}</style>
    </section>
  );
};

export default JoinMovement;