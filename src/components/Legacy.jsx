import { FaArrowRight } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

const Legacy = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const editions = [
    {
      id: 1,
      date: 'Apr 2022',
      title: 'Bold Beginnings',
      description: '1st EDUTHON with top educators, bureaucrats, and innovators.'
    },
    {
      id: 2,
      date: 'Dec 2022',
      title: 'Winds of Change',
      description: 'Chetan Bhagat leads the conversation'
    },
    {
      id: 3,
      date: 'Oct 2023',
      title: 'Reimagining Classrooms',
      description: 'With Barkha Dutt'
    },
    {
      id: 4,
      date: 'Oct 2024',
      title: 'Chalkboard to Chatbot',
      description: 'Robotics & AI in focus - with Saurabh Dwivedi & Dr. Swaroop Sampat'
    }
  ];

  return (
    <section 
      id="legacy" 
      className="section" 
      ref={sectionRef}
      style={{
        backgroundColor: '#0c0c0c',
        paddingTop: isMobile ? '4rem' : '6rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background elements */}
      <div className="bg-elements">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
      </div>

      <div className="container">
        <h2 className="text-center" style={{
          color: 'var(--text-color, #FFFFFF)',
          fontSize: isMobile ? '1.8rem' : '2.25rem',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 2
        }}>Our Legacy</h2>
        
        <p className="text-center" style={{
          margin: '0 auto 1.5rem',
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          color: 'var(--text-light-emphasis, #CCCCCC)',
          maxWidth: '700px',
          lineHeight: 1.6,
          position: 'relative',
          zIndex: 2
        }}>
          …From a Local Gathering to a National Movement
        </p>
        
        <p className="text-center text-gold" style={{
          margin: '0 auto 3rem',
          fontSize: isMobile ? '1rem' : '1.2rem',
          fontWeight: '600',
          position: 'relative',
          zIndex: 2
        }}>
          4 Editions. 2000+ Attendees. 50+ Influential Speakers. And Growing.
        </p>
        
        <div className={`timeline-container ${isVisible ? 'visible' : ''}`}>
          {/* Main timeline line */}
          <div className="timeline-line"></div>
          
          {editions.map((edition, index) => (
            <div 
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="timeline-dot">
                <span className="dot-pulse"></span>
              </div>
              <div className="timeline-content">
                <div className="timeline-date">
                  EDUTHON {edition.id}.0 <span>({edition.date})</span>
                </div>
                <h3 className="timeline-title">"{edition.title}"</h3>
                <p className="timeline-description">{edition.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center" style={{
          fontSize: isMobile ? '1rem' : '1.15rem',
          margin: '4rem auto 2rem',
          padding: '0 1rem',
          color: 'var(--text-light-emphasis, #CCCCCC)',
          maxWidth: '700px',
          lineHeight: 1.7,
          position: 'relative',
          zIndex: 2
        }}>
          Now, EDUTHON 5.0 asks the biggest question yet.
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
          position: 'relative',
          zIndex: 2
        }}>
          <button className="btn btn-outline" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: isMobile ? '0.8rem 1.5rem' : '0.9rem 2rem',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            <span>See Highlights from Past Editions</span> <FaArrowRight />
          </button>
        </div>
      </div>
      
      <style>{`
        .bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .circle-1, .circle-2, .circle-3 {
          position: absolute;
          border-radius: 50%;
          opacity: 0.05;
          background: linear-gradient(135deg, var(--secondary-color) 0%, transparent 70%);
        }
        
        .circle-1 {
          width: 40vw;
          height: 40vw;
          top: -10%;
          right: -10%;
        }
        
        .circle-2 {
          width: 25vw;
          height: 25vw;
          bottom: 20%;
          left: -5%;
          opacity: 0.07;
        }
        
        .circle-3 {
          width: 15vw;
          height: 15vw;
          bottom: 10%;
          right: 20%;
          opacity: 0.03;
        }
        
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 0;
          z-index: 2;
        }
        
        .timeline-container.visible .timeline-line {
          transform: scaleY(1);
          transition: transform 1.5s ease;
        }
        
        .timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 3px;
          background: linear-gradient(to bottom, 
            rgba(212, 175, 55, 0.1) 0%,
            rgba(212, 175, 55, 0.4) 15%, 
            rgba(212, 175, 55, 0.6) 50%,
            rgba(212, 175, 55, 0.4) 85%,
            rgba(212, 175, 55, 0.1) 100%);
          transform: scaleY(0);
          transform-origin: top center;
          z-index: 1;
        }
        
        @media (max-width: 767px) {
          .timeline-line {
            left: 25px;
          }
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 50px;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .timeline-container.visible .timeline-item {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-dot {
          position: absolute;
          width: 18px;
          height: 18px;
          background-color: var(--secondary-color);
          border-radius: 50%;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
        }
        
        .dot-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(212, 175, 55, 0.7);
          opacity: 0;
          animation: pulse 2s infinite;
          top: 0;
          left: 0;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          70% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        .timeline-content {
          position: relative;
          padding: 25px;
          border-radius: 12px;
          background: rgba(38, 38, 38, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform: perspective(1000px) rotateX(0deg);
          transform-style: preserve-3d;
          width: 45%;
        }
        
        .timeline-content:hover {
          transform: perspective(1000px) rotateX(2deg) translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.3);
        }
        
        /* Arrow connector removed */
        
        .timeline-item.left .timeline-content {
          margin-left: auto;
          margin-right: 50px;
          text-align: right;
        }
        
        .timeline-item.right .timeline-content {
          margin-left: 50px;
          margin-right: auto;
          text-align: left;
        }
        
        /* Arrow positioning removed */
        
        .timeline-date {
          color: var(--secondary-color);
          margin-bottom: 10px;
          font-size: 0.85rem;
          font-weight: bold;
        }
        
        .timeline-date span {
          opacity: 0.8;
          font-weight: normal;
        }
        
        .timeline-title {
          font-size: 1.25rem;
          color: var(--text-color, #FFFFFF);
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        .timeline-description {
          font-size: 0.9rem;
          color: var(--text-light-emphasis, #CCCCCC);
          line-height: 1.6;
          margin: 0;
        }
        
        @media (max-width: 767px) {
          .timeline-dot {
            left: 25px;
            transform: translateX(0);
          }
          
          .timeline-item.left .timeline-content,
          .timeline-item.right .timeline-content {
            width: calc(100% - 60px);
            margin-left: 50px;
            margin-right: 0;
            text-align: left;
          }
          
          /* Mobile arrow positioning removed */
        }
      `}</style>
    </section>
  );
};

export default Legacy;