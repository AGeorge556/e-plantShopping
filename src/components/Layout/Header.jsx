import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaHeart, 
  FaUser, 
  FaShoppingCart, 
  FaBars, 
  FaTimes,
  FaPhone,
  FaLeaf,
  FaFacebook,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa';

const Header = ({ onCartClick, onHomeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Bar - Clean & Minimal */}
        <div className="header-top">
          <div className="container">
            <div className="header-top-content">
              <div className="header-contact">
                <FaPhone />
                <span>1-800-PARADISE</span>
              </div>
              
              <div className="header-promo">
                <FaLeaf />
                <span>Free shipping on orders over $50</span>
              </div>
              
              <div className="header-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header - Clean & Spacious */}
        <div className="header-main">
          <div className="container">
            <div className="header-content">
              {/* Logo - Elegant Typography */}
              <motion.a 
                href="#" 
                className="header-logo"
                onClick={onHomeClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" 
                  alt="Paradise Nursery Logo" 
                  className="logo-image"
                />
                <div className="logo-text">
                  <h1>Paradise Nursery</h1>
                  <p>Where Green Meets Serenity</p>
                </div>
              </motion.a>

              {/* Search Bar - Modern & Elegant */}
              <div className="header-search">
                <form onSubmit={handleSearch}>
                  <div className="search-input-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search for plants, care tips..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <button type="submit" className="search-button">
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {/* Header Actions - Clean Icons */}
              <div className="header-actions">
                <motion.button 
                  className="header-action-btn"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHeart />
                  <span className="action-label">Wishlist</span>
                </motion.button>
                
                <motion.button 
                  className="header-action-btn"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUser />
                  <span className="action-label">Account</span>
                </motion.button>
                
                <motion.button 
                  className="header-action-btn"
                  onClick={onCartClick}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShoppingCart />
                  <span className="action-label">Cart</span>
                  <span className="cart-badge">3</span>
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button 
                  className="mobile-menu-btn"
                  onClick={toggleMobileMenu}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Clean & Simple */}
        <nav className="header-nav">
          <div className="container">
            <ul className="nav-list">
              <li className="nav-item">
                <motion.a 
                  href="#" 
                  className="nav-link"
                  onClick={onHomeClick}
                  whileHover={{ y: -1 }}
                >
                  Home
                </motion.a>
              </li>
              <li className="nav-item">
                <motion.a 
                  href="#plants" 
                  className="nav-link"
                  whileHover={{ y: -1 }}
                >
                  Plants
                </motion.a>
              </li>
              <li className="nav-item">
                <motion.a 
                  href="#care-guide" 
                  className="nav-link"
                  whileHover={{ y: -1 }}
                >
                  Care Guide
                </motion.a>
              </li>
              <li className="nav-item">
                <motion.a 
                  href="#about" 
                  className="nav-link"
                  whileHover={{ y: -1 }}
                >
                  About
                </motion.a>
              </li>
              <li className="nav-item">
                <motion.a 
                  href="#contact" 
                  className="nav-link"
                  whileHover={{ y: -1 }}
                >
                  Contact
                </motion.a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            <motion.nav 
              className="mobile-menu"
              initial={{ transform: 'translateY(-100%)' }}
              animate={{ transform: 'translateY(0)' }}
              exit={{ transform: 'translateY(-100%)' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="container">
                <ul className="mobile-nav-list">
                  <li className="mobile-nav-item">
                    <a href="#" className="mobile-nav-link" onClick={closeMobileMenu}>
                      Home
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a href="#plants" className="mobile-nav-link" onClick={closeMobileMenu}>
                      Plants
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a href="#care-guide" className="mobile-nav-link" onClick={closeMobileMenu}>
                      Care Guide
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>
                      About
                    </a>
                  </li>
                  <li className="mobile-nav-item">
                    <a href="#contact" className="mobile-nav-link" onClick={closeMobileMenu}>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 