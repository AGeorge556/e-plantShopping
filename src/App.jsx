
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProductList from './components/Products/ProductList';
import AboutUs from './AboutUs';
import './App.css';
import './styles/components.css';
import './styles/product-list.css';
import { FaLeaf, FaTruck, FaShieldAlt } from 'react-icons/fa';

// Landing Page Component
const LandingPage = ({ onGetStartedClick }) => {
  return (
    <motion.div 
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Paradise Nursery - Where Green Meets Serenity</title>
        <meta name="description" content="Discover premium indoor plants for your home and office. Air-purifying plants, low-maintenance options, and expert care tips." />
      </Helmet>
      
      <div className="background-image"></div>
      <div className="content">
        <div className="landing_content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome To Paradise Nursery
          </motion.h1>
          
          <motion.div 
            className="divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          ></motion.div>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Where Green Meets Serenity
          </motion.p>
          
          <motion.button 
            className="get-started-button"
            onClick={onGetStartedClick}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
        
        <div className="aboutus_container">
          <AboutUs />
        </div>
      </div>
    </motion.div>
  );
};

// Main App Component
function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/' && !showProductList;

  return (
    <div className="app-container">
      <Helmet>
        <title>Paradise Nursery - Premium Indoor Plants</title>
        <meta name="description" content="Premium indoor plants for your home and office. Air-purifying plants, low-maintenance options, and expert care tips." />
        <meta name="keywords" content="indoor plants, air purifying plants, low maintenance plants, houseplants, plant care" />
        <link rel="canonical" href="https://ageorge556.github.io/e-plantShopping/" />
      </Helmet>

      {/* Header - only show when not on landing page */}
      {!isLandingPage && (
        <Header 
          onCartClick={handleCartClick}
          onHomeClick={handleHomeClick}
        />
      )}

      {/* Main Content */}
      <main className={`main-content ${!isLandingPage ? 'with-header' : ''}`}>
        {/* Promo Section - Clean & Properly Positioned */}
        {!isLandingPage && (
          <motion.section 
            className="promo-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container">
              <div className="promo-grid">
                <motion.div 
                  className="promo-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="promo-icon">
                    <FaLeaf />
                  </div>
                  <div className="promo-content">
                    <h3>Premium Quality</h3>
                    <p>Carefully selected plants</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="promo-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="promo-icon">
                    <FaTruck />
                  </div>
                  <div className="promo-content">
                    <h3>Fast Delivery</h3>
                    <p>Free shipping over $50</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="promo-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="promo-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="promo-content">
                    <h3>30-Day Guarantee</h3>
                    <p>Hassle-free returns</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        <AnimatePresence mode="wait">
          {isLandingPage ? (
            <LandingPage key="landing" onGetStartedClick={handleGetStartedClick} />
          ) : (
            <motion.div 
              key="products"
              className="product-list-container"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <ProductList 
                onCartClick={handleCartClick}
                onHomeClick={handleHomeClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Content Divider */}
      {!isLandingPage && <div className="content-divider"></div>}

      {/* Footer - always show at the bottom */}
      <Footer />
    </div>
  );
}

export default App;



