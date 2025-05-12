import { Link } from 'react-scroll';
import { useEffect, useState, useRef } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

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
      className="section hero-section mt-[-60px]"
      style={{
        minHeight: isMobile ? '100vh' : '100vh',
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
        paddingTop: isMobile ? '60px' : '80px',
        paddingBottom: isMobile ? '20px' : '40px',
        perspective: '1000px',
        "--mouse-x": "0px",
        "--mouse-y": "0px"
      }}
    >
      {/* Animated Particles with CSS animations instead of scroll-based parallax */}
      <div className="hero-particle particle-1"></div>
      <div className="hero-particle particle-2"></div>
      <div className="hero-particle particle-3"></div>
      <div className="container fade-in hero-content" style={{
        maxWidth: '1400px',
        transform: isMobile ? 'scale(0.9)' : 'scale(0.95)',
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: isMobile ? 'calc(100vh - 80px)' : 'auto',
        padding: isMobile ? '1rem 0' : '2rem 0'
      }}>
        {/* <div className={isMobile ? 'hero-badge mt-[2rem] w-[200px] mx-auto font-[300]' : 'hero-badge flex items-center justify-center w-[200px] mx-auto mt-[2rem]'}>
          <span className="text-[rgb(255,215,0)] font-[200]">6th Annual Event</span>
        </div> */}

        <div 
            className={`hero-badge mx-auto mt-[2rem] w-[200px] flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/50
                      border-2 border-yellow-500/30
                      transition-all duration-300
                      hover:shadow-xl hover:shadow-yellow-500/60`}
          style={{
            // Ensure the text remains visible against the gradient
            padding: isMobile ? '0.5rem 0.5rem' : '0.5rem 1rem', // Add padding to the div
          }}
        >
          <span
            className={`text-[#FAD300] drop-shadow-md`}
            style={{
              fontWeight: isMobile ? '500' : '600',
              fontSize: isMobile ? '14px' : '15px',
              padding: isMobile ? '0.2rem 0.5rem' : '0.5rem 0.8rem',
              letterSpacing: '0.05em',
            }}
          >
            6th Annual Event
          </span>
        </div>

        <h1 style={{
          fontSize: isMobile ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(3.5rem, 6vw, 5.5rem)',
          maxWidth: '1300px',
          margin: '0 auto',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          fontWeight: 800,
          marginBottom: isMobile ? '1rem' : '2rem'
        }}>
          <span style={{
            display: 'block',
            marginBottom: isMobile ? '2rem' : '3rem',
            textAlign: 'center'
          }}>
            <img
              src="/logo.png"
              alt="EDUTHON 5.0"
              className="mx-auto"
              style={{
                height: isMobile ? 'clamp(90px, 20vw, 130px)' : 'clamp(120px, 18vw, 160px)',
                display: 'inline-block',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
              }}
            />
          </span>
          <span style={{
            display: 'block',
            fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 600,
            opacity: 0.95
          }}>
            The Next of Education:<br /><span className="gradient-text">AI Meets Humanity</span>
          </span>
        </h1>

        {/* <div className="section-divider w-[100px] h-[3px] mx-auto" style={{
          width: '180px',
          height: '3px',
          marginTop: isMobile ? '0.25rem' : '0.8rem',
          marginBottom: isMobile ? '0.25rem' : '0.5rem',
        }}></div> */}
        <hr
          className={`mx-auto w-[250px] h-[3px] ${isMobile ? 'my-[0.5rem' : 'my-1'}`}
          style={{
            backgroundImage: 'linear-gradient(to right, transparent, #322B08, transparent)',
            border: 'none',
          }}
        />



        {/* <h2 style={{
          fontWeight: '500',
          marginTop: isMobile ? '0.5rem' : '1.5rem',
          marginBottom: isMobile ? '0.5rem' : '0',
          marginLeft: 'auto',
          marginRight: 'auto',  
          fontSize: isMobile ? 'clamp(1.2rem, 2.5vw, 1.6rem)' : 'clamp(1.4rem, 2vw, 1.8rem)',
          opacity: 0.95,
          maxWidth: '900px',
          letterSpacing: '0.5px',
        }}>
          India's Most Influential Education Summit
        </h2> */}

        <h2 className="font-[500] mx-auto opacity-95 max-w-[900px] tracking-wider
               md:mt-[1.5rem] md:mb-0 text-[clamp(1.2rem,2.5vw,1.6rem)]
               text-[clamp(1.4rem,2vw,1.8rem)] mt-[0.5rem] mb-[0.5rem]">
          India's Most Influential Education Summit
        </h2>


        <div className="glass-container hero-event-details" style={{
          marginTop: isMobile ? '0.5rem' : '1.2rem',
          marginBottom: isMobile ? '0.3rem' : '0.6rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: isMobile ? '0.75rem 1rem' : '1.2rem 2rem',
          maxWidth: isMobile ? '95%' : '70%',
          gap: isMobile ? '1rem' : '3rem',
        }}>
          <div style={{
            margin: '2.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem', /* Further increased gap */
            fontWeight: '500',
            fontSize: isMobile ? '1.1rem' : 'clamp(1.3rem, 2.5vw, 1.6rem)' /* Further increased font size */
          }}>
            <FaCalendarAlt color="var(--secondary-color)" size={isMobile ? 26 : 30} /> {/* Further increased icon size */}
            <span>August 30, 2025</span>
          </div>
          <div style={{
            margin: '2.5px',
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

        <div className="btn-container hero-buttons flex flex-row items-center justify-center gap-6 mx-auto w-full max-w-xs md:max-w-none" style={{
          marginTop: isMobile ? '0.8rem' : '1.2rem',
          marginBottom: isMobile ? '1rem' : '1rem',
          flexDirection: 'row',
          gap: isMobile ? '1rem' : '2rem',
          width: '100%',
          padding: '0',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 5,
          background: 'transparent'
        }}>
          <button
            onClick={() => onRegisterClick('interest')}
            className="btn btn-primary w-auto text-base font-semibold tracking-wider min-h-[40px] px-4 hover-glow"
            style={{
              flex: isMobile ? '1' : 'none',
              maxWidth: isMobile ? '170px' : '280px',
              minWidth: isMobile ? '30px' : '250px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.2)'
            }}
          >
            Register Now
          </button>

          <Link
            to="sponsors"
            smooth={true}
            duration={800}
            offset={-70}
            className="w-auto"
            style={{
              flex: isMobile ? '1' : 'none',
              maxWidth: isMobile ? '170px' : '280px'
            }}
          >
            <button className="btn btn-outline w-auto text-base tracking-wider min-h-[40px] px-4 hover-lift"
              style={{
                minWidth: isMobile ? '150px' : '250px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                padding: isMobile ? '0.5rem 1rem' : '0.75rem 2rem',
                minHeight: isMobile ? '45px' : '55px',
                letterSpacing: '0.5px'
              }}
            >
              Become a Sponsor
            </button>
          </Link>
        </div>

        <p className="italic max-w-[900px] mx-auto mt-[1.5rem] md:mt-[2rem] opacity-85 text-[clamp(1rem,2vw,1.4rem)] px-4 leading-relaxed">
          A decade-defining dialogue on technology, learning, and the soul of education.
        </p>

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
          margin-bottom: 2.5rem;
          display: inline-block;
          padding: 0.7rem 1.8rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background-color: rgba(255, 215, 0, 0.15);
          border-radius: 30px;
          border: 1px solid rgba(255, 215, 0, 0.4);
          transform: scale(1.1);
        }
        
        .hero-badge span {
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .hero-event-details {
          display: inline-flex;
          padding: 1.5rem 2.5rem;
          max-width: 92%;
          justify-content: center;
          gap: clamp(2.5rem, 6vw, 5rem);
          flex-wrap: wrap;
          background-color: rgba(255, 255, 255, 0.05);
          transform: scale(0.85);
          transform-origin: center center;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.9));
          border: none;
          color: #121212;
          font-weight: 600;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 165, 0, 0.9), rgba(255, 215, 0, 0.9));
          transition: all 0.5s ease;
          z-index: -1;
        }
        
        .btn-primary:hover::before {
          left: 0;
        }
        
        .btn-primary:hover {
          box-shadow: 0 0 25px rgba(255, 215, 0, 0.5);
          transform: translateY(-3px) scale(1.02);
          color: #000;
          text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
        }
        
        .btn-primary:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
          transform: translateY(-2px);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 215, 0, 0.8);
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
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
        
        @media (max-width: 768px) {
          .hero-content {
            transform: scale(0.9);
            margin: 0;
            padding: 1rem 0;
          }
          
          .hero-event-details {
            transform: scale(0.95);
            padding: 0.75rem 1rem;
          }
          
          .hero-buttons {
            transform: scale(0.95);
            margin-top: 1.5rem;
            gap: 1rem;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-content {
            transform: scale(0.92);
          }
          
          .hero-event-details {
            transform: scale(0.95);
          }
          
          .hero-buttons {
            transform: scale(0.95);
          }
        }
        
        @media (min-width: 1025px) {
          .hero-content {
            transform: scale(0.95);
          }
        }
        
        @media (min-height: 800px) {
          .hero-section {
            justify-content: center;
          }
        }
        
        @media (max-height: 799px) {
          .hero-section {
            justify-content: flex-start;
            padding-top: ${isMobile ? '60px' : '80px'};
          }
          
          .hero-content {
            transform: ${isMobile ? 'scale(0.85)' : 'scale(0.9)'};
            margin-top: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 