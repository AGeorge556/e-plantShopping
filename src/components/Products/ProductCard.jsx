import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { 
  FaHeart, 
  FaRegHeart, 
  FaEye, 
  FaStar, 
  FaTruck, 
  FaLeaf,
  FaThermometerHalf,
  FaTint,
  FaSun
} from 'react-icons/fa';
import { addItem, updateQuantity, removeItem } from '../../CartSlice';
import { toast } from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ plant, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showCareInfo, setShowCareInfo] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const findCartItem = (name) => {
    return items.find(item => item.name === name);
  };

  const getItemQuantity = (name) => {
    const item = findCartItem(name);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = () => {
    dispatch(addItem(plant));
    toast.success(`${plant.name} added to cart!`);
  };

  const handleIncrementQuantity = () => {
    const item = findCartItem(plant.name);
    if (item) {
      dispatch(updateQuantity({
        name: plant.name,
        quantity: item.quantity + 1
      }));
      toast.success(`Added another ${plant.name}`);
    } else {
      handleAddToCart();
    }
  };

  const handleDecrementQuantity = () => {
    const item = findCartItem(plant.name);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({
        name: plant.name,
        quantity: item.quantity - 1
      }));
      toast.success(`Removed one ${plant.name}`);
    } else if (item && item.quantity === 1) {
      dispatch(removeItem(plant.name));
      toast.success(`${plant.name} removed from cart`);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = () => {
    onQuickView(plant);
  };

  // Enhanced plant data with care information
  const getCareInfo = () => {
    const careData = {
      'Snake Plant': { light: 'Low', water: 'Low', humidity: 'Low', temp: '60-85°F' },
      'Spider Plant': { light: 'Medium', water: 'Medium', humidity: 'Medium', temp: '60-75°F' },
      'Peace Lily': { light: 'Low', water: 'High', humidity: 'High', temp: '65-80°F' },
      'Boston Fern': { light: 'Medium', water: 'High', humidity: 'High', temp: '60-75°F' },
      'Rubber Plant': { light: 'Medium', water: 'Medium', humidity: 'Medium', temp: '60-80°F' },
      'Aloe Vera': { light: 'High', water: 'Low', humidity: 'Low', temp: '55-80°F' },
      'Lavender': { light: 'High', water: 'Low', humidity: 'Low', temp: '60-70°F' },
      'Jasmine': { light: 'High', water: 'Medium', humidity: 'Medium', temp: '65-75°F' },
      'Rosemary': { light: 'High', water: 'Low', humidity: 'Low', temp: '60-70°F' },
      'Mint': { light: 'Medium', water: 'High', humidity: 'Medium', temp: '60-70°F' },
      'Lemon Balm': { light: 'Medium', water: 'Medium', humidity: 'Medium', temp: '60-75°F' },
      'Hyacinth': { light: 'Medium', water: 'Medium', humidity: 'Medium', temp: '60-70°F' },
      'ZZ Plant': { light: 'Low', water: 'Low', humidity: 'Low', temp: '65-75°F' },
      'Pothos': { light: 'Low', water: 'Medium', humidity: 'Medium', temp: '60-85°F' },
      'Cast Iron Plant': { light: 'Low', water: 'Low', humidity: 'Low', temp: '60-75°F' },
      'Succulents': { light: 'High', water: 'Low', humidity: 'Low', temp: '60-80°F' },
      'Aglaonema': { light: 'Low', water: 'Medium', humidity: 'Medium', temp: '65-80°F' }
    };
    return careData[plant.name] || { light: 'Medium', water: 'Medium', humidity: 'Medium', temp: '60-75°F' };
  };

  const careInfo = getCareInfo();
  const currentQuantity = getItemQuantity(plant.name);
  const price = parseFloat(plant.cost.replace('$', ''));

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      layout
    >
      {/* Product image */}
      <div className="product-image-container">
        <LazyLoadImage
          src={plant.image}
          alt={plant.name}
          effect="blur"
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3C/svg%3E"
        />
        
        {/* Image overlay actions */}
        <div className="product-image-overlay">
          <motion.button
            className="overlay-btn wishlist-btn"
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted ? <FaHeart className="filled" /> : <FaRegHeart />}
          </motion.button>
          
          <motion.button
            className="overlay-btn quick-view-btn"
            onClick={handleQuickView}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Quick view"
          >
            <FaEye />
          </motion.button>
        </div>

        {/* Care level badge */}
        <div className="care-level-badge">
          <FaLeaf />
          <span>Easy Care</span>
        </div>

        {/* Free shipping badge */}
        {price >= 50 && (
          <div className="shipping-badge">
            <FaTruck />
            <span>Free Shipping</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="product-info">
        <h3 className="product-name">{plant.name}</h3>
        
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <FaStar key={star} className="star filled" />
            ))}
          </div>
          <span className="rating-text">(4.8 • 127 reviews)</span>
        </div>

        <p className="product-description">{plant.description}</p>
        
        {/* Care info toggle */}
        <button 
          className="care-info-toggle"
          onClick={() => setShowCareInfo(!showCareInfo)}
        >
          <FaLeaf />
          <span>Care Info</span>
        </button>

        {/* Care information */}
        <AnimatePresence>
          {showCareInfo && (
            <motion.div 
              className="care-info"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="care-item">
                <FaSun />
                <span>Light: {careInfo.light}</span>
              </div>
              <div className="care-item">
                <FaTint />
                <span>Water: {careInfo.water}</span>
              </div>
              <div className="care-item">
                <FaThermometerHalf />
                <span>Temp: {careInfo.temp}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="product-price">
          <span className="price">{plant.cost}</span>
          {price >= 50 && <span className="free-shipping">Free Shipping</span>}
        </div>

        {/* Add to cart section */}
        <div className="product-actions">
          {currentQuantity > 0 ? (
            <div className="quantity-controls">
              <motion.button 
                className="quantity-btn"
                onClick={handleDecrementQuantity}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Decrease quantity"
              >
                -
              </motion.button>
              <span className="quantity-display">{currentQuantity}</span>
              <motion.button 
                className="quantity-btn"
                onClick={handleIncrementQuantity}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Increase quantity"
              >
                +
              </motion.button>
            </div>
          ) : (
            <motion.button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 