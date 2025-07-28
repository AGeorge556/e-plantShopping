import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLeaf, 
  FaTruck, 
  FaShieldAlt, 
  FaHeadset,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaYoutube,
  FaCreditCard
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      // Reset subscription status after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer">
      {/* Main Footer - Light & Spacious */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <img 
                  src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" 
                  alt="Paradise Nursery Logo" 
                />
                <div>
                  <h3>Paradise Nursery</h3>
                  <p>Where Green Meets Serenity</p>
                </div>
              </div>
              
              <p className="footer-description">
                Bringing nature closer to you with premium indoor plants that enhance your space 
                and contribute to a healthier, more sustainable lifestyle.
              </p>
              
              <div className="footer-contact">
                <div className="contact-item">
                  <FaPhone />
                  <span>1-800-PARADISE</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope />
                  <span>hello@paradisenursery.com</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>123 Green Street, Garden City, GC 12345</span>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div className="footer-section">
              <h4>Shop</h4>
              <ul>
                <li><a href="#all-plants">All Plants</a></li>
                <li><a href="#air-purifying">Air Purifying</a></li>
                <li><a href="#low-maintenance">Low Maintenance</a></li>
                <li><a href="#pet-safe">Pet Safe</a></li>
                <li><a href="#gift-cards">Gift Cards</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#care-guide">Plant Care Guide</a></li>
                <li><a href="#plant-finder">Plant Finder Quiz</a></li>
                <li><a href="#shipping">Shipping Info</a></li>
                <li><a href="#returns">Returns & Exchanges</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
              
              <div className="expert-support">
                <FaHeadset />
                <span>24/7 customer care</span>
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#guarantee">30-Day Guarantee</a></li>
                <li><a href="#sustainability">Hassle-free Sustainability</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="footer-section">
              <div className="newsletter-section">
                <h4>Stay Green</h4>
                <p>Get plant care tips, seasonal recommendations, and exclusive offers delivered to your inbox.</p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                    <div className="newsletter-input-wrapper">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <button type="submit">Subscribe</button>
                    </div>
                  </form>
                ) : (
                  <div className="newsletter-success">
                    <FaLeaf />
                    <p>Thank you for subscribing!</p>
                  </div>
                )}
              </div>
              
              <div className="social-links">
                <h5>Follow Us</h5>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                    <FaPinterest />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © 2024 Paradise Nursery. All rights reserved.
            </div>
            
            <div className="footer-legal">
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#accessibility">Accessibility</a></li>
              </ul>
            </div>
            
            <div className="footer-payment">
              <span>We accept:</span>
              <div className="payment-methods">
                <FaCreditCard />
                <span>Visa</span>
                <FaCreditCard />
                <span>Mastercard</span>
                <FaCreditCard />
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 