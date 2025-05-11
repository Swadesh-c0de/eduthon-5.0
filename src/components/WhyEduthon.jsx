import { useInView } from 'react-intersection-observer';
import { FaCheck } from 'react-icons/fa';

const WhyEduthon = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reasons = [
    "India's only education summit uniting 500+ decision-makers under one roof",
    "Sparks real conversations on curriculum, classrooms, and co-scholastic learning",
    "Platform for diverse voices: educators, youth, policymakers, entrepreneurs",
    "Known for inspiring action — not just dialogue"
  ];

  return (
    <section id="why-eduthon" className="section" style={{
      backgroundColor: '#000000',
      paddingTop: '6rem',
      paddingBottom: '6rem',
    }}>
      <div ref={ref} className={`container fade-in ${inView ? 'appear' : ''}`}>
        <h2 className="text-center" style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
          Why EDUTHON Matters?
        </h2>
        
        <p className="text-center" style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '800px',
          margin: '1.5rem auto 4rem',
          color: 'var(--secondary-color)',
          padding: '0 0.5rem',
        }}>
          Not Just a Summit. A National Platform for Educational Change.
        </p>
        
        <div className="card" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
        }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {reasons.map((reason, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: '1.6',
                paddingRight: '0.5rem'
              }}>
                <span style={{ 
                  color: 'var(--secondary-color)',
                  marginRight: '1rem',
                  marginTop: '0.3rem',
                  flexShrink: 0
                }}>
                  <FaCheck />
                </span>
                {reason}
              </li>
            ))}
          </ul>
          
          <div style={{
            margin: '3rem 0 0',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            textAlign: 'center',
            background: 'rgba(212, 175, 55, 0.05)',
            borderRadius: '0 0 8px 8px',
          }}>
            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'var(--secondary-color)',
              margin: 0,
              lineHeight: 1.5
            }}>
              "At EDUTHON, we don't just discuss the future of education — we shape it."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyEduthon;