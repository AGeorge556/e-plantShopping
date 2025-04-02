import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer, // Assign the cart reducer to manage the cart slice of state
    },
});

// Export the configured store
export default store;
