import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaLightbulb, FaLandmark, FaGlobe, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import React from 'react';

const WhoWillAttend = () => {
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

  const attendees = [
    {
      icon: <FaGraduationCap size={isMobile ? 24 : 30} color="var(--secondary-color)" />,
      title: '500+ Principals & School Owners',
      description: 'Key decision-makers from leading educational institutions',
    },
    {
      icon: <FaLightbulb size={isMobile ? 24 : 30} color="var(--secondary-color)" />,
      title: 'EdTech CXOs & Innovators',
      description: 'Pioneers developing next-generation learning solutions',
    },
    {
      icon: <FaLandmark size={isMobile ? 24 : 30} color="var(--secondary-color)" />,
      title: 'Government Policy Leaders',
      description: 'Representatives shaping national education frameworks',
    },
    {
      icon: <FaGlobe size={isMobile ? 24 : 30} color="var(--secondary-color)" />,
      title: 'Education Influencers & Media',
      description: 'Thought leaders and content creators in the education space',
    },
    {
      icon: <FaStar size={isMobile ? 24 : 30} color="var(--secondary-color)" />,
      title: 'Youth Delegates',
      description: 'The voices of those most impacted by educational transformation',
    },
  ];

  return (
    <section id="who-will-attend" className="section who-will-attend-section" style={{
      position: 'relative',
      backgroundColor: '#0c0c0c',
      paddingTop: isMobile ? '4rem' : '7rem',
      paddingBottom: isMobile ? '4rem' : '7rem',
      overflow: 'hidden',
    }}>
      {/* Background patterns */}
      <div className="bg-pattern-dots" style={{
        position: 'absolute',
        top: isMobile ? '10%' : '15%',
        right: isMobile ? '-50px' : '5%',
        width: isMobile ? '100px' : '200px',
        height: isMobile ? '100px' : '200px',
        backgroundImage: 'radial-gradient(rgba(255, 215, 0, 0.15) 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        zIndex: 0,
        opacity: 0.6,
      }}></div>
      
      <div className="bg-pattern-dots" style={{
        position: 'absolute',
        bottom: isMobile ? '10%' : '15%',
        left: isMobile ? '-50px' : '5%',
        width: isMobile ? '100px' : '200px',
        height: isMobile ? '100px' : '200px',
        backgroundImage: 'radial-gradient(rgba(255, 215, 0, 0.15) 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        zIndex: 0,
        opacity: 0.6,
      }}></div>
      
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`} style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" style={{
          marginBottom: isMobile ? '3rem' : '5rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            maxWidth: '800px', 
            margin: '0 auto 1.5rem',
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            letterSpacing: '0.02em',
            fontWeight: 700,
            position: 'relative',
            display: 'inline-block'
          }}>
            Who Will Attend?
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '80px' : '120px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--secondary-color), transparent)',
              borderRadius: '3px'
            }}></span>
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1rem' : '1.3rem',
            maxWidth: '800px',
            margin: '2rem auto 0',
            color: 'var(--secondary-color)',
            padding: '0 1rem',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
            fontWeight: '500'
          }}>
            The Most Influential Room in Indian Education
          </p>
        </div>
        
        <div className="attendees-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: isMobile ? '2.5rem' : '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          alignItems: 'stretch',
          justifyContent: 'center',
          textAlign: isMobile ? 'center' : 'inherit'
        }}>
          {attendees.map((attendee, index) => (
            <div 
              key={index}
              className="card who-will-attend-card"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: isMobile ? '0 auto' : '0',
                width: isMobile ? '92%' : '100%',
                maxWidth: isMobile ? '330px' : 'none',
                transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.95))',
                borderRadius: '18px',
                border: '1px solid rgba(255, 215, 0, 0.15)',
                overflow: 'hidden',
                boxSizing: 'border-box',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                position: 'relative'
              }}
            >
              <div className="card-content" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '100%',
                padding: isMobile ? '2.5rem 1.5rem' : '3rem 1.75rem',
                width: '100%',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <div className="icon-wrapper" style={{
                  width: isMobile ? '70px' : '80px',
                  height: isMobile ? '70px' : '80px',
                  marginBottom: isMobile ? '1.5rem' : '1.75rem',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(212, 175, 55, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  position: 'relative'
                }}>
                  <div className="icon-inner" style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'rgba(25, 25, 25, 0.8)',
                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    {React.cloneElement(attendee.icon, { size: isMobile ? 28 : 34 })}
                  </div>
                  <div className="icon-glow" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                    filter: 'blur(5px)',
                    zIndex: -1
                  }}></div>
                </div>
                
                <h3 style={{ 
                  fontSize: isMobile ? '1.2rem' : '1.35rem',
                  marginBottom: isMobile ? '1.25rem' : '1.5rem',
                  color: 'var(--secondary-color)',
                  fontWeight: '600',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  minHeight: 'auto',
                  letterSpacing: '0.02em',
                  position: 'relative',
                  paddingBottom: '0.75rem'
                }}>
                  {attendee.title}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isMobile ? '40px' : '50px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
                    borderRadius: '2px'
                  }}></span>
                </h3>
                
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  margin: 0,
                  lineHeight: 1.7,
                  textAlign: 'center',
                  flexGrow: 1,
                  letterSpacing: '0.01em'
                }}>
                  {attendee.description}
                </p>
              </div>
              
              <div className="card-accent-top" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)',
                opacity: 0,
                transition: 'opacity 0.4s ease'
              }}></div>
              
              <div className="card-bg-pattern" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                opacity: 0.04,
                backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(212, 175, 55, 0.4) 0%, transparent 25%)',
                zIndex: 0
              }}></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .who-will-attend-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
        }
        
        .who-will-attend-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        
        .who-will-attend-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35), 0 10px 20px rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.4);
        }
        
        .who-will-attend-card:hover .icon-wrapper {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 8px 15px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.5);
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.08));
        }
        
        .who-will-attend-card:hover .card-accent-top {
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .who-will-attend-card {
            margin: 0 auto;
            width: 92%;
            max-width: 330px;
          }
          
          .who-will-attend-card:hover {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
};

export default WhoWillAttend;