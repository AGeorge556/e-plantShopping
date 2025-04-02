import { createSlice } from '@reduxjs/toolkit';

// Initialize the cart state
const initialState = {
    items: [], // Array to store cart items
    totalItems: 0, // Total number of items in cart
    totalAmount: 0 // Total cost of all items
};

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            
            if (existingItem) {
                // If item exists, increment its quantity
                existingItem.quantity += 1;
                existingItem.subtotal = parseFloat(existingItem.cost.replace('$', '')) * existingItem.quantity;
            } else {
                // If item doesn't exist, add it with quantity 1
                const newItem = {
                    ...action.payload,
                    quantity: 1,
                    subtotal: parseFloat(action.payload.cost.replace('$', ''))
                };
                state.items.push(newItem);
            }
            
            // Update total items and amount
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.subtotal, 0);
        },
        
        removeItem: (state, action) => {
            // Remove the item from the cart based on its name
            state.items = state.items.filter(item => item.name !== action.payload);
            
            // Update total items and amount
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.subtotal, 0);
        },
        
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            
            if (item) {
                if (quantity > 0) {
                    // Update quantity and subtotal
                    item.quantity = quantity;
                    item.subtotal = parseFloat(item.cost.replace('$', '')) * quantity;
                } else {
                    // If quantity is 0, remove the item
                    state.items = state.items.filter(item => item.name !== name);
                }
                
                // Update total items and amount
                state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = state.items.reduce((total, item) => total + item.subtotal, 0);
            }
        },
        
        clearCart: (state) => {
            // Reset cart to initial state
            state.items = [];
            state.totalItems = 0;
            state.totalAmount = 0;
        }
    }
});

// Export action creators
export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

// Export the reducer
export default CartSlice.reducer;
