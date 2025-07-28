import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaLeaf, 
  FaSun, 
  FaTint, 
  FaHome, 
  FaPaw, 
  FaBaby, 
  FaArrowRight, 
  FaArrowLeft,
  FaCheck,
  FaStar
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PlantQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'experience',
      question: 'What\'s your experience level with plants?',
      options: [
        { value: 'beginner', label: 'Complete beginner', icon: '🌱' },
        { value: 'intermediate', label: 'Some experience', icon: '🌿' },
        { value: 'expert', label: 'Plant expert', icon: '🌳' }
      ]
    },
    {
      id: 'light',
      question: 'How much natural light does your space get?',
      options: [
        { value: 'low', label: 'Low light (north-facing, far from windows)', icon: '🌙' },
        { value: 'medium', label: 'Medium light (east/west-facing windows)', icon: '☀️' },
        { value: 'high', label: 'Bright light (south-facing, lots of windows)', icon: '🔥' }
      ]
    },
    {
      id: 'time',
      question: 'How much time can you dedicate to plant care?',
      options: [
        { value: 'low', label: 'Minimal time (forgetful or busy)', icon: '⏰' },
        { value: 'medium', label: 'Moderate time (weekly care)', icon: '📅' },
        { value: 'high', label: 'Lots of time (daily attention)', icon: '💚' }
      ]
    },
    {
      id: 'space',
      question: 'What type of space are you working with?',
      options: [
        { value: 'small', label: 'Small apartment/desk', icon: '🏠' },
        { value: 'medium', label: 'Medium room/house', icon: '🏡' },
        { value: 'large', label: 'Large space/garden', icon: '🏰' }
      ]
    },
    {
      id: 'pets',
      question: 'Do you have pets or children?',
      options: [
        { value: 'none', label: 'No pets or children', icon: '👤' },
        { value: 'pets', label: 'Pets (cats/dogs)', icon: '🐕' },
        { value: 'children', label: 'Children', icon: '👶' },
        { value: 'both', label: 'Both pets and children', icon: '🐕👶' }
      ]
    },
    {
      id: 'purpose',
      question: 'What\'s your main goal with plants?',
      options: [
        { value: 'decoration', label: 'Home decoration', icon: '🎨' },
        { value: 'air-purification', label: 'Air purification', icon: '💨' },
        { value: 'stress-relief', label: 'Stress relief & wellness', icon: '🧘' },
        { value: 'hobby', label: 'Gardening hobby', icon: '🌱' }
      ]
    }
  ];

  const plantRecommendations = {
    'beginner-low-low-small-none-decoration': [
      { name: 'Snake Plant', reason: 'Perfect for beginners, low maintenance, pet-safe' },
      { name: 'ZZ Plant', reason: 'Nearly indestructible, thrives in low light' },
      { name: 'Pothos', reason: 'Easy to care for, great for hanging or trailing' }
    ],
    'beginner-low-low-small-pets-decoration': [
      { name: 'Spider Plant', reason: 'Pet-safe, easy care, air-purifying' },
      { name: 'Boston Fern', reason: 'Pet-friendly, adds humidity' },
      { name: 'Parlor Palm', reason: 'Safe for pets, low maintenance' }
    ],
    'intermediate-medium-medium-medium-none-air-purification': [
      { name: 'Peace Lily', reason: 'Excellent air purifier, beautiful blooms' },
      { name: 'Rubber Plant', reason: 'Great air purifier, statement piece' },
      { name: 'Aloe Vera', reason: 'Air purifying, medicinal benefits' }
    ],
    'expert-high-high-large-none-hobby': [
      { name: 'Monstera Deliciosa', reason: 'Stunning foliage, climbing plant' },
      { name: 'Fiddle Leaf Fig', reason: 'Statement tree, dramatic leaves' },
      { name: 'Bird of Paradise', reason: 'Tropical beauty, large leaves' }
    ]
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const getRecommendations = () => {
    const key = Object.values(answers).join('-');
    return plantRecommendations[key] || [
      { name: 'Snake Plant', reason: 'Great all-around plant for any home' },
      { name: 'Pothos', reason: 'Versatile and easy to care for' },
      { name: 'Peace Lily', reason: 'Beautiful blooms and air-purifying' }
    ];
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowResults(true);
    setLoading(false);
    toast.success('Your personalized recommendations are ready!');
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const recommendations = getRecommendations();
    
    return (
      <div className="quiz-container results">
        <Helmet>
          <title>Your Plant Recommendations - Paradise Nursery</title>
          <meta name="description" content="Get personalized plant recommendations based on your lifestyle and home environment." />
        </Helmet>

        <motion.div 
          className="results-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="results-header">
            <FaStar className="results-icon" />
            <h1>Your Perfect Plants</h1>
            <p>Based on your answers, here are our top recommendations:</p>
          </div>

          <div className="recommendations-grid">
            {recommendations.map((plant, index) => (
              <motion.div 
                key={plant.name}
                className="recommendation-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="recommendation-header">
                  <FaLeaf className="plant-icon" />
                  <h3>{plant.name}</h3>
                </div>
                <p className="recommendation-reason">{plant.reason}</p>
                <button className="shop-now-btn">
                  Shop {plant.name}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="results-actions">
            <button onClick={resetQuiz} className="retake-quiz-btn">
              <FaArrowLeft />
              Retake Quiz
            </button>
            <button className="browse-all-btn">
              Browse All Plants
              <FaArrowRight />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <Helmet>
        <title>Plant Finder Quiz - Paradise Nursery</title>
        <meta name="description" content="Take our plant finder quiz to discover the perfect plants for your home and lifestyle." />
      </Helmet>

      <div className="quiz-header">
        <h1>Find Your Perfect Plant</h1>
        <p>Answer a few questions to get personalized plant recommendations</p>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion}
          className="question-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="question-text">{currentQ.question}</h2>
          
          <div className="options-grid">
            {currentQ.options.map((option) => (
              <motion.button
                key={option.value}
                className={`option-card ${answers[currentQ.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
                {answers[currentQ.id] === option.value && (
                  <FaCheck className="check-icon" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="quiz-navigation">
        {currentQuestion > 0 && (
          <motion.button
            className="nav-btn prev-btn"
            onClick={prevQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
            Previous
          </motion.button>
        )}
        
        <div className="nav-spacer"></div>
        
        {currentQuestion < questions.length - 1 ? (
          <motion.button
            className="nav-btn next-btn"
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <FaArrowRight />
          </motion.button>
        ) : (
          <motion.button
            className="nav-btn submit-btn"
            onClick={handleSubmit}
            disabled={!answers[currentQ.id] || loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
            <FaArrowRight />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default PlantQuiz; 