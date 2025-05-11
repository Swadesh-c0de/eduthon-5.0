import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

import './App.css';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import WhatToExpect from './components/WhatToExpect';
import WhoWillAttend from './components/WhoWillAttend';
import WhyEduthon from './components/WhyEduthon';
import Legacy from './components/Legacy';
import Sponsors from './components/Sponsors';
import JoinMovement from './components/JoinMovement';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('interest'); // 'interest' or 'sponsor'
  const [loading, setLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // RAF reference for scroll events
  const scrollRAFRef = useRef(null);

  useEffect(() => {
    // Simulate loading time and hide preloader
    setTimeout(() => {
      setLoading(false);
      
      // Small delay before showing page content with animation
      setTimeout(() => {
        setPageReady(true);
      }, 100);
    }, 2000);
  }, []);

  // Control back to top button visibility with Intersection Observer instead of scroll events
  useEffect(() => {
    // Create an observer for the scroll position
    const observerOptions = {
      root: null,
      rootMargin: '500px 0px 0px 0px', // Show button after scrolling 500px
      threshold: 0
    };
    
    const topSentinel = document.createElement('div');
    topSentinel.style.position = 'absolute';
    topSentinel.style.top = '0';
    topSentinel.style.height = '1px';
    topSentinel.style.width = '1px';
    topSentinel.style.pointerEvents = 'none';
    document.body.appendChild(topSentinel);
    
    const observer = new IntersectionObserver((entries) => {
      // When the top sentinel is not visible (scrolled down), show back-to-top button
      setShowBackToTop(!entries[0].isIntersecting);
    }, observerOptions);
    
    observer.observe(topSentinel);
    
    return () => {
      observer.disconnect();
      document.body.removeChild(topSentinel);
    };
  }, []);

  // Handle fade-in animations with optimized implementation
  useEffect(() => {
    // Use a single IntersectionObserver instance for performance
    const observerOptions = { 
      threshold: 0.1,
      rootMargin: '0px 0px 50px 0px'
    };
    
    // Create observer once
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('appear');
          });
          
          // Unobserve after animation is triggered for performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Wait a frame before observing elements for better performance during initial load
    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
      });
    }, 0);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleRegisterClick = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleBackToTop = () => {
    // Get the current scroll position
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    
    // Create a visual feedback element
    const createScrollEffect = () => {
      // Create a subtle indicator that flies to the top
      const indicator = document.createElement('div');
      indicator.style.cssText = `
        position: fixed;
        z-index: 10000;
        left: 50%;
        bottom: 30%;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--secondary-color);
        box-shadow: 0 0 10px var(--secondary-color);
        transform: translateX(-50%);
        transition: bottom 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        pointer-events: none;
        opacity: 0.8;
      `;
      document.body.appendChild(indicator);
      
      // Animate the indicator to the top
      setTimeout(() => {
        indicator.style.bottom = '120%';
        indicator.style.opacity = '0';
      }, 10);
      
      // Remove the indicator after animation
      setTimeout(() => {
        document.body.removeChild(indicator);
      }, 700);
    };
    
    // Create the visual effect
    createScrollEffect();
    
    // Enhanced smooth scrolling with easing
    const duration = 800; // Duration in ms
    const startTime = performance.now();
    
    // Smooth scroll animation function
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function: ease-out cubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      // Calculate new scroll position
      const targetY = 0;
      const newY = scrollY - (scrollY * easeOutCubic);
      
      // Scroll to the new position
      window.scrollTo(scrollX, newY);
      
      // Continue the animation if we're not done
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Ensure we end at exactly the top
        window.scrollTo(scrollX, 0);
      }
    };
    
    // Start the smooth scroll animation
    requestAnimationFrame(animateScroll);

    // Fallbacks for compatibility
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch(e) {
      // Already handled by our custom animation
    }
    
    // Direct DOM manipulation as another fallback
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
  };

  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <div className="preloader-logo">
            <div className="preloader-dot"></div>
            EDUTHON<span>5.0</span>
          </div>
          <div className="preloader-bar">
            <div className="preloader-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${pageReady ? 'page-ready' : ''}`}>
      <Navbar />
      <Hero onRegisterClick={handleRegisterClick} />
      <Introduction />
      <WhatToExpect />
      <WhoWillAttend />
      <WhyEduthon />
      <Legacy />
      <Sponsors onRegisterClick={handleRegisterClick} />
      <JoinMovement onRegisterClick={handleRegisterClick} />
      <Footer />
      
      {showForm && (
        <RegisterForm 
          formType={formType} 
          onClose={handleCloseForm} 
        />
      )}
      
      <div className="floating-buttons-container">
        <button 
          className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
          onClick={handleBackToTop}
          aria-label="Back to top"
        >
          <FaArrowUp size={20} color="#000" />
        </button>
        
        <a 
          href="https://wa.me/+919876543210" 
          target="_blank" 
          rel="noopener noreferrer"
          className="floating-whatsapp"
        >
          <FaWhatsapp size={28} color="#fff" />
        </a>
      </div>
    </div>
  );
}

export default App;
