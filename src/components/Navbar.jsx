import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
          const currentScroll = window.scrollY;
          const progress = (currentScroll / totalHeight) * 100;
          
          setScrollProgress(progress);
          setScrolled(currentScroll > 50);
          
          scrollRef.current = null;
        });
      }
    };

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

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  // Handle touch events better on mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (!mobileMenuRef.current?.contains(e.target) && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
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

  return (
    <header 
      ref={navbarRef}
      className="navbar-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        display: 'block',
        visibility: 'visible',
        height: 'auto',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        WebkitPerspective: 1000,
        WebkitBackfaceVisibility: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{
          width: '100%',
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: scrolled ? '0.6rem 0' : '1rem 0',
          borderBottom: scrolled ? '1px solid rgba(255, 215, 0, 0.15)' : 'none',
          boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.15)' : 'none',
          position: 'relative',
          pointerEvents: 'auto',
        }}
      >
        {/* Scroll Progress Bar */}
        <div className="scroll-progress-container" style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 1001,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          <div className="scroll-progress-bar" style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--secondary-color)',
            boxShadow: '0 0 8px var(--secondary-color)',
            transform: `translateX(${scrollProgress - 100}%)`,
            transition: 'transform 0.1s',
            pointerEvents: 'none'
          }}></div>
        </div>

        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 1.25rem',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          pointerEvents: 'auto'
        }}>
          {/* Logo removed */}

          {/* Wrapper for right-side content (desktop menu & mobile toggle) */}
          <div className="navbar-right-group" style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ 
              display: isMobile ? 'none' : 'flex', 
              gap: '1rem', 
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexWrap: 'nowrap',
              pointerEvents: 'auto'
            }}>
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
                    display: 'inline-block',
                    userSelect: 'none',
                    pointerEvents: 'auto'
                  }}
                  className={`nav-link ${activeSection === link.to ? 'active-nav-link' : ''}`}
                >
                  {link.label}
                </div>
              ))}
              <div
                onClick={() => handleNavLinkClick('join-movement')}
                className="btn btn-outline nav-cta text-xs uppercase tracking-wider font-semibold rounded border-[1.5px] border-[var(--secondary-color)] whitespace-nowrap h-8 flex items-center justify-center ml-2.5 px-4 cursor-pointer hover:shadow-md hover:border-opacity-100 transition-all duration-300"
              >
                Register
              </div>
            </div>

            {/* Mobile Toggle Button */}
            <button 
              onClick={toggleMenu} 
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              style={{
                background: 'none',
                color: 'var(--secondary-color)',
                fontSize: '1.1rem',
                padding: '0.3rem',
                display: isMobile ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                position: 'relative',
                zIndex: 9999,
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 215, 0, 0.05)',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                width: '40px',
                height: '40px',
                marginRight: '0',
                outline: 'none',
                pointerEvents: 'auto'
              }}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className={`mobile-menu ${isOpen ? 'open' : ''}`} 
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(10, 10, 10, 0.97)',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
            visibility: isOpen ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4.5rem 1rem 2rem',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            overflowY: 'auto',
            boxSizing: 'border-box',
            touchAction: 'pan-y',
            overscrollBehavior: 'contain',
            pointerEvents: 'auto'
          }}
        >
          {/* Background particles */}
          <div className="particle" style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
            filter: 'blur(15px)',
            opacity: isOpen ? 0.5 : 0,
            transition: 'opacity 0.6s ease',
            zIndex: 0,
            pointerEvents: 'none'
          }}></div>
          
          <div className="particle" style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, transparent 70%)',
            filter: 'blur(15px)',
            opacity: isOpen ? 0.6 : 0,
            transition: 'opacity 0.6s ease',
            zIndex: 0,
            pointerEvents: 'none'
          }}></div>
          
          <div className="mobile-nav-links" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            width: '100%', 
            maxWidth: '300px',
            position: 'relative',
            zIndex: 5,
            pointerEvents: 'auto'
          }}>
            {navLinks.map((link, index) => (
              <div
                key={link.to}
                onClick={() => handleNavLinkClick(link.to)}
                style={{
                  fontSize: '1rem',
                  fontWeight: activeSection === link.to ? '600' : '500',
                  color: activeSection === link.to ? 'var(--secondary-color)' : 'white',
                  textDecoration: 'none',
                  padding: '1rem 0',
                  position: 'relative',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                  width: '100%',
                  textAlign: 'center',
                  borderBottom: '1px solid rgba(255, 215, 0, 0.12)',
                  transform: `translateY(${isOpen ? '0' : '15px'})`,
                  opacity: isOpen ? 1 : 0,
                  transition: `opacity 0.3s ease ${0.05 + index * 0.05}s, transform 0.3s ease ${0.05 + index * 0.05}s, color 0.2s ease`,
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  pointerEvents: 'auto'
                }}
                className={`mobile-nav-link ${activeSection === link.to ? 'active-mobile-nav-link' : ''}`}
              >
                {link.label}
              </div>
            ))}
            <div
              onClick={() => handleNavLinkClick('join-movement')}
              className="btn mobile-btn w-full mt-8 text-center text-sm uppercase tracking-wider font-semibold py-4 rounded min-h-[50px] flex items-center justify-center cursor-pointer bg-[rgba(255,215,0,0.15)] border-[1.5px] border-[var(--secondary-color)] hover:shadow-md hover:bg-[rgba(255,215,0,0.2)] transition-all duration-300"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(15px)',
                transition: `opacity 0.3s ease ${0.05 + navLinks.length * 0.05}s, transform 0.3s ease ${0.05 + navLinks.length * 0.05}s`
              }}
            >
              Register Now
            </div>
          </div>
        </div>
      </nav>
      
      <style>{`
        body {
          margin: 0;
          padding-top: env(safe-area-inset-top);
          overflow-x: hidden;
        }

        @media (min-width: 1024px) {
          .desktop-menu {
            display: flex !important;
          }
          
          button[aria-label="Toggle menu"] {
            display: none !important;
          }
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
          pointer-events: none;
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
        
        .mobile-nav-link:hover {
          color: var(--secondary-color) !important;
        }
        
        .active-mobile-nav-link {
          color: var(--secondary-color) !important;
          border-bottom-color: rgba(255, 215, 0, 0.3) !important;
          font-weight: 600 !important;
        }
        
        /* Logo styles removed */

        /* Button and link active states */
        .btn:active, .nav-link:active, .mobile-nav-link:active {
          transform: scale(0.97);
          transition: transform 0.1s ease;
        }
        
        .nav-cta:hover {
          background-color: rgba(255, 215, 0, 0.05);
          border-color: var(--secondary-color);
          color: white !important; /* Force text color to stay white */
        }

        .mobile-btn:hover {
          border-color: var(--secondary-color);
          color: white !important; /* Force text color to stay white */
        }
        
        /* Override any other hover effects that might change text color */
        .btn:hover, .nav-cta:hover, .mobile-btn:hover {
          color: white !important; /* Force text color to stay white */
        }
        
        .mobile-btn:active {
          background-color: rgba(255, 215, 0, 0.25) !important;
          transform: scale(0.98);
          transition: all 0.1s ease;
          color: white !important; /* Force text color to stay white even on active state */
        }

        /* Ensure navbar is always visible */
        .navbar-wrapper {
          z-index: 9999 !important;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          -webkit-perspective: 1000px;
          isolation: isolate;
          pointer-events: auto !important;
        }
        
        /* Desktop navbar adjustments */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .desktop-menu {
            gap: 1.1rem !important;
          }
          
          .desktop-menu .nav-link {
            font-size: 0.75rem !important;
          }
        }
        
        /* Fix for small desktop screens */
        @media (min-width: 769px) and (max-width: 1023px) {
          .desktop-menu {
            gap: 0.75rem !important;
          }
          
          .desktop-menu .nav-link {
            font-size: 0.65rem !important;
            letter-spacing: 0.2px !important;
          }
          
          .nav-cta {
            font-size: 0.6rem !important;
            padding: 0.35rem 0.8rem !important;
            height: 28px !important;
          }
        }

        /* Mobile menu specific improvements */
        @media (max-width: 768px) {
          .mobile-menu.open {
            display: flex !important;
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
            z-index: 9998 !important;
          }

          .mobile-nav-link {
            border-bottom: 1px solid rgba(255, 215, 0, 0.12);
            will-change: transform, opacity; /* Optimize for animations */
            min-height: 50px; /* Increased minimum height for better tap targets */
          }

          .mobile-nav-link.active-mobile-nav-link {
            border-bottom-color: rgba(255, 215, 0, 0.3);
          }
          
          /* Ensure navbar is visible at all times */
          .navbar {
            will-change: transform; /* Hardware acceleration */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            z-index: 9999 !important;
            position: fixed !important;
          }
          
          /* Improve performance by reducing repaints */
          .navbar .container {
            will-change: transform;
          }
          
          /* Fix navbar height on iOS */
          .navbar-wrapper {
            position: fixed !important;
            top: env(safe-area-inset-top, 0);
            left: 0;
            right: 0;
          }
          
          /* Improve scrolling behavior on iOS */
          .mobile-menu {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding-top: calc(env(safe-area-inset-top, 0) + 60px) !important; /* Increased padding to account for the navbar */
            padding-bottom: calc(env(safe-area-inset-bottom, 0) + 20px) !important;
          }
          
          /* Better spacing for mobile menu items */
          .mobile-nav-links {
            width: 85% !important;
            max-width: 350px !important;
          }
          
          /* Improve mobile button appearance */
          .mobile-btn {
            background-color: rgba(255, 215, 0, 0.15) !important;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.1) !important;
            color: white !important;
          }
          
          .mobile-btn:active {
            background-color: rgba(255, 215, 0, 0.25) !important;
            color: white !important;
            transform: scale(0.98) !important;
          }
        }
        
        /* Better tap targets for mobile */
        @media (max-width: 768px) {
          .mobile-nav-link {
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          button[aria-label="Toggle menu"] {
            min-width: 44px;
            min-height: 44px;
            display: flex !important;
            margin-right: 0.5rem; /* Add some margin for better positioning */
          }
          
          /* Improve mobile toggle button visibility */
          button[aria-label="Toggle menu"] {
            background-color: rgba(255, 215, 0, 0.1) !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
        }
        
        /* Lighten animation effects for better performance */
        .btn, .nav-link, .mobile-nav-link, .logo {
          will-change: transform, opacity;
          -webkit-font-smoothing: antialiased;
        }

        /* Fix for various mobile browsers */
        @media screen and (max-width: 768px) {
          .navbar-wrapper {
            visibility: visible !important;
            display: block !important;
            opacity: 1 !important;
          }
          
          .navbar {
            visibility: visible !important;
            display: block !important;
          }
          
          /* Fix pointer events for all clickable elements */
          .navbar *, .mobile-menu * {
            pointer-events: auto !important;
          }
        }

        /* Only set pointer cursor on truly interactive elements */
        button, 
        input[type="submit"], 
        input[type="button"], 
        input[type="reset"],
        select,
        label[for],
        .btn,
        .nav-link,
        .mobile-nav-link,
        .logo {
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Navbar; 