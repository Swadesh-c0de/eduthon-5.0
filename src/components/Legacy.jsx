import { FaArrowRight } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

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
          <Link to="/highlights" className="btn btn-outline" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: isMobile ? '0.8rem 1.5rem' : '0.9rem 2rem',
            fontSize: isMobile ? '0.9rem' : '1rem',
            textDecoration: 'none'
          }}>
            <span>See Highlights from Past Editions</span> <FaArrowRight />
          </Link>
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
        
        /* Timeline Base Styles */
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 0;
          z-index: 2;
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
        
        .timeline-container.visible .timeline-line {
          transform: scaleY(1);
          transition: transform 1.5s ease;
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
        
        /* Add different margins to specific timeline items in desktop */
        .timeline-container .timeline-item:nth-child(1) .timeline-content,
        .timeline-container .timeline-item:nth-child(3) .timeline-content {
          margin-left: 30px;
        }
        
        .timeline-container .timeline-item:nth-child(2) .timeline-content,
        .timeline-container .timeline-item:nth-child(4) .timeline-content {
          margin-right: 30px;
        }
        
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
        
        /* MIND-BLOWING Mobile Timeline Enhancement */
        @media (max-width: 767px) {
          .timeline-container {
            padding-left: 0;
            margin-left: 0;
            position: relative;
          }
          
          /* Hide the main vertical timeline line */
          .timeline-line {
            display: none;
          }
          
          /* Hide the original timeline dot */
          .timeline-dot {
            display: none;
          }
          
          .timeline-item {
            display: flex;
            flex-direction: column;
            margin-bottom: 50px;
            padding-left: 0;
            position: relative;
          }
          
          .timeline-item:last-child {
            margin-bottom: 30px;
          }
          
          /* Reset all timeline item styles for mobile */
          .timeline-item.left .timeline-content,
          .timeline-item.right .timeline-content,
          .timeline-container .timeline-item:nth-child(1) .timeline-content,
          .timeline-container .timeline-item:nth-child(2) .timeline-content,
          .timeline-container .timeline-item:nth-child(3) .timeline-content,
          .timeline-container .timeline-item:nth-child(4) .timeline-content {
            width: calc(100% - 35px);
            margin-left: 0;
            margin-right: 0;
            text-align: left;
            border-left: none;
            padding: 28px 22px !important;
            background: rgba(20, 20, 20, 0.9) !important;
            border-radius: 12px;
            position: relative;
            overflow: visible;
          }
          
          .timeline-content {
            margin-top: 0 !important;
            width: calc(100% - 50px) !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(212, 175, 55, 0.07) !important;
            border: 1px solid rgba(212, 175, 55, 0.12) !important;
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
            backdrop-filter: blur(10px) !important;
            position: relative;
          }
          
          .timeline-content:hover, .timeline-content:active {
            transform: translateY(-5px) !important;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(212, 175, 55, 0.15) !important;
            border: 1px solid rgba(212, 175, 55, 0.25) !important;
          }
          
          /* Create line entry and exit points for cards */
          .timeline-content::before,
          .timeline-content::after {
            content: "";
            position: absolute;
            left: -24px;
            width: 25px;
            height: 3px;
            background: linear-gradient(to right, #D4AF37, rgba(212, 175, 55, 0.3));
            z-index: 3;
          }
          
          .timeline-content::before {
            top: 30px;
          }
          
          .timeline-content::after {
            bottom: 30px;
          }
          
          /* Hide the overlay that was covering the timeline */
          .timeline-item::before {
            content: none;
          }
          
          /* Special treatment for first and last items */
          .timeline-container .timeline-item:first-child .timeline-content::before {
            background: linear-gradient(to right, #D4AF37 50%, #D4AF37);
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
            width: 30px;
            left: -29px;
          }
          
          .timeline-container .timeline-item:last-child .timeline-content::after {
            background: linear-gradient(to right, #D4AF37 50%, #D4AF37);
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
            width: 30px;
            left: -29px;
          }
          
          /* Make sure 4th card has correct styling */
          .timeline-container .timeline-item:nth-child(4) .timeline-content::before,
          .timeline-container .timeline-item:nth-child(4) .timeline-content::after {
            left: -24px;
            width: 25px;
            background: linear-gradient(to right, #D4AF37, rgba(212, 175, 55, 0.3));
          }
          
          /* Remove unwanted pseudo elements */
          .timeline-item::after {
            content: none;
          }
          
          /* Adjust card content for better alignment */
          .timeline-date {
            font-size: 0.9rem;
            margin-bottom: 15px;
            display: inline-block;
            color: #D4AF37;
            font-weight: bold;
            letter-spacing: 0.5px;
          }
          
          .timeline-date span {
            opacity: 0.9;
            font-weight: normal;
            margin-left: 5px;
          }
          
          .timeline-title {
            font-size: 1.35rem;
            margin-bottom: 15px;
            line-height: 1.3;
            font-weight: 700;
            color: white;
          }
          
          .timeline-description {
            font-size: 0.95rem;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
          }
          
          /* Modern shine effect on the timeline */
          .timeline-content {
            position: relative;
            overflow: hidden;
          }
          
          .timeline-content .shine-effect {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to bottom right,
              rgba(255, 255, 255, 0.03) 0%,
              rgba(255, 255, 255, 0) 60%
            );
            pointer-events: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Legacy;