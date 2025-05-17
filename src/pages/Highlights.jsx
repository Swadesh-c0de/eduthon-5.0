import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Highlights = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeEdition, setActiveEdition] = useState(1);
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

    // Define image arrays
    const images1 = ['1', '2', '3', '4', '5', '6', '7'].map(i => image_url + '1.0/eduthon1.0-' + i + '.jpg');
    const images2 = ['1', '2', '3', '4', '5', '6', '7'].map(i => image_url + '2.0/eduthon2.0-' + i + '.jpg');
    const images3 = ['2', '3', '4', '5', '6', '7', '8'].map(i => image_url + '3.0/eduthon3.0-' + i + '.jpg');
    const images4 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'].map(i => image_url + '4.0/eduthon4.0-' + i + '.jpg');

    // Set initial empty arrays to state
    setImagesEduthon1([]);
    setImagesEduthon2([]);
    setImagesEduthon3([]);
    setImagesEduthon4([]);

    // Add a small delay before starting to load
    setTimeout(() => {
      // Set loading to false to show the loading spinner
      setIsLoading(false);

      // Create a function to load images in sequence for active edition
      const loadImagesSequentially = (images, setFunction) => {
        // Start with empty array
        let loadedImages = [];

        // Load images one by one with delays
        const loadNextImage = (index) => {
          if (index >= images.length) return;

          // Create a new image object
          const img = new Image();

          // Set onload handler
          img.onload = () => {
            // Add this image URL to the loaded images array
            loadedImages = [...loadedImages, images[index]];
            // Update state to show the new image
            setFunction(loadedImages);

            // Load the next image after delay
            setTimeout(() => {
              loadNextImage(index + 1);
            }, 150); // 150ms delay between images
          };

          // Set error handler - still proceed to next image
          img.onerror = () => {
            setTimeout(() => {
              loadNextImage(index + 1);
            }, 50);
          };

          // Start loading the image
          img.src = images[index];
        };

        // Start loading the first image
        loadNextImage(0);
      };

      // Load the active edition images
      if (activeEdition === 1) loadImagesSequentially(images1, setImagesEduthon1);
      else if (activeEdition === 2) loadImagesSequentially(images2, setImagesEduthon2);
      else if (activeEdition === 3) loadImagesSequentially(images3, setImagesEduthon3);
      else if (activeEdition === 4) loadImagesSequentially(images4, setImagesEduthon4);
    }, 300); // Short delay before starting to load images
  }, [activeEdition]);

  // More aggressive scroll handling to ensure we start at the top
  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Set manual scroll restoration
      if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
      }
    };

    // Execute immediately
    forceScrollTop();

    // Execute on the next frame and after a slight delay to ensure DOM is settled
    requestAnimationFrame(() => forceScrollTop());
    setTimeout(forceScrollTop, 50);
    setTimeout(forceScrollTop, 150);

    // Block scrolling briefly
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 200);

    // Also run on first intersection with viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        forceScrollTop();
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // This runs after component mounts for other initialization
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Adjust back button size for mobile
      const backButton = document.querySelector('.back-button');
      if (backButton) {
        if (mobile) {
          backButton.style.width = '2rem';
          backButton.style.height = '2rem';
          backButton.style.top = '0.6rem';
          backButton.style.left = '0.6rem';
          backButton.style.fontSize = '0.85rem';
        } else {
          backButton.style.width = '2.5rem';
          backButton.style.height = '2.5rem';
          backButton.style.top = '1.25rem';
          backButton.style.left = '1.25rem';
          backButton.style.fontSize = '0.9rem';
        }
      }
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

  // Smooth scroll handling for edition changes
  useEffect(() => {
    if (!isMobile) {
      // For desktop, smooth scroll to top when edition changes
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // For mobile, immediate scroll
      window.scrollTo(0, 0);
    }
  }, [activeEdition, isMobile]);

  // Mock data for past editions
  const editions = [
    {
      id: 1,
      title: "Inaugural Edition",
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

  const currentEdition = editions.find(edition => edition.id === activeEdition);

  return (
    <div className="highlights-page">
      {/* Style for mobile hover fixes */}
      <style>
        {`
          @media (hover: none) {
            .back-button:hover {
              transform: none !important;
              background-color: rgba(15, 15, 15, 0.6) !important;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
            }
            
            /* Fix iOS button rendering */
            .back-button {
              -webkit-tap-highlight-color: transparent;
            }
          }
        `}
      </style>
      
      {/* Hero Banner */}
      <div className="hero-banner" style={{
        position: 'relative',
        height: isMobile ? '35vh' : '45vh',
        minHeight: isMobile ? '250px' : '280px',
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
          className="back-button"
          style={{
            position: 'fixed',
            top: '1.25rem',
            left: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            backgroundColor: 'rgba(15, 15, 15, 0.6)',
            color: '#D4AF37',
            transition: 'all 0.2s ease',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: '1px solid rgba(212, 175, 55, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10,
            fontSize: '0.9rem',
            transform: 'translateX(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-3px)';
            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.backgroundColor = 'rgba(15, 15, 15, 0.6)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateX(-1px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateX(-3px)';
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
          <h1 style={{
            fontSize: isMobile ? 'clamp(2rem, 7vw, 3rem)' : 'clamp(2.3rem, 4vw, 3.5rem)',
            fontWeight: '800',
            marginBottom: '0.8rem',
            background: 'linear-gradient(45deg, #fff, var(--secondary-color, #FFD700))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em',
            opacity: 0,
            animation: 'fadeUp 1s forwards'
          }}>
            The Legacy of EDUTHON
          </h1>

          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.5,
            fontWeight: '400',
            opacity: 0,
            animation: 'fadeUp 1s forwards 0.3s'
          }}>
            A journey through our mission to transform education in India across four groundbreaking editions.
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

      {/* Edition selection section */}
      <section className="edition-select-section" style={{
        backgroundColor: '#0a0a0a',
        padding: isMobile ? '2rem 0' : '3rem 0 2rem',
        position: 'relative',
        borderBottom: '1px solid rgba(255, 215, 0, 0.05)'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : '1.8rem',
            textAlign: 'center',
            marginTop: '0rem',
            marginLeft: 'auto',
            marginRight: '50%',
            marginBottom: '2rem',
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
            {editions.map(edition => (
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
                  borderRadius: '10px',
                  padding: isMobile ? '0.9rem 0.8rem' : '1.2rem 1.5rem',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: activeEdition === edition.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  flexGrow: 1,
                  flexBasis: isMobile ? '38%' : '18%',
                  maxWidth: isMobile ? '42%' : '19%',
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
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  fontWeight: 700
                }}>
                  Eduthon {edition.id}.0
                </span>

                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  opacity: 0.9,
                  fontSize: isMobile ? '0.7rem' : '0.8rem'
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
        padding: '0 0 4rem',
        minHeight: '50vh',
        marginTop: '0'
      }}>
        <div className="container">
          {/* Active edition content */}
          {currentEdition && (
            <div className="edition-content" style={{
              maxWidth: '1100px',
              margin: '2rem auto'
            }}>
              {/* Header with details */}
              <div className="edition-header" style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                marginBottom: '2rem',
                padding: isMobile ? '1.5rem 1.2rem' : '1.8rem',
                borderRadius: '16px',
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
                      padding: '0.3rem 0.6rem',
                      borderRadius: '16px',
                      backgroundColor: `${currentEdition.color}22`,
                      color: currentEdition.color,
                      fontSize: isMobile ? '0.7rem' : '0.8rem',
                      fontWeight: 600,
                      boxShadow: `0 3px 8px rgba(0, 0, 0, 0.15), 0 0 5px ${currentEdition.color}22`,
                      border: `1px solid ${currentEdition.color}33`
                    }}>
                      {currentEdition.date}
                    </span>

                    <span style={{
                      display: 'inline-block',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      color: '#fff',
                      fontSize: isMobile ? '0.7rem' : '0.8rem',
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
                          Inaugural
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
                          Edition
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
                    textAlign: 'center',
                    margin: 'auto',
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
                  marginLeft: '50%',
                  marginRight: '50%',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontSize: isMobile ? '1.3rem' : '1.6rem',
                  fontWeight: 700,
                  position: 'relative',
                  display: 'inline-block',
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
                        width: '50px',
                        height: '50px',
                        margin: '0 auto 1rem',
                        border: `3px solid ${currentEdition.color}33`,
                        borderTop: `3px solid ${currentEdition.color}`,
                        borderRadius: '50%',
                        animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
                      }}></div>
                      <p style={{
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: '#fff',
                        marginBottom: '0.5rem',
                        opacity: 0.85
                      }}>Loading images...</p>
                      <p style={{
                        fontSize: '0.9rem',
                        opacity: 0.7,
                        color: '#f5f5f5'
                      }}>Loading one by one for smoother experience</p>
                    </div>
                  </div>
                ) : (
                                      <div className="gallery-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile
                        ? '1fr'
                        : 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: isMobile ? '1.5rem' : '2.5rem',
                      rowGap: isMobile ? '1.5rem' : '3.5rem',
                      maxWidth: '1100px',
                      margin: '2rem auto 0',
                      overflow: 'hidden',
                      padding: isMobile ? '0' : '0.5rem'
                    }}>
                    {currentEdition.images && currentEdition.images.length > 0 ? (
                      currentEdition.images.map((imageUrl, idx) => (
                        <div
                          key={idx}
                          className={`gallery-item gallery-item-${idx}`}
                          style={{
                            cursor: 'default',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            position: 'relative',
                            aspectRatio: '16/10', 
                            height: isMobile ? 'auto' : '240px',
                                                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25), 0 3px 10px rgba(0, 0, 0, 0.15)',
                              background: '#131313',
                              transform: 'translateY(30px) scale(0.96)',
                              transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                              margin: '0 auto',
                              border: `1px solid rgba(40, 40, 40, 0.5)`,
                              maxWidth: '100%',
                            opacity: 0,
                            animation: 'none'
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`Eduthon ${currentEdition.id}.0 Image ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
                              filter: 'brightness(0.9) contrast(1.05)',
                              opacity: 0
                            }}
                            onLoad={(e) => {
                              // Make parent item visible with animation
                              const parentItem = e.target.parentNode;
                              if (parentItem) {
                                // Fade in image
                                e.target.style.opacity = '1';
                                // Animate parent with delay
                                setTimeout(() => {
                                  parentItem.style.opacity = '1';
                                  parentItem.style.transform = 'translateY(0) scale(1)';
                                }, 50); // Small delay for smoother appearance
                              }
                            }}
                            loading="lazy"
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
                                fontSize: isMobile ? '0.7rem' : '1rem',
                                fontWeight: 600,
                                textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
                                marginBottom: '0',
                                textAlign: 'left',
                                opacity: 0.95,
                                fontFamily: 'Poppins, sans-serif',
                                position: 'relative',
                                paddingLeft: '0.5rem',
                                borderLeft: `2px solid ${currentEdition.color}`
                              }}>
                                Eduthon {currentEdition.id}.0
                              </h5>
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



      <style>{`
        /* Critical scrolling prevention */
        :root {
          scroll-behavior: auto !important;
          scroll-padding-top: 0 !important;
        }
        
        html, body {
          scroll-behavior: auto !important;
          overscroll-behavior: none;
          overflow-x: hidden;
          height: 100%;
          width: 100%;
          overflow-y: auto;
          position: relative;
        }
        
        .highlights-page {
          min-height: 100vh;
          background-color: #0a0a0a;
          color: #fff;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          will-change: transform;
          position: relative;
          display: block;
          opacity: 1;
        }
        
        .gallery-item {
          transform: translateY(0) scale(1);
          will-change: transform;
          transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.5s ease;
        }
        
        .gallery-item:hover {
          transform: translateY(-12px) scale(1.05);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 12px 35px rgba(0, 0, 0, 0.4) !important;
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
        
        /* Ultra smooth animations */
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
        
        /* Enhanced spinner animation */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        /* Improved transition for gallery items */
        .gallery-item {
          will-change: transform, opacity;
          transform-origin: center center;
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
        
        /* Performance optimizations */
        img {
          backface-visibility: hidden;
          perspective: 1000px;
          -webkit-backface-visibility: hidden;
          -webkit-perspective: 1000px;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }
        
        .gallery-item, .hero-banner, .edition-tabs button {
          backface-visibility: hidden;
          perspective: 1000px;
          -webkit-backface-visibility: hidden;
          -webkit-perspective: 1000px;
        }
        
        /* Smooth transition states */
        .gallery-item, .edition-tabs button {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1) !important;
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
        
        /* Additional spacing for desktop gallery items */
        @media (min-width: 768px) {
          .gallery-grid {
            padding: 1rem 0.5rem;
          }
          
          .gallery-item {
            transform: scale(0.98);
          }
          
          .gallery-item:hover {
            transform: translateY(-15px) scale(1.06);
          }
        }
        

      `}</style>
      {/* Script to ensure we start at the top */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Disable scroll restoration
          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
          }
          
          // Force scroll to top
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          // Prevent any scrolling until fully loaded
          document.body.style.overflow = 'hidden';
          window.addEventListener('load', function() {
            setTimeout(function() {
              document.body.style.overflow = '';
            }, 200);
          });
        `
      }} />
    </div >
  );
};

export default Highlights; 