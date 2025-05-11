import { FaEnvelope, FaPhone, FaGlobe, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#000000',
      padding: '3rem 1rem',
      borderTop: '1px solid rgba(212, 175, 55, 0.3)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FaEnvelope style={{ color: 'var(--secondary-color)' }} />
            <a href="mailto:trinitichd@gmail.com" style={{ color: '#fff' }}>
              trinitichd@gmail.com
            </a>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FaPhone style={{ color: 'var(--secondary-color)' }} />
            <a href="tel:+919815088426" style={{ color: '#fff' }}>
              +91 98150 88426
            </a>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FaGlobe style={{ color: 'var(--secondary-color)' }} />
            <a href="https://www.triniti.org.in" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>
              www.triniti.org.in
            </a>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FaInstagram style={{ color: 'var(--secondary-color)' }} />
            <a href="https://www.instagram.com/triniti_org" target="_blank" rel="noreferrer" style={{ color: '#fff' }}>
              @triniti_org
            </a>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem'
        }}>
          © TRINITi | EDUTHON 5.0
        </div>
      </div>
    </footer>
  );
};

export default Footer; 