import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },
    removeItem: (state, action) => {
      // Remove the item from the cart based on its name
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      
      // Find the item in the cart
      const item = state.items.find(item => item.name === name);
      
      if (item) {
        // Update the quantity if the item exists
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      // Clear all items from the cart
      state.items = [];
    }
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

// Export the reducer
export default CartSlice.reducer;
