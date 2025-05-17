import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
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
        minHeight: isMobile ? '100vh' : '90vh',
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
        paddingTop: isMobile ? '60px' : '60px',
        paddingBottom: isMobile ? '20px' : '30px',
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
        maxWidth: '1200px',
        transform: isMobile ? 'scale(0.9)' : 'scale(0.85)',
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: isMobile ? 'calc(100vh - 80px)' : 'auto',
        padding: isMobile ? '1rem 0' : '1.5rem 0'
      }}>
        <div
          className={`hero-badge mx-auto mt-[1.5rem] w-[180px] flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/50
                      border-2 border-yellow-500/30
                      transition-all duration-300
                      hover:shadow-xl hover:shadow-yellow-500/60`}
          style={{
            // Ensure the text remains visible against the gradient
            padding: isMobile ? '0.35rem 0.4rem' : '0.4rem 0.7rem', // Smaller padding
          }}
        >
          <span
            className={`text-[#FAD300] drop-shadow-md lowercase`}
            style={{
              fontWeight: isMobile ? '500' : '600',
              fontSize: isMobile ? '12px' : '14px', // Smaller font size
              padding: isMobile ? '0.15rem 0.4rem' : '0.3rem 0.6rem', // Smaller padding
              letterSpacing: '0.05em',
            }}
          >
            5<sup>th</sup> <span className="text-[#FAD300] uppercase">Annual Event</span>
          </span>
        </div>

        <h1 style={{
          fontSize: isMobile ? 'clamp(2.2rem, 7vw, 3.5rem)' : 'clamp(2.6rem, 4.5vw, 4.2rem)',
          maxWidth: '1100px',
          margin: '0 auto',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontWeight: 800,
          marginBottom: isMobile ? '0.8rem' : '1.2rem'
        }}>
          <span style={{
            display: 'block',
            marginBottom: isMobile ? '1.5rem' : '1.6rem',
            textAlign: 'center'
          }}>
            <img
              src="/logo.png"
              alt="EDUTHON 5.0"
              className="mx-auto"
              style={{
                height: isMobile ? 'clamp(80px, 18vw, 110px)' : 'clamp(90px, 15vw, 120px)',
                display: 'inline-block',
                filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.5))'
              }}
            />
          </span>
          <span style={{
            display: 'block',
            fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.6rem)' : 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 600,
            opacity: 0.95
          }}>
            The Next of Education:<br /><span className="gradient-text">AI Meets Humanity</span>
          </span>
        </h1>

        <hr
          className={`mx-auto w-[180px] h-[2px] ${isMobile ? 'my-[0.4rem' : 'my-0.6'}`}
          style={{
            backgroundImage: 'linear-gradient(to right, transparent, #322B08, transparent)',
            border: 'none',
          }}
        />

        <h2 className="font-[500] mx-auto opacity-95 max-w-[700px] tracking-wider
               md:mt-[1rem] md:mb-0 text-[clamp(1.1rem,1.6vw,1.4rem)] mt-[0.4rem] mb-[0.4rem]">
          India's Most Influential Education Summit
        </h2>

        <div className="glass-container hero-event-details" style={{
          marginTop: isMobile ? '0.4rem' : '0.8rem',
          marginBottom: isMobile ? '0.2rem' : '0.4rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: isMobile ? '0.6rem 0.8rem' : '0.8rem 1.2rem',
          maxWidth: isMobile ? '90%' : '60%',
          gap: isMobile ? '0.8rem' : '2rem',
        }}>
          <div style={{
            margin: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontWeight: '500',
            fontSize: isMobile ? '0.95rem' : 'clamp(1.1rem, 2.2vw, 1.4rem)'
          }}>
            <FaCalendarAlt color="var(--secondary-color)" size={isMobile ? 22 : 26} />
            <span>August 30, 2025</span>
          </div>
          <div style={{
            margin: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontWeight: '500',
            fontSize: isMobile ? '0.95rem' : 'clamp(1.1rem, 2.2vw, 1.4rem)'
          }}>
            <FaMapMarkerAlt color="var(--secondary-color)" size={isMobile ? 22 : 26} />
            <span>Hyatt, Chandigarh</span>
          </div>
        </div>

        <div
          className="btn-container hero-buttons flex flex-wrap items-center justify-center gap-6 mx-auto w-full max-w-xs md:max-w-none"
          style={{
            marginTop: isMobile ? "0.7rem" : "1rem",
            marginBottom: isMobile ? "0.8rem" : "0.8rem",
            width: "100%",
            padding: "0",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
            background: "transparent",
          }}
        >
          <div className="btn-row"
            style={{
              display: "flex",
              flexDirection: isMobile ? "row" : "row",
              gap: isMobile ? "0.8rem" : "1rem",
              flexWrap: isMobile ? "nowrap" : "nowrap",
            }}
          >
            <RouterLink
              to="/register"
              className="w-auto"
              style={{
                textDecoration: "none"
              }}
            >
              <button
                className="btn btn-outline w-auto text-sm tracking-wider min-h-[36px] px-3 hover-glow"
                style={{
                minWidth: isMobile ? "130px" : "220px",
                borderRadius: "6px",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderWidth: "1.5px",
                borderColor: "rgba(255, 215, 0, 0.4)",
                transition: "all 0.3s ease",
                fontSize: isMobile ? "0.85rem" : "1rem",
                padding: isMobile ? "0.4rem 0.8rem" : "0.6rem 1.5rem",
                minHeight: isMobile ? "40px" : "48px",
                letterSpacing: "0.5px",
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              Register Now
            </button>
            </RouterLink>

            <ScrollLink
              to="sponsors"
              smooth={true}
              duration={800}
              offset={-70}
              className="w-auto"
              style={{
                flex: isMobile ? "1" : "none",
                maxWidth: isMobile ? "150px" : "230px",
              }}
            >
              <button
                className="btn btn-outline w-auto text-sm tracking-wider min-h-[36px] px-3 hover-glow"
                style={{
                  minWidth: isMobile ? "130px" : "220px",
                  borderRadius: "6px",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderWidth: "1.5px",
                  borderColor: "rgba(255, 215, 0, 0.4)",
                  transition: "all 0.3s ease",
                  fontSize: isMobile ? "0.85rem" : "1rem",
                  padding: isMobile ? "0.4rem 0.8rem" : "0.6rem 1.5rem",
                  minHeight: isMobile ? "40px" : "48px",
                  letterSpacing: "0.5px",
                  color: "#fff",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                Become a Sponsor
              </button>
            </ScrollLink>
          </div>

          <div className="button-row"
            style={{
              display: isMobile ? "flex" : '',
              justifyContent: "center",
              marginTop: isMobile ? "0.8rem" : "0",
            }}
          >
            <RouterLink
              to="/highlights"
              className="w-auto"
              style={{
                flex: isMobile ? "1" : "none",
                maxWidth: isMobile ? "150px" : "230px",
                textDecoration: "none",
              }}
            >
              <button
                className="btn btn-outline w-auto text-sm tracking-wider min-h-[36px] px-3 hover-glow"
                style={{
                  minWidth: isMobile ? "130px" : "220px",                  
                  borderRadius: "6px",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderWidth: "1.5px",
                  borderColor: "rgba(255, 215, 0, 0.4)",
                  transition: "all 0.3s ease",
                  fontSize: isMobile ? "0.85rem" : "1rem",
                  padding: isMobile ? "0.4rem 0.8rem" : "0.6rem 1.5rem",
                  minHeight: isMobile ? "40px" : "48px",
                  letterSpacing: "0.5px",
                  color: "#fff",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                See Highlights
              </button>
            </RouterLink>
          </div>
        </div>

        <p className="italic max-w-[800px] mx-auto mt-[1.2rem] md:mt-[1.5rem] opacity-85 text-[clamp(0.9rem,1.8vw,1.2rem)] px-4 leading-relaxed">
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
          width: 200px; 
          height: 200px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
          opacity: 0.7;
          filter: blur(20px);
          animation: float-particle1 15s ease-in-out infinite alternate;
        }
        
        .particle-2 {
          bottom: 15%;
          right: 15%;
          width: 280px; 
          height: 280px; 
          background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
          opacity: 0.8;
          filter: blur(30px); 
          animation: float-particle2 18s ease-in-out infinite alternate;
        }
        
        .particle-3 {
          top: 40%;
          right: 10%;
          width: 150px; 
          height: 150px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%);
          opacity: 0.6; 
          filter: blur(20px); 
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
          margin-bottom: 2rem; 
          display: inline-block;
          padding: 0.5rem 1.5rem; 
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background-color: rgba(255, 215, 0, 0.15);
          border-radius: 25px; 
          border: 1px solid rgba(255, 215, 0, 0.4);
          transform: scale(1); 
        }
        
        .hero-badge span {
          font-size: 0.95rem; 
          font-weight: 600;
          letter-spacing: 1px;
        }
        
        .hero-event-details {
          display: inline-flex;
          padding: 1.2rem 2rem;
          max-width: 90%;
          justify-content: center;
          gap: clamp(2rem, 5vw, 4rem); 
          flex-wrap: wrap;
          background-color: rgba(255, 255, 255, 0.05);
          transform: scale(0.9); 
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
            gap: 0.8rem;
            width: 90%;
            max-width: 220px;
          }
          
          .hero-buttons button {
            width: 100%;
            max-width: 100%;
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
            transform: scale(0.85);
          }
          
          .hero-event-details {
            transform: scale(0.85);
          }
          
          .hero-buttons {
            transform: scale(0.9);
            margin-top: 0.8rem;
            margin-bottom: 0.8rem;
          }
          
          .hero-section {
            padding-top: 50px;
            padding-bottom: 20px;
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
            padding-top: ${isMobile ? '60px' : '50px'};
          }
          
          .hero-content {
            transform: ${isMobile ? 'scale(0.85)' : 'scale(0.8)'};
            margin-top: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 