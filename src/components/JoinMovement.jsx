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
      backgroundColor: '#050505',
      paddingTop: isMobile ? '5rem' : '7rem',
      paddingBottom: isMobile ? '6rem' : '8rem',
      background: `
        linear-gradient(
          rgba(0, 0, 0, 0.8), 
          rgba(0, 0, 0, 0.85)
        ),
        url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Geometric decorative elements */}
      <div className="geometric-element left-top" style={{
        position: 'absolute',
        top: '10%',
        left: '-50px',
        width: '200px',
        height: '200px',
        border: '2px solid rgba(212, 175, 55, 0.15)',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        transform: 'rotate(-15deg)',
        opacity: 0.4,
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      <div className="geometric-element right-bottom" style={{
        position: 'absolute',
        bottom: '15%',
        right: '-70px',
        width: '250px',
        height: '250px',
        border: '2px solid rgba(212, 175, 55, 0.15)',
        borderRadius: '63% 37% 37% 63% / 43% 37% 63% 57%',
        transform: 'rotate(20deg)',
        opacity: 0.4,
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Main gradient overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 60%, transparent)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      {/* Golden glow effects */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(70px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      
      <div className="particles" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.4
      }}></div>
      
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 2 }}>
        <div className="content-wrapper" style={{
          maxWidth: '850px',
          margin: '0 auto',
          textAlign: 'center',
          padding: isMobile ? '0 1.25rem' : '0 2rem',
          position: 'relative'
        }}>
          <div className="title-accent" style={{
            width: isMobile ? '60px' : '80px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, var(--secondary-color), transparent)',
            margin: '0 auto 1.5rem'
          }}></div>
        
          <h2 className="text-center" style={{ 
            maxWidth: '800px', 
            margin: '0 auto 1.5rem',
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
            background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(212, 175, 55, 0.9))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            display: 'inline-block'
          }}>
            Join the Movement
          </h2>
          
          <p className="text-center" style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            maxWidth: '700px',
            margin: isMobile ? '1.5rem auto 3rem' : '1.75rem auto 4rem',
            color: 'var(--secondary-color)',
            padding: '0 1rem',
            fontWeight: 500,
            lineHeight: 1.6,
            letterSpacing: '0.01em',
            textShadow: '0 1px 10px rgba(0, 0, 0, 0.4)'
          }}>
            Want to attend? Want to partner? Start here.
          </p>
          
          <div className="join-buttons-container" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3.5rem)',
            flexWrap: 'wrap',
            padding: '0 1rem',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            maxWidth: isMobile ? '320px' : '700px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <button 
              className="btn primary-join-btn"
              onClick={() => onRegisterClick('interest')}
              style={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : 'clamp(220px, 40vw, 270px)',
                fontSize: isMobile ? '1rem' : 'clamp(1rem, 2vw, 1.15rem)',
                padding: isMobile ? '1.1rem 1.5rem' : 'clamp(1rem, 2vw, 1.2rem) clamp(1.75rem, 3vw, 2.25rem)',
                margin: isMobile ? '0 auto' : '0',
                minHeight: isMobile ? '58px' : '64px',
                fontWeight: '600',
                letterSpacing: '0.02em',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.25), 0 4px 10px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(145deg, rgba(212, 175, 55, 1), rgba(182, 149, 35, 1))',
                color: '#000'
              }}
            >
              Register Your Interest
            </button>
            
            <button 
              className="btn btn-outline secondary-join-btn"
              onClick={() => window.open('https://wa.me/919815088426', '_blank')}
              style={{
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : 'clamp(220px, 40vw, 270px)',
                fontSize: isMobile ? '1rem' : 'clamp(1rem, 2vw, 1.15rem)',
                padding: isMobile ? '1rem 1.5rem' : 'clamp(1rem, 2vw, 1.2rem) clamp(1.75rem, 3vw, 2.25rem)',
                minHeight: isMobile ? '58px' : '64px',
                fontWeight: '500',
                letterSpacing: '0.02em',
                borderRadius: '12px',
                borderWidth: '2px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                borderColor: 'rgba(212, 175, 55, 0.6)',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(20, 20, 20, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: 'var(--secondary-color)'
              }}
            >
              Talk to Our Team
            </button>
          </div>
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
            rgba(255, 255, 255, 0.3), 
            transparent
          );
          transform: rotate(45deg);
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: 1;
        }
        
        .primary-join-btn:hover {
          transform: translateY(-7px);
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.35), 0 8px 15px rgba(0, 0, 0, 0.3);
          filter: brightness(1.1);
        }
        
        .primary-join-btn:hover::before {
          left: 150%;
          transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .secondary-join-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
            rgba(212, 175, 55, 0.2),
            transparent
          );
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .secondary-join-btn:hover {
          transform: translateY(-7px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35), 0 8px 15px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.8);
          background-color: rgba(30, 30, 30, 0.6);
        }
        
        .secondary-join-btn:hover::before {
          left: 100%;
        }
        
        .geometric-element {
          animation: float 8s ease-in-out infinite;
        }
        
        .geometric-element.left-top {
          animation-delay: 0s;
        }
        
        .geometric-element.right-bottom {
          animation-delay: -4s;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(-15deg);
          }
          50% {
            transform: translate(15px, -15px) rotate(0deg);
          }
          100% {
            transform: translate(0, 0) rotate(-15deg);
          }
        }
        
        .particles {
          background-image: 
            radial-gradient(circle, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
            radial-gradient(circle, rgba(212, 175, 55, 0.1) 2px, transparent 2px);
          background-size: 40px 40px, 80px 80px;
          background-position: 0 0, 20px 20px;
          animation: particlesDrift 60s linear infinite;
        }
        
        @keyframes particlesDrift {
          0% {
            background-position: 0 0, 20px 20px;
          }
          100% {
            background-position: 1000px 500px, 1020px 520px;
          }
        }
        
        @media (max-width: 768px) {
          .geometric-element {
            opacity: 0.25;
          }
          
          .particles {
            opacity: 0.25;
          }
        }
      `}</style>
    </section>
  );
};

export default JoinMovement;