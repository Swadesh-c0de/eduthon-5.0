import { useInView } from 'react-intersection-observer';
import { FaBullseye, FaGlobe, FaMicrophone, FaHandshake, FaLightbulb } from 'react-icons/fa';

const Sponsors = ({ onRegisterClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: <FaBullseye size={24} />,
      title: 'Direct Access to 500+ Decision Makers',
    },
    {
      icon: <FaGlobe size={24} />,
      title: 'Premium Brand Visibility',
    },
    {
      icon: <FaMicrophone size={24} />,
      title: 'Stage + Content Integration',
    },
    {
      icon: <FaHandshake size={24} />,
      title: 'Partnership-Driven Networking',
    },
    {
      icon: <FaLightbulb size={24} />,
      title: 'Association with Purpose and Trust',
    },
  ];

  return (
    <section id="sponsors" className="section" style={{
      backgroundColor: '#0c0c0c',
      paddingTop: '6rem',
      paddingBottom: '6rem',
    }}>
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`}>
        <h2 className="text-center" style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
          Be a Sponsor
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '800px',
          margin: '1.5rem auto 2rem',
          color: 'var(--secondary-color)',
          padding: '0 0.5rem',
        }}>
          Reach decision-makers. Build lasting visibility. Shape the future of education.
        </p>
        
        <p className="text-center" style={{
          maxWidth: '800px',
          margin: '0 auto 4rem',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          padding: '0 1rem',
        }}>
          Sponsoring EDUTHON 5.0 means standing at the intersection of influence and impact.
          Your brand becomes a part of the national dialogue on education, AI, and leadership.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '900px',
          margin: '0 auto 3rem',
          padding: '0 0.5rem',
        }}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="card sponsor-benefit-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.2rem',
                backgroundColor: 'rgba(30, 30, 30, 0.7)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 215, 0, 0.15)',
                boxSizing: 'border-box',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div style={{ 
                color: 'var(--secondary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.1)',
                flexShrink: 0
              }}>
                {benefit.icon}
              </div>
              <p style={{ 
                margin: 0, 
                fontWeight: '500',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                lineHeight: 1.4
              }}>
                {benefit.title}
              </p>
            </div>
          ))}
        </div>
        
        <div className="card" style={{
          maxWidth: '700px',
          margin: '3rem auto',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          background: 'rgba(212, 175, 55, 0.05)',
          textAlign: 'center',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          borderRadius: '10px',
          boxSizing: 'border-box'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontStyle: 'italic',
            color: 'var(--secondary-color)',
            margin: 0,
            lineHeight: 1.5
          }}>
            This isn't just a sponsorship. It's a front-row seat to India's education revolution — and a chance to shape it.
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
        }}>
          <button 
            className="btn"
            onClick={() => onRegisterClick('sponsor')}
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              minWidth: 'clamp(180px, 40vw, 220px)'
            }}
          >
            View Sponsorship Tiers
          </button>
        </div>
      </div>
      <style>{`
        .sponsor-benefit-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.1), 0 6px 6px rgba(255, 215, 0, 0.08);
        }
      `}</style>
    </section>
  );
};

export default Sponsors;