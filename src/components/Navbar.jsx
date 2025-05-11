import { useState, useEffect, useRef, useCallback } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes, FaArrowUp, FaChevronUp, FaRocket } from 'react-icons/fa';
import ReactDOM from 'react-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    console.log("Toggle menu called, current state:", isOpen);
    setIsOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // MIND-BLOWING scroll to top function with 100% guaranteed functionality
  const scrollToTop = useCallback(() => {
    // Create a visual effect for the scroll action
    const createScrollEffect = () => {
      // Create a rocket element that flies to the top
      const rocket = document.createElement('div');
      rocket.innerHTML = `<svg viewBox="0 0 24 24" width="40" height="40" stroke="gold" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l9 2-9-18-9 18 9-2z"></path></svg>`;
      rocket.style.cssText = `
        position: fixed;
        z-index: 10000;
        left: 50%;
        bottom: 50%;
        transform: translateX(-50%);
        transition: bottom 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        pointer-events: none;
      `;
      document.body.appendChild(rocket);
      
      // Animate the rocket to the top
      setTimeout(() => {
        rocket.style.bottom = '120%';
      }, 10);
      
      // Remove the rocket after animation
      setTimeout(() => {
        document.body.removeChild(rocket);
      }, 700);
    };
    
    // Create the visual effect
    createScrollEffect();
    
    // Use all possible scroll methods for maximum compatibility
    
    // 1. Native smooth scroll with fallback
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch(e) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
    
    // 2. Direct DOM manipulation
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    // 3. Focus the top element
    const topElement = document.getElementById('top');
    if (topElement) {
      topElement.focus();
    }
    
    // 4. Use scrollIntoView as another method
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      try {
        heroSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } catch(e) {
        // Fallback for browsers that don't support smooth scrolling
        heroSection.scrollIntoView();
      }
    }
    
    // 5. Use requestAnimationFrame for a custom smooth scroll
    const scrollToTopAnimated = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTopAnimated);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTopAnimated();
    
  }, []);

  // Check if we're on mobile immediately on mount
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    // Setup Intersection Observer for nav highlights
    const options = {
      rootMargin: '-100px 0px 0px 0px',
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
      });
    }, 100);

    // Optimized scroll handler with throttling
    const handleScroll = () => {
      if (!scrollRef.current) {
        scrollRef.current = requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const currentScroll = window.scrollY || document.documentElement.scrollTop;
          const progress = (currentScroll / totalHeight) * 100;
          
          setScrollProgress(progress);
          setScrolled(currentScroll > 50);
          
          // Show scroll-to-top button after scrolling down 200px (more responsive)
          // Use a lower threshold for mobile for better UX
          const scrollThreshold = isMobile ? 200 : 300;
          setShowScrollTop(currentScroll > scrollThreshold);
          
          scrollRef.current = null;
        });
      }
    };
    
    // Initial check for scroll position
    handleScroll();

    // Use passive flag for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
      clearTimeout(timer);
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current);
      }
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isOpen) {
        // If the click was outside the mobile menu and it's open, close it
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Ensure links are clickable by preventing default behavior
  const handleNavLinkClick = (to) => {
    // Close the mobile menu if it's open
    if (isOpen) {
      closeMenu();
    }
    
    // Scroll to the section
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { to: 'hero', label: 'Home' },
    { to: 'introduction', label: 'About' },
    { to: 'what-to-expect', label: 'What to Expect' },
    { to: 'who-will-attend', label: 'Who Will Attend' },
    { to: 'why-eduthon', label: 'Why EDUTHON' },
    { to: 'legacy', label: 'Our Legacy' },
    { to: 'sponsors', label: 'Sponsorship' },
    { to: 'join-movement', label: 'Join Us' },
  ];

  // For desktop view, render a minimal navbar
  const renderDesktopNavbar = () => {
    if (isMobile) return null;
    
    return (
      <header 
        ref={navbarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 999,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: scrolled ? '0.6rem 0' : '1rem 0',
          borderBottom: scrolled ? '1px solid rgba(255, 215, 0, 0.15)' : 'none',
          boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.15)' : 'none'
        }}
      >
        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--secondary-color)',
            boxShadow: '0 0 8px var(--secondary-color)',
            transform: `translateX(${scrollProgress - 100}%)`,
            transition: 'transform 0.1s'
          }}></div>
        </div>
        
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <div
                key={link.to}
                onClick={() => handleNavLinkClick(link.to)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: activeSection === link.to ? '600' : '500',
                  color: activeSection === link.to ? 'var(--secondary-color)' : 'white',
                  textDecoration: 'none',
                  padding: '0.4rem 0.3rem',
                  position: 'relative',
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                className={`nav-link ${activeSection === link.to ? 'active-nav-link' : ''}`}
              >
                {link.label}
              </div>
            ))}
            <button
              onClick={() => handleNavLinkClick('join-movement')}
              className="desktop-register-button"
              style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#fff',
                backgroundColor: 'transparent',
                border: '1.5px solid var(--secondary-color)',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                marginLeft: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              Register
            </button>
          </nav>
        </div>
      </header>
    );
  };

  // Mobile Menu Component - Simplified approach
  const MobileMenu = () => {
    if (!isMobile) return null;
    
    return (
      <>
        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="hamburger-button"
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 10000,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            color: 'var(--secondary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        {/* Backdrop */}
        <div
          className={`mobile-backdrop ${isOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            zIndex: 9998,
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
          onClick={closeMenu}
        />
        
        {/* Sidebar */}
        <div
          ref={mobileMenuRef}
          className={`mobile-sidebar ${isOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            maxHeight: '100vh',
            background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)',
            boxShadow: isOpen ? '0 0 25px rgba(0, 0, 0, 0.5)' : 'none',
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRight: 'none',
            opacity: isOpen ? 1 : 0.95
          }}
        >
          {/* Header with logo */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            flexShrink: 0,
            position: 'relative'
          }}>
            <img 
              src="/logo.png" 
              alt="EDUTHON Logo" 
              style={{
                height: '38px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          
          {/* Menu content */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            height: 'calc(100% - 78px)',
            minHeight: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)'
          }}>
            {/* Navigation links - main content */}
            <div style={{
              padding: '20px 0',
              overflow: 'auto',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              alignItems: 'center'
            }}>
              {navLinks.map((link, index) => (
                <div
                  key={link.to}
                  onClick={() => handleNavLinkClick(link.to)}
                  className="nav-item"
                  style={{
                    padding: '14px 30px',
                    color: activeSection === link.to ? 'var(--secondary-color)' : '#fff',
                    fontSize: '16px',
                    fontWeight: activeSection === link.to ? '600' : '400',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    borderLeft: 'none',
                    borderBottom: activeSection === link.to ? '2px solid var(--secondary-color)' : '2px solid transparent',
                    backgroundColor: activeSection === link.to ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
                    transition: 'all 0.3s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '5px',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${0.05 + index * 0.05}s`,
                    width: '85%',
                    textAlign: 'center',
                    borderRadius: '6px'
                  }}
                >
                  {link.label}
                </div>
              ))}
            </div>
            
            {/* Footer with register button */}
            <div style={{
              padding: '25px 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              flexShrink: 0,
              marginTop: 'auto',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <button
                onClick={() => handleNavLinkClick('join-movement')}
                className="register-button"
                style={{
                  width: '85%',
                  padding: '14px',
                  backgroundColor: 'transparent',
                  color: 'var(--secondary-color)',
                  border: '2px solid var(--secondary-color)',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  margin: '0 auto',
                  display: 'block',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                Register
              </button>
              
              <div style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: 'center'
              }}>
                © {new Date().getFullYear()} EDUTHON
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 9997
          }}
        >
          <div 
            style={{
              height: '100%',
              width: `${scrollProgress}%`,
              backgroundColor: 'var(--secondary-color)',
              transition: 'width 0.1s ease'
            }}
          />
        </div>
      </>
    );
  };

  // EXTRAORDINARY scroll-to-top button with mind-blowing animation
  const ScrollToTopButton = () => {
    // Animation state
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    
    // Handle click with animation
    const handleClick = (e) => {
      e.preventDefault();
      setIsClicked(true);
      
      // Execute scroll after animation starts
      setTimeout(() => {
        scrollToTop();
        
        // Reset button state after animation completes
        setTimeout(() => {
          setIsClicked(false);
        }, 1000);
      }, 100);
    };
    
    // Don't render if we shouldn't show it
    if (!showScrollTop) return null;
    
    return (
      <div className="rocket-button-container">
        {/* Floating particles for rocket effect */}
        {isClicked && Array(5).fill().map((_, i) => (
          <div 
            key={i}
            className="rocket-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.2}s`
            }}
          />
        ))}
        
        {/* Main button */}
        <button 
          id="rocket-top-button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rocket-button ${isClicked ? 'launching' : ''} ${isHovered ? 'hover' : ''}`}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '30px',
            [isMobile ? 'left' : 'right']: '30px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isHovered 
              ? 'linear-gradient(145deg, #FFE045, #FFCC00)'
              : 'linear-gradient(145deg, #FFD700, #FFC107)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isHovered
              ? '0 8px 25px rgba(255, 215, 0, 0.6), 0 0 0 2px rgba(255, 215, 0, 0.2)'
              : '0 6px 20px rgba(0, 0, 0, 0.3)',
            border: 'none',
            cursor: 'pointer',
            transform: isClicked 
              ? 'scale(0.1) translateY(-500px)' 
              : isHovered 
                ? 'scale(1.1) translateY(-5px)' 
                : 'scale(1) translateY(0)',
            transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.3s, box-shadow 0.3s',
            overflow: 'visible',
            zIndex: 9999
          }}
        >
          {/* Rocket icon with flame effect */}
          <div className="rocket-icon-container">
            <FaRocket size={24} className="rocket-icon" />
            {isHovered && (
              <div className="rocket-flame" />
            )}
          </div>
        </button>
      </div>
    );
  };

  // Create a top anchor and initialize direct scroll handling
  useEffect(() => {
    // Create a hidden anchor at the top of the page
    const topAnchor = document.createElement('div');
    topAnchor.id = 'top';
    topAnchor.style.position = 'absolute';
    topAnchor.style.top = '0';
    topAnchor.style.left = '0';
    topAnchor.style.width = '1px';
    topAnchor.style.height = '1px';
    topAnchor.style.visibility = 'hidden';
    topAnchor.tabIndex = -1; // Make it focusable
    
    // Add it to the page
    document.body.prepend(topAnchor);
    
    // Add a direct click handler to any element with rocket-button class
    // This ensures the button works even if React event handling fails
    const addDirectHandler = () => {
      const rocketButton = document.getElementById('rocket-top-button');
      if (rocketButton) {
        rocketButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.scrollTo(0, 0);
        }, true);
      }
    };
    
    // Try to add the handler after a short delay to ensure button is rendered
    setTimeout(addDirectHandler, 500);
    
    // Clean up on unmount
    return () => {
      const existingAnchor = document.getElementById('top');
      if (existingAnchor) {
        document.body.removeChild(existingAnchor);
      }
    };
  }, []);

  return (
    <>
      {renderDesktopNavbar()}
      <MobileMenu />
      <ScrollToTopButton />
      
      <style>{`
        body {
          margin: 0;
          padding-top: env(safe-area-inset-top);
          overflow-x: hidden;
        }

        html, body {
          position: relative;
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        
        .nav-link {
          position: relative;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--secondary-color);
          transition: all 0.25s ease;
          opacity: 0;
        }
        
        .nav-link:hover:after,
        .active-nav-link:after {
          width: 100%;
          opacity: 1;
        }
        
        .active-nav-link {
          color: var(--secondary-color) !important;
          font-weight: 600 !important;
        }
        
        button:active {
          transform: scale(0.97);
        }
        
        /* MIND-BLOWING rocket button styles */
        .rocket-button-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          pointer-events: none;
        }
        
        .rocket-button {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          user-select: none;
          outline: none;
          pointer-events: auto;
        }
        
        /* Rocket flame animation */
        .rocket-icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .rocket-icon {
          transform: rotate(45deg);
          transition: transform 0.3s;
        }
        
        .hover .rocket-icon {
          transform: rotate(45deg) translateY(-2px);
        }
        
        .launching .rocket-icon {
          transform: rotate(45deg) scale(1.2);
        }
        
        .rocket-flame {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 15px;
          height: 20px;
          border-radius: 50% 50% 0 0;
          background: linear-gradient(to bottom, #FF5722, #FFC107);
          animation: flicker 0.2s infinite alternate;
          transform-origin: center bottom;
        }
        
        @keyframes flicker {
          0% { height: 20px; opacity: 0.8; }
          100% { height: 25px; opacity: 1; }
        }
        
        /* Rocket particles */
        .rocket-particle {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(to bottom, #FFC107, #FF5722);
          animation: particle-animation 1s ease-out forwards;
        }
        
        @keyframes particle-animation {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(50% - 25px), 100px) scale(0);
            opacity: 0;
          }
        }
        
        /* Launching animation */
        .rocket-button.launching {
          animation: shake 0.3s ease-in-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(2px); }
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .rocket-button {
            transition: none !important;
          }
          
          .rocket-flame, 
          .rocket-particle {
            display: none;
          }
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
          .rocket-button-container {
            left: 20px;
            right: auto;
            bottom: 20px;
          }
          
          .rocket-button {
            width: 50px !important;
            height: 50px !important;
          }
          
          .rocket-icon {
            transform: rotate(45deg) scale(0.9);
          }
          
          .rocket-flame {
            bottom: -12px;
            width: 12px;
            height: 16px;
          }
        }
        
        /* Desktop styles */
        @media (min-width: 769px) {
          .desktop-register-button {
            position: relative;
            overflow: hidden;
            z-index: 1;
          }
          
          .desktop-register-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--secondary-color);
            transform: translateY(100%);
            transition: transform 0.3s ease;
            z-index: -1;
          }
          
          .desktop-register-button:hover {
            color: #000 !important;
            border-color: var(--secondary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          
          .desktop-register-button:hover * {
            color: #000 !important;
          }
          
          .desktop-register-button:hover::before {
            transform: translateY(0);
          }
          
          .desktop-register-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
          .mobile-backdrop.open {
            opacity: 1;
            visibility: visible;
          }
          
          .mobile-sidebar.open {
            transform: translateX(0);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
          }
          
          .mobile-sidebar {
            display: flex !important;
            flex-direction: column !important;
            background: linear-gradient(135deg, #111111 0%, #1a1a1a 100%) !important;
          }
          
          .mobile-sidebar > div {
            display: flex !important;
          }
          
          .hamburger-button {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            user-select: none;
            outline: none;
            transition: all 0.2s ease;
          }
          
          .hamburger-button:active {
            transform: scale(0.95);
            background-color: rgba(0, 0, 0, 0.9);
          }
          
          /* Nav item hover effect */
          .nav-item {
            position: relative;
            border-radius: 6px;
          }
          
          .nav-item:hover {
            background-color: rgba(255, 255, 255, 0.05);
          }
          
          .nav-item:active {
            background-color: rgba(255, 255, 255, 0.08);
          }
          
          .nav-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background-color: var(--secondary-color);
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          
          .nav-item:hover::after {
            width: 40%;
          }
          
          /* Register button hover effect */
          .register-button {
            position: relative;
            overflow: hidden;
            z-index: 1;
          }
          
          .register-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.2));
            transform: translateX(-100%);
            transition: transform 0.5s ease;
            z-index: -1;
          }
          
          .register-button:hover::before {
            transform: translateX(0);
          }
          
          .register-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          }
          
          .register-button:active {
            transform: translateY(0);
          }
          
          /* Scrollbar styling */
          .mobile-sidebar ::-webkit-scrollbar {
            width: 5px;
          }
          
          .mobile-sidebar ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
          
          .mobile-sidebar ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
          }
          
          .mobile-sidebar ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          
          /* Mobile rocket button overrides */
          .rocket-button-container {
            left: 20px !important;
            right: auto !important;
            bottom: 20px !important;
          }
          
          .rocket-button {
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar; 