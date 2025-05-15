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
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      icon: <FaBrain size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Thought Panels',
      description: 'Diverse perspectives on education\'s pressing questions',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      icon: <FaFlask size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'EdTech & AI Showcases',
      description: 'Cutting-edge technologies shaping tomorrow\'s classrooms',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      icon: <FaGraduationCap size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Master Classes for Educators',
      description: 'Practical skill-building sessions for education professionals',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      icon: <FaUsers size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Networking Zones',
      description: 'Connect with peers, potential partners, and industry leaders',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
    },
    {
      icon: <FaPuzzlePiece size={isMobile ? 24 : 32} color="var(--secondary-color)" />,
      title: 'Student Workshops',
      description: 'Engaging learning experiences for the next generation',
      image: 'https://images.unsplash.com/photo-1658584124309-768111d9c5db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
          fontSize: isMobile ? '1.5rem' : '2rem',
          letterSpacing: '0.02em',
          fontWeight: 600
        }}>
          What to Expect?
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
          A full-circle summit: Thought leadership, grassroots voices, and future-ready ideas — all in one room.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : 'repeat(3, minmax(0, 1fr))',
          gap: isMobile ? '1.75rem' : '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          justifyContent: 'center',
          alignItems: 'stretch',
          textAlign: isMobile ? 'center' : 'inherit'
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
                margin: isMobile ? '0 auto' : '0',
                width: isMobile ? '92%' : '100%',
                maxWidth: isMobile ? '320px' : 'none',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                borderRadius: '14px',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                overflow: 'hidden',
                boxSizing: 'border-box',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <div className="card-image-container" style={{
                width: '100%',
                height: isMobile ? '160px' : '200px',
                overflow: 'hidden',
                position: 'relative',
                borderBottom: '1px solid rgba(255, 215, 0, 0.15)',
                borderRadius: '10px',
                margin: '10px 10px 0'
              }}>
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    borderRadius: '10px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '60%',
                  background: 'linear-gradient(to top, rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0))',
                  borderRadius: '10px'
                }}></div>
              </div>
              
              <div className="card-content" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '100%',
                padding: isMobile ? '1.75rem 1.25rem' : '1.5rem 1.25rem',
                width: '100%',
                justifyContent: 'flex-start'
              }}>
                <div className="icon-wrapper" style={{
                  width: isMobile ? '56px' : '68px',
                  height: isMobile ? '56px' : '68px',
                  marginBottom: isMobile ? '1.25rem' : '1.5rem',
                  marginTop: isMobile ? '-2.5rem' : '-3rem',
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  zIndex: 1,
                  backgroundColor: 'rgba(30, 30, 30, 0.9)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  marginBottom: isMobile ? '0.85rem' : '1.25rem',
                  color: 'var(--secondary-color)',
                  fontSize: isMobile ? '1.1rem' : '1.25rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  letterSpacing: '0.02em'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0,
                  lineHeight: 1.7,
                  fontSize: isMobile ? '0.9rem' : '0.95rem',
                  textAlign: 'center',
                  flexGrow: 1,
                  letterSpacing: '0.01em'
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .what-to-expect-card {
          position: relative;
          overflow: hidden;
        }
        
        .what-to-expect-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0) 50%);
          z-index: 0;
        }
        
        .what-to-expect-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 12px 24px rgba(255, 215, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 215, 0, 0.3);
        }
        
        .what-to-expect-card:hover .icon-wrapper {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(212, 175, 55, 0.18);
          border-color: rgba(212, 175, 55, 0.4);
        }
        
        .what-to-expect-card:hover img {
          transform: scale(1.08);
        }
        
        .icon-wrapper {
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .what-to-expect-card {
            margin: 0 auto;
            width: 92%;
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatToExpect;