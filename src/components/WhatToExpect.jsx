import { useInView } from 'react-intersection-observer';
import { FaMicrophone, FaBrain, FaFlask, FaGraduationCap, FaUsers, FaPuzzlePiece } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const WhatToExpect = () => {
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

  const features = [
    {
      icon: <FaMicrophone size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Keynotes & Fireside Chats',
      description: 'Insightful talks from education leaders and innovators',
    },
    {
      icon: <FaBrain size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Thought Panels',
      description: 'Diverse perspectives on education\'s pressing questions',
    },
    {
      icon: <FaFlask size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'EdTech & AI Showcases',
      description: 'Cutting-edge technologies shaping tomorrow\'s classrooms',
    },
    {
      icon: <FaGraduationCap size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Master Classes for Educators',
      description: 'Practical skill-building sessions for education professionals',
    },
    {
      icon: <FaUsers size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Networking Zones',
      description: 'Connect with peers, potential partners, and industry leaders',
    },
    {
      icon: <FaPuzzlePiece size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Student Workshops',
      description: 'Engaging learning experiences for the next generation',
    },
  ];

  return (
    <section id="what-to-expect" className="section" style={{
      backgroundColor: '#000000',
      paddingTop: isMobile ? '4rem' : '6rem',
      paddingBottom: isMobile ? '4rem' : '6rem',
    }}>
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`}>
        <h2 className="text-center" style={{ 
          maxWidth: '800px', 
          margin: '0 auto 1rem',
          fontSize: isMobile ? '1.5rem' : '2rem'
        }}>
          What to Expect?
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
          maxWidth: '800px',
          margin: isMobile ? '1rem auto 2.5rem' : '1.5rem auto 4rem',
          color: 'var(--secondary-color)',
          padding: '0 1rem',
        }}>
          A full-circle summit: Thought leadership, grassroots voices, and future-ready ideas — all in one room.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? 'repeat(auto-fill, minmax(180px, 1fr))' 
            : 'repeat(3, minmax(0, 1fr))',
          gap: isMobile ? '1.5rem' : '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card what-to-expect-card"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: '0',
                width: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                overflow: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              <div className="card-content" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '100%',
                padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem',
                width: '100%',
                justifyContent: 'flex-start'
              }}>
                <div className="icon-wrapper" style={{
                  width: isMobile ? '52px' : '64px',
                  height: isMobile ? '52px' : '64px',
                  marginBottom: isMobile ? '1rem' : '1.5rem',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  marginBottom: isMobile ? '0.75rem' : '1.25rem',
                  color: 'var(--secondary-color)',
                  fontSize: isMobile ? '1.05rem' : '1.25rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: 1.3
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                  lineHeight: 1.6,
                  fontSize: isMobile ? '0.875rem' : '0.95rem',
                  textAlign: 'center',
                  flexGrow: 1
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .what-to-expect-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.1), 0 6px 6px rgba(255, 215, 0, 0.08);
        }
      `}</style>
    </section>
  );
};

export default WhatToExpect;