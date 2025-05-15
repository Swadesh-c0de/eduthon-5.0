import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Highlights = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeEdition, setActiveEdition] = useState(4);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesEduthon1, setImagesEduthon1] = useState([]);
  const [imagesEduthon2, setImagesEduthon2] = useState([]);
  const [imagesEduthon3, setImagesEduthon3] = useState([]);
  const [imagesEduthon4, setImagesEduthon4] = useState([]);

  const image_url = 'https://ik.imagekit.io/patelswadesh/EDUTHON%20'

  useEffect(() => {
    setIsLoading(true);
    setImagesEduthon1(['1','2','3','4','5','6','7'].map(i => image_url + '1.0/eduthon1.0-' + i + '.jpg'));
    setImagesEduthon2(['1','2','3','4','5','6','7'].map(i => image_url + '2.0/eduthon2.0-' + i + '.jpg'));
    setImagesEduthon3(['1','2','3','4','5','6','7','8','9'].map(i => image_url + '3.0/eduthon3.0-' + i + '.jpg'));
    setImagesEduthon4(['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'].map(i => image_url + '4.0/eduthon4.0-' + i + '.jpg'));
    
    // Set loading to false once images are set
    setIsLoading(false);
  }, []);

  // Scroll to top immediately before React mounts
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    // This runs after component mounts
    // Multiple approaches to ensure scroll to top works in all browsers
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari

    // Timeout to handle any delayed rendering
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    // Handle header visibility on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsHeaderVisible(lastScrollY > currentScrollY);
      } else {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Call this function when component mounts and when active edition changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeEdition]);

  // Mock data for past editions
  const editions = [
    {
      id: 1,
      title: "Bold Beginnings",
      date: "April 2022",
      description: "The inaugural EDUTHON brought together top educators, bureaucrats, and innovators to kickstart a conversation about the future of education in India.",
      images: imagesEduthon1,
      color: "rgb(255, 193, 7)"
    },
    {
      id: 2,
      title: "Winds of Change",
      date: "December 2022",
      description: "With bestselling author Chetan Bhagat as the keynote speaker, EDUTHON 2.0 explored how storytelling and narrative can transform educational outcomes.",
      images: imagesEduthon2,
      color: "rgb(52, 152, 219)"
    },
    {
      id: 3,
      title: "Reimagining Classrooms",
      date: "October 2023",
      description: "Acclaimed journalist Barkha Dutt led conversations on how physical and virtual learning environments are evolving in the post-pandemic era.",
      images: imagesEduthon3,
      color: "rgb(155, 89, 182)"
    },
    {
      id: 4,
      title: "Chalkboard to Chatbot",
      date: "October 2024",
      description: "With a special focus on AI and robotics in education, EDUTHON 4.0 featured journalist Saurabh Dwivedi and actress/educator Dr. Swaroop Sampat.",
      images: imagesEduthon4,
      color: "rgb(231, 76, 60)"
    }
  ];

  const handleEditionClick = (id) => {
    setActiveEdition(id);

    // Smooth scroll to gallery section on mobile
    if (isMobile && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    if (!lightboxImage || !editions[activeEdition - 1] || !editions[activeEdition - 1].images || editions[activeEdition - 1].images.length === 0) return;
    
    // Find the current image in the currentEdition.images array
    const currentIndex = editions[activeEdition - 1].images.findIndex(
      imageUrl => imageUrl === lightboxImage.secure_url
    );
    
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % editions[activeEdition - 1].images.length;
    } else {
      newIndex = (currentIndex - 1 + editions[activeEdition - 1].images.length) % editions[activeEdition - 1].images.length;
    }
    
    const newImageUrl = editions[activeEdition - 1].images[newIndex];
    setLightboxImage({
      secure_url: newImageUrl,
      alt: `Eduthon ${activeEdition}.0 Image ${newIndex + 1}`,
      caption: `From ${editions[activeEdition - 1].title} - Eduthon ${activeEdition}.0`
    });
  };

  const currentEdition = editions.find(edition => edition.id === activeEdition);

  return (
    <div className="highlights-page">
      {/* Hero Banner */}
      <div className="hero-banner" style={{
        position: 'relative',
        height: isMobile ? '45vh' : '60vh',
        minHeight: isMobile ? '300px' : '300px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="particle-overlay" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 215, 0, 0.18) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
          pointerEvents: 'none',
          animation: 'particlesDrift 60s linear infinite'
        }}></div>

        {/* Back button at top left */}
        <Link
          to="/"
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#FFD700',
            transition: 'all 0.3s ease',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            zIndex: 10
          }}
          aria-label="Back to homepage"
        >
          <FaArrowLeft />
        </Link>

        {/* Hero Content */}
        <div className="hero-content" style={{
          maxWidth: '900px',
          width: '100%',
          textAlign: 'center',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 2,
          transform: 'scale(0.95)',
          transformOrigin: 'center center'
        }}>
          <div
            className="hero-badge mx-auto mb-3"
            style={{
              width: isMobile ? '180px' : '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              background: 'linear-gradient(to right, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.1))',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25), 0 0 10px rgba(255, 215, 0, 0.15)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              padding: isMobile ? '0.4rem 0.4rem' : '0.5rem 0.8rem',
              margin: isMobile ? '0 auto 1rem' : '0 auto 1.5rem',
              opacity: 0,
              animation: 'fadeUp 1s forwards 0.2s'
            }}
          >
            <span
              style={{
                color: '#FFD700',
                fontWeight: isMobile ? 500 : 600,
                fontSize: isMobile ? '14px' : '15px',
                letterSpacing: '0.05em',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Our Journey
            </span>
          </div>

          <h1 style={{
            fontSize: isMobile ? 'clamp(2.5rem, 8vw, 3.5rem)' : 'clamp(3.5rem, 6vw, 5rem)',
            fontWeight: '800',
            marginBottom: '1.2rem',
            background: 'linear-gradient(45deg, #fff, var(--secondary-color, #FFD700))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em',
            opacity: 0,
            animation: 'fadeUp 1s forwards'
          }}>
            EDUTHON Legacy
          </h1>

          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            maxWidth: '700px',
            margin: '0 auto',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.6,
            fontWeight: '400',
            opacity: 0,
            animation: 'fadeUp 1s forwards 0.3s'
          }}>
            A journey through our mission to transform education in India across four groundbreaking editions
          </p>
        </div>

        {/* Backdrop gradients */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 30% 70%, rgba(212, 175, 55, 0.2) 0%, transparent 60%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>
      </div>

      {/* Header - now floating */}
      <header
        ref={headerRef}
        className="highlights-header"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.92)',
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            margin: '0 auto',
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            background: 'linear-gradient(to right, #fff, var(--secondary-color, #FFD700))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            overflow: 'hidden',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.01em'
          }}>
            EDUTHON Highlights
          </h1>
        </div>
      </header>

      {/* Edition selection section */}
      <section className="edition-select-section" style={{
        backgroundColor: '#0a0a0a',
        padding: isMobile ? '3rem 0' : '5rem 0 3rem',
        position: 'relative',
        borderBottom: '1px solid rgba(255, 215, 0, 0.05)'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: isMobile ? '1.8rem' : '2.2rem',
            textAlign: 'center',
            marginTop: '0.1rem',
            marginLeft: 'auto',
            marginRight: '50%',
            marginBottom: '3rem',
            color: '#fff',
            fontWeight: 700,
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            Explore Our Journey
          </h2>

          {/* Visual edition selector with glowing edges */}
          <div className="edition-tabs" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? '1rem' : '1.5rem',
            margin: '0 auto',
            maxWidth: '900px'
          }}>
            {editions.reverse().map(edition => (
              <button
                key={edition.id}
                onClick={() => handleEditionClick(edition.id)}
                style={{
                  backgroundColor: activeEdition === edition.id
                    ? 'rgba(20, 20, 20, 0.9)'
                    : 'rgba(15, 15, 15, 0.7)',
                  color: activeEdition === edition.id
                    ? edition.color
                    : 'rgba(255, 255, 255, 0.7)',
                  border: `1px solid ${activeEdition === edition.id ? edition.color : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  padding: isMobile ? '1.25rem 1rem' : '1.5rem 2rem',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: activeEdition === edition.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  flexGrow: 1,
                  flexBasis: isMobile ? '40%' : '18%',
                  maxWidth: isMobile ? '45%' : '20%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: activeEdition === edition.id
                    ? `0 10px 25px rgba(0, 0, 0, 0.25), 0 0 15px rgba(${edition.color.match(/\d+/g).join(',')}, 0.3)`
                    : '0 5px 15px rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  transform: 'translateY(0)',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {activeEdition === edition.id && (
                  <span style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at center, ${edition.color}25 0%, transparent 70%)`,
                    opacity: 0.8
                  }}></span>
                )}

                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  fontWeight: 700
                }}>
                  {edition.id}.0
                </span>

                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  opacity: 0.9,
                  fontSize: isMobile ? '0.8rem' : '0.9rem'
                }}>
                  {edition.date}
                </span>

                {activeEdition === edition.id && (
                  <span className="active-indicator" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40%',
                    height: '3px',
                    background: edition.color,
                    borderRadius: '3px 3px 0 0'
                  }}></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Background design elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 0
        }}></div>
      </section>

      {/* Main content */}
      <main style={{
        backgroundColor: '#0c0c0c',
        padding: '0 0 6rem',
        minHeight: '50vh'
      }}>
        <div className="container">
          {/* Active edition content */}
          {currentEdition && (
            <div className="edition-content" style={{
              maxWidth: '1200px', // Increased from 1000px for larger gallery
              margin: '0 auto'
            }}>
              {/* Header with details */}
              <div className="edition-header" style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                marginBottom: '3.5rem',
                padding: isMobile ? '2rem 1.5rem' : '2.5rem',
                borderRadius: '20px',
                background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.6), rgba(10, 10, 10, 0.8))',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 0, 0, 0.1)'
              }}>
                {/* Background with edition color */}
                <div className="header-bg" style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at top right, ${currentEdition.color}25, transparent 70%)`,
                  opacity: 0.9
                }}></div>

                <div className="header-content" style={{
                  position: 'relative',
                  zIndex: 1,
                  flex: 1,
                  width: '100%'
                }}>
                  {/* Edition date badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.2rem',
                    width: '100%'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      backgroundColor: `${currentEdition.color}22`,
                      color: currentEdition.color,
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      fontWeight: 600,
                      boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15), 0 0 5px ${currentEdition.color}22`,
                      border: `1px solid ${currentEdition.color}33`
                    }}>
                      {currentEdition.date}
                    </span>

                    <span style={{
                      display: 'inline-block',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: '#fff',
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      fontWeight: 600,
                      opacity: 0.7
                    }}>
                      EDUTHON {currentEdition.id}.0
                    </span>
                  </div>

                  {/* Title with enhanced styling */}
                  <h1 style={{
                    margin: '0 0 1.5rem',
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.01em',
                    fontFamily: 'Poppins, sans-serif',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    {currentEdition.id === 4 ? (
                      // Special styling for "Chalkboard to Chatbot"
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '0.5rem 1rem 1.5rem',
                        marginBottom: '0.5rem',
                        width: '100%',
                        textAlign: 'center'
                      }}>
                        {/* First part of the title */}
                        <span style={{
                          backgroundImage: 'linear-gradient(45deg, #fff, #B0B0B0)',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: isMobile ? '1.8rem' : '2.5rem',
                          fontFamily: 'Poppins, sans-serif',
                          marginBottom: '0.2rem',
                          fontWeight: 700,
                          textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)'
                        }}>
                          Chalkboard
                        </span>

                        {/* Connecting text */}
                        <span style={{
                          color: currentEdition.color,
                          margin: '-0.5rem 0',
                          fontSize: isMobile ? '1.5rem' : '2rem',
                          fontWeight: 700,
                          letterSpacing: '1px',
                          transform: 'scale(1.5)',
                          textShadow: `0 0 10px ${currentEdition.color}80`
                        }}>
                          to
                        </span>

                        {/* Second part of the title */}
                        <span style={{
                          backgroundImage: `linear-gradient(45deg, #fff, ${currentEdition.color})`,
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: isMobile ? '2rem' : '2.7rem',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 800,
                          letterSpacing: '-0.01em',
                          textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)'
                        }}>
                          Chatbot
                        </span>

                        {/* Decorative elements */}
                        <span style={{
                          position: 'absolute',
                          top: '10%',
                          left: '5%',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#B0B0B0',
                          boxShadow: '0 0 10px #B0B0B0'
                        }}></span>

                        <span style={{
                          position: 'absolute',
                          bottom: '15%',
                          right: '5%',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: currentEdition.color,
                          boxShadow: `0 0 10px ${currentEdition.color}`
                        }}></span>
                      </div>
                    ) : currentEdition.id === 3 ? (
                      // Special styling for "Reimagining Classrooms"
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '0.5rem 1rem 1.5rem',
                        marginBottom: '0.5rem',
                        width: '100%',
                        textAlign: 'center'
                      }}>
                        <span style={{
                          backgroundImage: `linear-gradient(45deg, #fff, ${currentEdition.color})`,
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: isMobile ? '1.7rem' : '2.2rem',
                          fontFamily: 'Poppins, sans-serif',
                          textTransform: 'uppercase',
                          letterSpacing: '3px',
                          fontWeight: 700,
                          textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)',
                          transform: 'skew(-5deg)',
                          marginBottom: '0.8rem'
                        }}>
                          Reimagining
                        </span>

                        <span style={{
                          backgroundImage: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.7))',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: isMobile ? '2.2rem' : '3rem',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 800,
                          fontStyle: 'italic',
                          letterSpacing: '-0.01em',
                          textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)',
                          padding: '0 1.5rem'
                        }}>
                          Classrooms
                        </span>

                        {/* Decorative elements */}
                        <span style={{
                          position: 'absolute',
                          top: '15%',
                          left: '10%',
                          width: '10px',
                          height: '10px',
                          background: currentEdition.color,
                          transform: 'rotate(45deg)',
                          boxShadow: `0 0 10px ${currentEdition.color}`
                        }}></span>

                        <span style={{
                          position: 'absolute',
                          bottom: '25%',
                          right: '10%',
                          width: '10px',
                          height: '10px',
                          background: currentEdition.color,
                          transform: 'rotate(45deg)',
                          boxShadow: `0 0 10px ${currentEdition.color}`
                        }}></span>
                      </div>
                    ) : currentEdition.id === 2 ? (
                      // Special styling for "Winds of Change"
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '0.5rem 1rem 1.5rem',
                        marginBottom: '0.5rem',
                        width: '100%',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{
                            width: '35px',
                            height: '2px',
                            background: currentEdition.color,
                            display: 'inline-block',
                            transform: 'translateY(-5px)'
                          }}></span>

                          <span style={{
                            backgroundImage: `linear-gradient(45deg, #fff, ${currentEdition.color})`,
                            backgroundSize: '100%',
                            backgroundRepeat: 'no-repeat',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            position: 'relative',
                            display: 'inline-block',
                            fontSize: isMobile ? '2rem' : '2.7rem',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 700,
                            textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)'
                          }}>
                            Winds
                          </span>

                          <span style={{
                            width: '35px',
                            height: '2px',
                            background: currentEdition.color,
                            display: 'inline-block',
                            transform: 'translateY(-5px)'
                          }}></span>
                        </div>

                        <span style={{
                          position: 'relative',
                          color: '#fff',
                          fontSize: isMobile ? '1.3rem' : '1.6rem',
                          fontWeight: 300,
                          textTransform: 'uppercase',
                          letterSpacing: '4px',
                          marginBottom: '0.5rem'
                        }}>
                          of
                        </span>

                        <span style={{
                          backgroundImage: 'linear-gradient(45deg, #fff, rgba(255,255,255,0.8))',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: isMobile ? '2.2rem' : '3rem',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 800,
                          letterSpacing: '1px',
                          textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)'
                        }}>
                          Change
                        </span>
                      </div>
                    ) : currentEdition.id === 1 ? (
                      // Special styling for "Bold Beginnings"
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        padding: '0.5rem 1rem 1.5rem',
                        marginBottom: '0.5rem',
                        width: '100%',
                        textAlign: 'center'
                      }}>
                        <span style={{
                          backgroundImage: `linear-gradient(45deg, ${currentEdition.color}, #fff)`,
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: isMobile ? '3rem' : '4rem',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 900,
                          letterSpacing: '-1px',
                          textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)',
                          textTransform: 'uppercase',
                          marginBottom: '-5px',
                          lineHeight: 1
                        }}>
                          Bold
                        </span>

                        <span style={{
                          backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.7), #fff)',
                          backgroundSize: '100%',
                          backgroundRepeat: 'no-repeat',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          position: 'relative',
                          display: 'inline-block',
                          fontSize: isMobile ? '1.6rem' : '2rem',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 300,
                          letterSpacing: '3px',
                          textTransform: 'uppercase',
                          textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)'
                        }}>
                          Beginnings
                        </span>

                        {/* Decorative star elements */}
                        <span style={{
                          position: 'absolute',
                          top: '15%',
                          left: '5%',
                          color: currentEdition.color,
                          fontSize: '20px',
                          transform: 'rotate(-15deg)'
                        }}>
                          ★
                        </span>

                        <span style={{
                          position: 'absolute',
                          bottom: '20%',
                          right: '5%',
                          color: currentEdition.color,
                          fontSize: '16px',
                          transform: 'rotate(15deg)'
                        }}>
                          ★
                        </span>

                        <span style={{
                          position: 'absolute',
                          top: '40%',
                          right: '10%',
                          color: currentEdition.color,
                          fontSize: '10px'
                        }}>
                          ★
                        </span>
                      </div>
                    ) : (
                      // Regular styling for any other editions
                      <span style={{
                        backgroundImage: `linear-gradient(45deg, #fff, ${currentEdition.color})`,
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        position: 'relative',
                        padding: '0 0.5rem',
                        display: 'inline-block',
                        textShadow: '0 2px 15px rgba(255, 255, 255, 0.15)'
                      }}>
                        {currentEdition.title}
                      </span>
                    )}
                  </h1>

                  {/* Description with enhanced styling */}
                  <p style={{
                    margin: '0',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.85)',
                    maxWidth: '800px',
                    padding: '0.5rem 0',
                    borderLeft: isMobile ? 'none' : `3px solid ${currentEdition.color}40`,
                    paddingLeft: isMobile ? '0' : '1.5rem',
                    position: 'relative',
                    backgroundColor: 'transparent',
                    borderRadius: isMobile ? '0' : '0 8px 8px 0'
                  }}>
                    {currentEdition.description}
                  </p>
                </div>
              </div>

              {/* Enhanced Gallery section with larger images */}
              <div ref={scrollRef} className="gallery-section">
                <h3 style={{
                  marginTop: '0',
                  marginLeft: 'auto',
                  marginRight: '50%',
                  marginBottom: '2.5rem',
                  fontSize: isMobile ? '1.6rem' : '2rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  position: 'relative',
                  display: 'inline-block',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundImage: `linear-gradient(to right, white, ${currentEdition.color})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '1px 1px 3px rgba(255, 255, 255, 0.3)'
                }}>
                  Event Gallery
                </h3>

                {isLoading ? (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '300px',
                    color: '#fff'
                  }}>
                    <div style={{
                      textAlign: 'center',
                      padding: '2rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '12px',
                      border: `1px solid ${currentEdition.color}22`,
                      width: '80%',
                      maxWidth: '400px'
                    }}>
                      <div className="loading-spinner" style={{
                        width: '40px',
                        height: '40px',
                        margin: '0 auto 1rem',
                        border: `3px solid ${currentEdition.color}33`,
                        borderTop: `3px solid ${currentEdition.color}`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      <p>Loading gallery images...</p>
                    </div>
                  </div>
                ) : (
                  <div className="gallery-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile
                      ? '1fr'
                      : 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: isMobile ? '2rem' : '1.8rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                  }}>
                    {currentEdition.images && currentEdition.images.length > 0 ? (
                      currentEdition.images.map((imageUrl, idx) => (
                        <div 
                          key={idx}
                          className="gallery-item"
                          onClick={() => openLightbox({
                            secure_url: imageUrl,
                            alt: `Eduthon ${currentEdition.id}.0 Image ${idx + 1}`,
                            caption: `From ${currentEdition.title} - Eduthon ${currentEdition.id}.0`
                          })}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            position: 'relative',
                            aspectRatio: '16/10',
                            height: isMobile ? 'auto' : '320px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(0, 0, 0, 0.15)',
                            background: '#131313',
                            transform: 'translateY(0) scale(1)',
                            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                            margin: '0 auto',
                            border: `1px solid rgba(40, 40, 40, 0.5)`
                          }}
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Eduthon ${currentEdition.id}.0 Image ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
                              filter: 'brightness(0.9) contrast(1.05)'
                            }}
                          />

                          {/* Gradient overlay effect */}
                          <div className="image-overlay" style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0.1))',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '1.6rem',
                            opacity: 1,
                            transition: 'all 0.4s ease'
                          }}>
                            <div style={{
                              transform: 'translateY(0)',
                              transition: 'transform 0.4s ease',
                              position: 'relative',
                              zIndex: 2
                            }}>
                              <h5 style={{
                                margin: 0,
                                color: '#fff',
                                fontSize: isMobile ? '1rem' : '1.2rem',
                                fontWeight: 600,
                                textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
                                marginBottom: '0.5rem',
                                opacity: 0.95,
                                fontFamily: 'Poppins, sans-serif',
                                position: 'relative',
                                paddingLeft: '0.5rem',
                                borderLeft: `2px solid ${currentEdition.color}`
                              }}>
                                Eduthon {currentEdition.id}.0
                              </h5>
                              <p style={{
                                margin: 0,
                                color: 'rgba(255, 255, 255, 0.85)',
                                fontSize: isMobile ? '0.85rem' : '0.9rem',
                                fontWeight: 400,
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
                                lineHeight: 1.6
                              }}>
                                {currentEdition.title} - Image {idx + 1}
                              </p>
                            </div>
                          </div>

                          {/* Soft vignette effect */}
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: `radial-gradient(circle at center, transparent 55%, rgba(0, 0, 0, 0.4) 100%)`,
                            opacity: 0.6,
                            pointerEvents: 'none',
                            transition: 'opacity 0.5s ease'
                          }}></div>
                          
                          {/* Color accent in corner */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100px',
                            height: '100px',
                            background: `radial-gradient(circle at top right, ${currentEdition.color}22, transparent 70%)`,
                            opacity: 0.8,
                            pointerEvents: 'none',
                            transition: 'opacity 0.3s ease'
                          }}></div>
                          
                          {/* View indicator that appears on hover */}
                          <div className="view-indicator" style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: '#fff',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transform: 'scale(0.8)',
                            transition: 'all 0.3s ease',
                            border: `1px solid rgba(255, 255, 255, 0.2)`,
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            zIndex: 2
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '3rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '12px',
                        border: `1px solid ${currentEdition.color}22`
                      }}>
                        <p style={{ color: '#fff', fontSize: '1.1rem' }}>No images available for this edition.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main >

      {/* Lightbox */}
      {
        lightboxOpen && lightboxImage && (
          <div
            className="lightbox"
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: 0,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.25s ease-out',
              overflow: 'hidden'
            }}
          >
            <button
              className="close-lightbox"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(0, 0, 0, 0.6)',
                color: '#fff',
                border: 'none',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1001,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <FaTimes size={20} />
            </button>

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '92%',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'fadeUp 0.4s ease-out',
                margin: 'auto',
                height: 'auto',
                justifyContent: 'center'
              }}
            >
              <div className="lightbox-image-container" style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                aspectRatio: '16/10',
                maxHeight: '70vh'
              }}>
                <img 
                  src={lightboxImage.secure_url} 
                  alt={lightboxImage.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                
                {/* Subtle vignette effect */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.6) 100%)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}></div>
              </div>

              <div className="lightbox-caption" style={{
                marginTop: '1.5rem',
                color: '#fff',
                textAlign: 'center',
                maxWidth: '800px',
                width: '100%',
                background: `rgba(0, 0, 0, 0.5)`,
                padding: '1.2rem 1.8rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1px solid ${currentEdition.color}22`,
                boxShadow: `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 10px ${currentEdition.color}15`,
                animation: 'fadeUp 0.5s ease-out 0.2s forwards',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <h4 style={{
                  margin: '0 0 0.5rem',
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  fontWeight: 600,
                  color: currentEdition.color
                }}>
                  {lightboxImage.alt}
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {lightboxImage.caption}
                </p>
              </div>

              {/* Navigation buttons */}
              <div className="lightbox-navigation" style={{
                position: 'absolute',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-20px)',
                    opacity: 0.8,
                    pointerEvents: 'auto'
                  }}
                >
                  <FaChevronLeft size={20} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(20px)',
                    opacity: 0.8,
                    pointerEvents: 'auto'
                  }}
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )
      }

      <style>{`
        html, body {
          scroll-behavior: smooth;
        }
        
        .highlights-page {
          min-height: 100vh;
          background-color: #0a0a0a;
          color: #fff;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        
        .gallery-item {
          transform: translateY(0) scale(1);
          will-change: transform;
          transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.5s ease;
        }
        
        .gallery-item:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.4) !important;
          z-index: 5;
        }
        
        .gallery-item:hover img {
          transform: scale(1.08);
          filter: brightness(1.05) contrast(1.05);
        }
        
        .gallery-item:hover .image-overlay {
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.2));
        }
        
        .gallery-item:hover .image-overlay > div {
          transform: translateY(-8px);
        }
        
        .gallery-item:hover .view-indicator {
          opacity: 1;
          transform: scale(1);
        }
        
        .close-lightbox:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(90deg);
        }
        
        .lightbox-navigation button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.1) translateX(-20px);
        }
        
        .lightbox-navigation button:last-child:hover {
          transform: scale(1.1) translateX(20px);
        }
        
        /* Improved animations */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        
        @keyframes particlesDrift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1000px 500px;
          }
        }
        
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        
        @keyframes waveMotion {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Edition tab hover effects */
        .edition-tabs button {
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .edition-tabs button:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25) !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }
          
          .gallery-item {
            aspect-ratio: 16/10;
          }
          
          .edition-tabs button:hover {
            transform: translateY(-3px) !important;
          }
          
          .lightbox-navigation {
            padding: 0 0.5rem !important;
          }
          
          .lightbox-navigation button {
            width: 40px !important;
            height: 40px !important;
          }
        }
        
        /* Added spinner animation */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        /* Lightbox Image Container Animation */
        .lightbox-image-container {
          animation: zoomIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      `}</style>
    </div >
  );
};

export default Highlights; 