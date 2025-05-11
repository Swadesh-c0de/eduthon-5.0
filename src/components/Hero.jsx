import { Link } from 'react-scroll';
import { useEffect, useState, useRef } from 'react';
import { FaArrowDown, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = ({ onRegisterClick }) => {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    // Add appear class to fade-in element after component mounts
    const fadeElement = document.querySelector('#hero .fade-in');
    if (fadeElement) {
      setTimeout(() => {
        fadeElement.classList.add('appear');
      }, 100);
    }
  }, []);

  // Add parallax effect on mouse move
  useEffect(() => {
    // Skip parallax effect on mobile
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate mouse position relative to the center
      const x = ((e.clientX - centerX) / rect.width) * 100;
      const y = ((e.clientY - centerY) / rect.height) * 100;
      
      setMousePosition({ x, y });
      
      // Update CSS variables instead of direct style manipulation
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="section hero-section" 
      style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
        backgroundImage: 'linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.9)), url("/src/assets/images/hero-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
        overflow: 'hidden',
        paddingTop: 'calc(80px + clamp(2rem, 7vw, 5rem))', /* Further increased padding */
        paddingBottom: 'clamp(2rem, 7vw, 5rem)', /* Further increased padding */
        perspective: '1000px',
        "--mouse-x": "0px",
        "--mouse-y": "0px"
      }}
    >
      {/* Animated Particles with CSS animations instead of scroll-based parallax */}
      <div className="hero-particle particle-1"></div>
      <div className="hero-particle particle-2"></div>
      <div className="hero-particle particle-3"></div>
      <div className="container fade-in hero-content" style={{ maxWidth: '1400px' }}> {/* Increased container width */}
        <div className={isMobile ? 'hero-badge mt-[3rem]' : 'hero-badge flex items-center justify-center'}>
          <span className="text-[rgb(255,215,0)]">6th Annual Event</span>
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 10vw, 6rem)', /* Further increased font size */
          maxWidth: '1300px', /* Further increased max width */
          margin: '0 auto',
          lineHeight: 1.05, /* Tighter line height for larger text */
          letterSpacing: '-0.03em',
          fontWeight: 800
        }}>
          <span style={{ display: 'block', marginBottom: '2.5rem', textAlign: 'center' }}> {/* Further increased margin */}
            <img 
              src="/logo.png" 
              alt="EDUTHON 5.0" 
              className="mx-auto"
              style={{ 
                height: 'clamp(120px, 22vw, 180px)', /* Further increased logo size */
                display: 'inline-block',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))' /* Enhanced glow */
              }} 
            />
          </span>
          <span style={{ 
            display: 'block', 
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', /* Further increased font size */
            fontWeight: 600,
            opacity: 0.95
          }}>
            The Next of Education:<br/><span className="gradient-text">AI Meets Humanity</span>
          </span>
        </h1>
        
        <div className="section-divider" style={{ width: '180px', margin: '3rem auto', height: '3px' }}></div> {/* Wider and taller divider */}
        
        <h2 style={{ 
          fontWeight: '500', 
          margin: '2.5rem auto', /* Further increased margin */
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', /* Further increased font size */
          opacity: 0.95,
          maxWidth: '900px', /* Further increased max width */
          letterSpacing: '0.5px',
        }}>
          India's Most Influential Education Summit
        </h2>
        
        <div className="glass-container hero-event-details" style={{
          padding: isMobile ? '1.2rem 1.8rem' : '1.5rem 2.5rem', /* Further increased padding */
          maxWidth: isMobile ? '95%' : '92%',
          gap: isMobile ? '2rem' : 'clamp(2.5rem, 6vw, 5rem)', /* Further increased gap */
          margin: isMobile ? '2.5rem auto' : '3.5rem auto', /* Further increased margin */
        }}>
          <div className="hover-lift" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.2rem', /* Further increased gap */
            fontWeight: '500',
            fontSize: isMobile ? '1.1rem' : 'clamp(1.3rem, 2.5vw, 1.6rem)' /* Further increased font size */
          }}>
            <FaCalendarAlt color="var(--secondary-color)" size={isMobile ? 26 : 30} /> {/* Further increased icon size */}
            <span>August 30, 2025</span>
          </div>
          <div className="hover-lift" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.2rem', /* Further increased gap */
            fontWeight: '500',
            fontSize: isMobile ? '1.1rem' : 'clamp(1.3rem, 2.5vw, 1.6rem)' /* Further increased font size */
          }}>
            <FaMapMarkerAlt color="var(--secondary-color)" size={isMobile ? 26 : 30} /> {/* Further increased icon size */}
            <span>Hyatt, Chandigarh</span>
          </div>
        </div>
        
        <div className="btn-container hero-buttons flex flex-col md:flex-row items-center justify-center gap-6 mx-auto w-full max-w-xs md:max-w-none mt-8 md:mt-12" style={{
            marginTop: isMobile ? '3rem' : '4rem', /* Further increased margin */
        }}>
          <button 
            onClick={() => onRegisterClick('interest')} 
            className="btn md:w-auto md:min-w-[220px] text-lg md:text-xl font-semibold tracking-wider min-h-[60px] md:min-h-0 px-8" /* Further increased button size */
          >
            Register Now
          </button>
          
          <Link 
            to="sponsors" 
            smooth={true} 
            duration={800} 
            offset={-70}
            className="w-full md:w-auto"
          >
            <button className="btn btn-outline md:w-auto md:min-w-[220px] text-lg md:text-xl tracking-wider min-h-[60px] md:min-h-0 px-8"> {/* Further increased button size */}
              Become a Sponsor
            </button>
          </Link>
        </div>
        
        <p style={{ 
          fontStyle: 'italic',
          maxWidth: '900px', /* Further increased max width */
          margin: '6rem auto 0', /* Further increased margin */
          opacity: '0.85',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', /* Further increased font size */
          padding: '0 1rem',
          lineHeight: 1.6
        }}>
          A decade-defining dialogue on technology, learning, and the soul of education.
        </p>
        
        {/* Scroll indicator - only visible on desktop */}
        {!isMobile && (
          <div className="scroll-indicator" style={{
            position: 'absolute',
            bottom: '3rem', /* Further increased bottom position */
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            cursor: 'pointer'
          }}>
            <Link to="introduction" smooth={true} duration={800} offset={-70}>
              <FaArrowDown color="var(--secondary-color)" size={36} /> {/* Further increased icon size */}
            </Link>
          </div>
        )}
      </div>
      
      {/* Background Overlay with Golden Glow Effect */}
      <div className="hero-glow"></div>
      
      <style>{`
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(20px);
          z-index: 0;
          will-change: transform;
        }
        
        .particle-1 {
          top: 10%;
          left: 10%;
          width: 260px; /* Further increased size */
          height: 260px; /* Further increased size */
          background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
          opacity: 0.8; /* Further increased opacity */
          filter: blur(25px); /* Increased blur */
          animation: float-particle1 15s ease-in-out infinite alternate;
        }
        
        .particle-2 {
          bottom: 15%;
          right: 15%;
          width: 350px; /* Further increased size */
          height: 350px; /* Further increased size */
          background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
          opacity: 0.9; /* Further increased opacity */
          filter: blur(35px); /* Further increased blur */
          animation: float-particle2 18s ease-in-out infinite alternate;
        }
        
        .particle-3 {
          top: 40%;
          right: 10%;
          width: 180px; /* Further increased size */
          height: 180px; /* Further increased size */
          background: radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%);
          opacity: 0.7; /* Further increased opacity */
          filter: blur(25px); /* Further increased blur */
          animation: float-particle3 12s ease-in-out infinite alternate;
        }
        
        @keyframes float-particle1 {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(30px) translateX(25px); }
        }
        
        @keyframes float-particle2 {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-35px) translateX(-30px); }
        }
        
        @keyframes float-particle3 {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(25px) translateX(-25px); }
        }
        
        .hero-badge {
          margin-bottom: 2.5rem; /* Further increased margin */
          display: inline-block;
          padding: 0.7rem 1.8rem; /* Further increased padding */
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background-color: rgba(255, 215, 0, 0.15); /* Further increased opacity */
          border-radius: 30px;
          border: 1px solid rgba(255, 215, 0, 0.4); /* Enhanced border */
          transform: scale(1.1); /* Scaled up badge */
        }
        
        .hero-badge span {
          font-size: 1.1rem; /* Further increased font size */
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .hero-event-details {
          margin: 3.5rem auto; /* Further increased margin */
          display: inline-flex;
          padding: 1.5rem 2.5rem; /* Further increased padding */
          max-width: 92%;
          justify-content: center;
          gap: clamp(2.5rem, 6vw, 5rem); /* Further increased gap */
          flex-wrap: wrap;
          background-color: rgba(255, 255, 255, 0.05); /* Further increased opacity */
          transform: scale(1.05); /* Scaled up details container */
        }
        
        .hero-buttons {
          margin-top: 4rem; /* Further increased margin */
          transform: scale(1.05); /* Scaled up buttons */
        }
        
        .hero-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%; /* Further increased height */
          background: linear-gradient(to top, rgba(255, 215, 0, 0.09), transparent); /* Further increased opacity */
          pointer-events: none;
        }
        
        @media (min-width: 768px) {
          .hero-content {
            position: relative;
            z-index: 3;
            will-change: transform;
            transform: translate(calc(var(--mouse-x) * 0.02), calc(var(--mouse-y) * 0.02));
          }
          
          .hero-event-details {
            will-change: transform;
            transform: translate(calc(var(--mouse-x) * -0.01), calc(var(--mouse-y) * -0.01)) scale(1.05);
          }
          
          .hero-buttons {
            will-change: transform;
            transform: translate(calc(var(--mouse-x) * 0.015), calc(var(--mouse-y) * 0.015)) scale(1.05);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-30px) translateX(-50%); /* Further increased bounce height */
          }
          60% {
            transform: translateY(-20px) translateX(-50%); /* Further increased bounce height */
          }
        }
        

      `}</style>
    </section>
  );
};

export default Hero; 