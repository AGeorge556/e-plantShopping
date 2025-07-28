import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilter, 
  FaSort, 
  FaSearch, 
  FaTimes, 
  FaThLarge,
  FaList,
  FaLeaf,
  FaThermometerHalf,
  FaTint,
  FaSun,
  FaStar
} from 'react-icons/fa';
import ProductCard from './ProductCard';
import { toast } from 'react-hot-toast';

const ProductList = ({ onCartClick, onHomeClick }) => {
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCareLevel, setSelectedCareLevel] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { items } = useSelector((state) => state.cart);

  // Enhanced plant data with more details
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
          careLevel: "easy",
          light: "low",
          water: "low",
          rating: 4.8,
          reviews: 127,
          inStock: true,
          tags: ["air-purifying", "low-maintenance", "pet-safe"]
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
          careLevel: "easy",
          light: "medium",
          water: "medium",
          rating: 4.6,
          reviews: 89,
          inStock: true,
          tags: ["air-purifying", "easy-care", "hanging"]
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
          careLevel: "medium",
          light: "low",
          water: "high",
          rating: 4.7,
          reviews: 156,
          inStock: true,
          tags: ["air-purifying", "flowering", "humidity-loving"]
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20",
          careLevel: "medium",
          light: "medium",
          water: "high",
          rating: 4.5,
          reviews: 73,
          inStock: true,
          tags: ["air-purifying", "humidity-loving", "classic"]
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17",
          careLevel: "easy",
          light: "medium",
          water: "medium",
          rating: 4.9,
          reviews: 203,
          inStock: true,
          tags: ["air-purifying", "statement", "indoor-tree"]
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14",
          careLevel: "easy",
          light: "high",
          water: "low",
          rating: 4.8,
          reviews: 342,
          inStock: true,
          tags: ["air-purifying", "medicinal", "succulent"]
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
          careLevel: "medium",
          light: "high",
          water: "low",
          rating: 4.7,
          reviews: 98,
          inStock: true,
          tags: ["aromatic", "calming", "outdoor-friendly"]
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18",
          careLevel: "medium",
          light: "high",
          water: "medium",
          rating: 4.6,
          reviews: 67,
          inStock: true,
          tags: ["aromatic", "climbing", "fragrant"]
        },
        {
          name: "Rosemary",
          image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Invigorating scent, often used in cooking.",
          cost: "$15",
          careLevel: "easy",
          light: "high",
          water: "low",
          rating: 4.8,
          reviews: 145,
          inStock: true,
          tags: ["aromatic", "culinary", "herb"]
        },
        {
          name: "Mint",
          image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma, used in teas and cooking.",
          cost: "$12",
          careLevel: "easy",
          light: "medium",
          water: "high",
          rating: 4.5,
          reviews: 89,
          inStock: true,
          tags: ["aromatic", "culinary", "fast-growing"]
        },
        {
          name: "Lemon Balm",
          image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
          description: "Citrusy scent, relieves stress and promotes sleep.",
          cost: "$14",
          careLevel: "easy",
          light: "medium",
          water: "medium",
          rating: 4.4,
          reviews: 56,
          inStock: true,
          tags: ["aromatic", "medicinal", "calming"]
        },
        {
          name: "Hyacinth",
          image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
          description: "Beautiful flowering plant known for its fragrant blooms.",
          cost: "$22",
          careLevel: "medium",
          light: "medium",
          water: "medium",
          rating: 4.7,
          reviews: 78,
          inStock: true,
          tags: ["aromatic", "flowering", "spring-bloom"]
        }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "ZZ Plant",
          image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Thrives in low light and requires minimal watering.",
          cost: "$25",
          careLevel: "easy",
          light: "low",
          water: "low",
          rating: 4.9,
          reviews: 234,
          inStock: true,
          tags: ["low-maintenance", "indestructible", "modern"]
        },
        {
          name: "Pothos",
          image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
          description: "Tolerates neglect and can grow in various conditions.",
          cost: "$10",
          careLevel: "easy",
          light: "low",
          water: "medium",
          rating: 4.8,
          reviews: 189,
          inStock: true,
          tags: ["low-maintenance", "trailing", "versatile"]
        },
        {
          name: "Cast Iron Plant",
          image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
          description: "Hardy plant that tolerates low light and neglect.",
          cost: "$20",
          careLevel: "easy",
          light: "low",
          water: "low",
          rating: 4.6,
          reviews: 92,
          inStock: true,
          tags: ["low-maintenance", "indestructible", "classic"]
        },
        {
          name: "Succulents",
          image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
          description: "Drought-tolerant plants with unique shapes and colors.",
          cost: "$18",
          careLevel: "easy",
          light: "high",
          water: "low",
          rating: 4.7,
          reviews: 156,
          inStock: true,
          tags: ["low-maintenance", "drought-tolerant", "decorative"]
        },
        {
          name: "Aglaonema",
          image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
          description: "Requires minimal care and adds color to indoor spaces.",
          cost: "$22",
          careLevel: "easy",
          light: "low",
          water: "medium",
          rating: 4.5,
          reviews: 78,
          inStock: true,
          tags: ["low-maintenance", "colorful", "compact"]
        }
      ]
    }
  ];

  // Flatten all plants for filtering
  const allPlants = useMemo(() => {
    return plantsArray.flatMap(category => 
      category.plants.map(plant => ({
        ...plant,
        category: category.category
      }))
    );
  }, []);

  // Filter and sort plants
  const filteredPlants = useMemo(() => {
    let filtered = allPlants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           plant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           plant.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
      const matchesCareLevel = selectedCareLevel === 'all' || plant.careLevel === selectedCareLevel;
      const matchesPrice = parseFloat(plant.cost.replace('$', '')) >= priceRange[0] && 
                          parseFloat(plant.cost.replace('$', '')) <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesCareLevel && matchesPrice && plant.inStock;
    });

    // Sort plants
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.cost.replace('$', '')) - parseFloat(b.cost.replace('$', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.cost.replace('$', '')) - parseFloat(a.cost.replace('$', '')));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [allPlants, searchQuery, selectedCategory, selectedCareLevel, priceRange, sortBy]);

  // Ensure we always have plants to show
  const plantsToShow = filteredPlants.length > 0 ? filteredPlants : allPlants.slice(0, 6);

  const categories = ['all', ...plantsArray.map(cat => cat.category)];
  const careLevels = ['all', 'easy', 'medium', 'hard'];

  const handleQuickView = (plant) => {
    setSelectedPlant(plant);
    // You can implement a modal here
    toast.success(`Quick view: ${plant.name}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCareLevel('all');
    setPriceRange([0, 50]);
    setSortBy('name');
    toast.success('Filters cleared');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="product-list-container">
      {/* Header with search and filters */}
      <div className="product-list-header">
        <div className="container">
          <div className="header-content">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search plants, care tips, or plant types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="controls-section">
              <motion.button
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFilter />
                <span>Filters</span>
                {showFilters && <span className="filter-count">3</span>}
              </motion.button>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="view-toggle">
                <motion.button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaThLarge />
                </motion.button>
                <motion.button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaList />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Results summary */}
          <div className="products-header">
            <div className="results-count">
              Showing {filteredPlants.length} of {allPlants.length} plants
              {searchQuery && ` for "${searchQuery}"`}
            </div>
            {(searchQuery || selectedCategory !== 'all' || selectedCareLevel !== 'all' || priceRange[1] !== 50) && (
              <button onClick={clearFilters} className="clear-filters">
                <FaTimes />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="product-list-content">
        {/* Filters sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="filters-sidebar"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="filters-header">
                <h3>Filters</h3>
                <button onClick={clearFilters} className="clear-filters">
                  Clear All
                </button>
              </div>

              <div className="filter-group">
                <h4>Categories</h4>
                <div className="filter-options">
                  {categories.map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="checkbox"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      <span>{category === 'all' ? 'All Categories' : category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Care Level</h4>
                <div className="filter-options">
                  {careLevels.map(level => (
                    <label key={level} className="filter-option">
                      <input
                        type="checkbox"
                        value={level}
                        checked={selectedCareLevel === level}
                        onChange={(e) => setSelectedCareLevel(e.target.value)}
                      />
                      <span>{level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-range">
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      className="price-input"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="price-input"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product grid */}
        <div className="products-section">
          
          <div className={`product-grid ${viewMode}`}>
            <AnimatePresence mode="wait">
              {plantsToShow.map((plant, index) => (
                <motion.div
                  key={plant.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <ProductCard 
                    plant={plant} 
                    onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No results */}
          {filteredPlants.length === 0 && (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaLeaf className="no-results-icon" />
              <h3>No plants found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList; 