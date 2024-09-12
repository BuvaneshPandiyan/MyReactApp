import React, { useState } from 'react';
import './CheckOut.css';


const CheckOut = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can handle the form submission, such as sending the data to an API.
        console.log('Payment Method:', paymentMethod);
        console.log('Address:', address);
        console.log('Contact Number:', contactNumber);
        alert('Order confirmed!');
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="payment-options">
                    <h3>Select Payment Method:</h3>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            checked={paymentMethod === 'Cash on Delivery'}
                            onChange={handlePaymentChange}
                        />
                        Cash on Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Card Payment"
                            checked={paymentMethod === 'Card Payment'}
                            onChange={handlePaymentChange}
                        />
                        Card Payment
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Online Payment"
                            checked={paymentMethod === 'Online Payment'}
                            onChange={handlePaymentChange}
                        />
                        Online Payment (Google Pay / PhonePe)
                    </label>
                </div>

                <div className="input-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="text"
                        id="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Confirm Order</button>
            </form>
        </div>
    );
};

export default CheckOut;
