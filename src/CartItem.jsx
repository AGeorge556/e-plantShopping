import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    // Calculate total amount for all items
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.cost.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    };

    // Calculate subtotal for a single item
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.replace('$', ''));
        return (price * item.quantity).toFixed(2);
    };

    // Handle increment quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            quantity: item.quantity + 1
        }));
    };

    // Handle decrement quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                name: item.name,
                quantity: item.quantity - 1
            }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Handle remove item
    const handleRemove = (itemName) => {
        dispatch(removeItem(itemName));
    };

    // Handle continue shopping
    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    // Handle checkout (placeholder)
    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={handleContinueShopping}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.name} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="cart-item-cost">${item.cost}</p>
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => handleDecrement(item)}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleIncrement(item)}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="subtotal">Subtotal: ${calculateTotalCost(item)}</p>
                                </div>
                                <button 
                                    onClick={() => handleRemove(item.name)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
                        <p className="total-amount">Total Amount: ${calculateTotalAmount().toFixed(2)}</p>
                        <div className="cart-buttons">
                            <button onClick={handleContinueShopping} className="continue-shopping-btn">
                                Continue Shopping
                            </button>
                            <button onClick={handleCheckoutShopping} className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;


