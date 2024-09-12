import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch cart items from the API when the component loads
    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch cart items from the API
    const fetchCartItems = () => {
        fetch('http://localhost:8080/api/cart')
            .then((response) => response.json())
            .then((data) => {
                const consolidatedItems = consolidateItems(data);
                setCartItems(consolidatedItems);
                calculateTotalPrice(consolidatedItems);
            })
            .catch((error) => console.error('Error fetching cart items:', error));
    };

    // Recalculate total price whenever cart items change
    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    // Consolidate items with the same ID
    const consolidateItems = (items) => {
        const itemMap = new Map();

        items.forEach((item) => {
            if (itemMap.has(item.id)) {
                const existingItem = itemMap.get(item.id);
                existingItem.quantity += item.quantity; // Increment quantity
                existingItem.price = (existingItem.price / existingItem.quantity) * existingItem.quantity; // Update price
            } else {
                itemMap.set(item.id, item);
            }
        });

        return Array.from(itemMap.values());
    };

    // Calculate total price of all items in the cart
    const calculateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    // Handle removing a cart item from the list
    const handleRemoveItem = (id) => {
        fetch(`http://localhost:8080/api/cart/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            // Refresh the cart items after removal
            fetchCartItems();
        })
        .catch((error) => console.error('Error removing item:', error));
    };

    // Handle decreasing the quantity of a cart item
    const handleDecreaseQuantity = (id, quantity, size) => {
        if (quantity > 1) {
            fetch(`http://localhost:8080/api/cart/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: quantity - 1,
                    size: size
                }),
            })
            .then(() => {
                // Refresh the cart items after update
                fetchCartItems();
            })
            .catch((error) => console.error('Error updating item quantity:', error));
        } else {
            // If quantity is 1, remove item completely
            handleRemoveItem(id);
        }
    };

    // Handle increasing the quantity of a cart item
    const handleIncreaseQuantity = (id, quantity, size) => {
        fetch(`http://localhost:8080/api/cart/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: quantity + 1,
                size: size
            }),
        })
        .then(() => {
            // Refresh the cart items after update
            fetchCartItems();
        })
        .catch((error) => console.error('Error updating item quantity:', error));
    };

    // Handle size selection
    const handleSizeChange = (id, size) => {
        fetch(`http://localhost:8080/api/cart/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                size: size
            }),
        })
        .then(() => {
            // Refresh the cart items after update
            fetchCartItems();
        })
        .catch((error) => console.error('Error updating item size:', error));
    };

    // Placeholder function for buying items
    const handleBuyNow = () => {
        alert('Proceeding to checkout');
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <p>Price: ₹{item.price} (x{item.quantity})</p>

                                    {/* Render size selection based on category */}
                                    {item.category === 'Men' || item.category === 'Women' || item.category === 'Kids' ? (
                                        <div className="size-selection">
                                            <label>Select Size:</label>
                                            <select
                                                value={item.size || ''}
                                                onChange={(e) => handleSizeChange(item.id, e.target.value)}
                                            >
                                                <option value="">Select size</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XXL">XXL</option>
                                            </select>
                                        </div>
                                    ) : item.category === 'shoes' ? (
                                        <div className="size-selection">
                                            <label>Select Size:</label>
                                            <select
                                                value={item.size || ''}
                                                onChange={(e) => handleSizeChange(item.id, e.target.value)}
                                            >
                                                <option value="">Select size</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                    ) : item.category === 'Watches' ? (
                                        <div className="size-selection">
                                            <p>No size selection required.</p>
                                        </div>
                                    ) : item.category === 'Perfumes' ? (
                                        <div className="size-selection">
                                            <p>No size selection required.</p>
                                        </div>
                                    ) : null}

                                    <div className="quantity-controls">
                                        <button className="decrease-btn" onClick={() => handleDecreaseQuantity(item.id, item.quantity, item.size)}>-</button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button className="increase-btn" onClick={() => handleIncreaseQuantity(item.id, item.quantity, item.size)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
           </div>
                    <div className="cart-total">
                        <h3>Total Price: ₹{totalPrice}</h3>
                        
                        <Link className="checkout-btn" onclick={handleBuyNow} to="/checkout" type='button'>Proceed to Checkout</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
