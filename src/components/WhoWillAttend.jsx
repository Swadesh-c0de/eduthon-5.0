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
    <section id="who-will-attend" className="section" style={{
      backgroundColor: '#0c0c0c',
      paddingTop: isMobile ? '4rem' : '6rem',
      paddingBottom: isMobile ? '4rem' : '6rem',
    }}>
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`}>
        <h2 className="text-center" style={{ 
          maxWidth: '800px', 
          margin: '0 auto 1rem',
          fontSize: isMobile ? '1.5rem' : '2rem'
        }}>
          Who Will Attend?
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
          maxWidth: '800px',
          margin: isMobile ? '1rem auto 2.5rem' : '1.5rem auto 4rem',
          color: 'var(--secondary-color)',
          padding: '0 1rem',
        }}>
          The Most Influential Room in Indian Education
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? 'repeat(auto-fill, minmax(150px, 1fr))' 
            : 'repeat(5, minmax(0, 1fr))',
          gap: isMobile ? '1rem' : '1.25rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          alignItems: 'stretch'
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
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 215, 0, 0.15)',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              <div className="card-content" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '100%',
                padding: isMobile ? '1.25rem 0.75rem' : '1.5rem 1rem',
                width: '100%',
                justifyContent: 'flex-start'
              }}>
                <div className="icon-wrapper" style={{
                  width: isMobile ? '44px' : '52px',
                  height: isMobile ? '44px' : '52px',
                  marginBottom: isMobile ? '0.6rem' : '1rem',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {React.cloneElement(attendee.icon, { size: isMobile ? 20 : 26 })}
                </div>
                <h3 style={{ 
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  marginBottom: isMobile ? '0.5rem' : '0.75rem',
                  color: 'var(--secondary-color)',
                  fontWeight: '600',
                  lineHeight: 1.25,
                  textAlign: 'center',
                  minHeight: '2.5em'
                }}>
                  {attendee.title}
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: isMobile ? '0.75rem' : '0.85rem',
                  margin: 0,
                  lineHeight: 1.4,
                  textAlign: 'center',
                  flexGrow: 1
                }}>
                  {attendee.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .who-will-attend-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.1), 0 6px 6px rgba(255, 215, 0, 0.08);
        }
      `}</style>
    </section>
  );
};

export default WhoWillAttend;