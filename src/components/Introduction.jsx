import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const Introduction = () => {
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
    <section id="introduction" className="section" style={{
      backgroundColor: '#0c0c0c',
      paddingTop: isMobile ? '4rem' : '6rem',
      paddingBottom: isMobile ? '4rem' : '6rem',
    }}>
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`}>
        <h2 className="text-center" style={{ 
          maxWidth: '800px', 
          margin: '0 auto 1.5rem',
          fontSize: isMobile ? '1.5rem' : '2rem',
          padding: '0 0.75rem'
        }}>
          Introducing EDUTHON 5.0 – Where AI Meets Humanity
        </h2>
        
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8',
          fontSize: isMobile ? '0.95rem' : 'clamp(1rem, 2vw, 1.1rem)',
          padding: '0 1rem',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          <p style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
            EDUTHON is India's most dynamic summit on educational innovation — an annual gathering of 500+ school principals, policymakers, EdTech founders, academic visionaries, and cultural influencers.
          </p>
          
          <p style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
            After 4 successful editions, this landmark summit returns with EDUTHON 5.0 a timely and transformative theme:
          </p>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : 'clamp(1.2rem, 3vw, 1.5rem)',
            fontWeight: '600',
            textAlign: 'center',
            margin: isMobile ? '2rem 0' : '2.5rem 0',
            color: 'var(--secondary-color)',
            fontStyle: 'italic',
            padding: '0 0.5rem',
          }}>
            "The Next of Education: AI Meets Humanity"
          </p>
          
          <p style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
            How do we harness Artificial Intelligence in education while preserving the essential human elements — empathy, creativity, and co-scholastic intelligence?
          </p>
          
          <p>
            This is where innovation and humanity converge — and where the future of education takes shape.
          </p>
        </div>
        
        <div className="card" style={{
          position: 'relative',
          padding: isMobile ? '1.25rem 1.5rem' : 'clamp(1.5rem, 4vw, 2rem)',
          maxWidth: '700px',
          textAlign: 'center',
          borderLeft: '3px solid var(--secondary-color)',
          borderRight: '3px solid var(--secondary-color)',
          background: 'rgba(212, 175, 55, 0.05)',
          width: isMobile ? 'calc(100% - 2rem)' : 'auto',
          margin: isMobile ? '3rem auto 0' : '4rem auto 0'
        }}>
          <p style={{
            fontSize: isMobile ? '0.95rem' : 'clamp(1rem, 2vw, 1.2rem)',
            fontStyle: 'italic',
            color: 'var(--secondary-color)',
            margin: 0,
          }}>
            Welcome to the frontline of education's most important conversation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;