import React, { useState, useEffect } from 'react';
import './Clothing.css'; // Ensure this CSS file is in the same directory or update the path as necessary

const MenClothing = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.103:8080/api/clothing-items'); // Replace with your API endpoint
        const data = await response.json();
        // Filter items by category 'Men'
        const menItems = data.filter(item => item.category === 'Men');
        setItems(menItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle adding items to the cart or updating quantity
  const addToCart = async (item) => {
    const { id, name, imageUrl, price, category } = item; // Ensure category is included

    try {
      // Check if the item already exists in the cart
      const response = await fetch('http://localhost:8080/api/cart'); // Get all cart items
      const existingItems = await response.json();

      const existingItem = existingItems.find(cartItem => cartItem.itemId === id);

      if (existingItem) {
        // Item exists, update quantity
        await fetch(`http://localhost:8080/api/cart/${existingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: existingItem.quantity + 1
          }),
        });

        console.log(`${name} quantity updated to ${existingItem.quantity + 1}`);
      } else {
        // Item does not exist, add to cart
        await fetch('http://localhost:8080/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemId: id,
            title: name,
            imageUrl: imageUrl,
            price: price,
            quantity: 1,
            category: category // Add category to the cart item
          }),
        });

        console.log(`${name} added to cart at price ₹${price}`);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.map((item) => (
          <div className="col" key={item.id}>
            <div className="card">
              <img
                src={item.imageUrl} // Use the image URL from the API
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h2>{item.heading}</h2>
                <h5 className="card-title">{item.name}</h5>
                <p id="Price">Price: ₹{item.price}</p>
                <div className="button-container">
                  <a
                    href="#"
                    className="btn btn-dark hover-target"
                    id="addToCart"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      addToCart(item); // Pass the entire item object to addToCart
                    }}
                  >
                    Add to Cart
                  </a>
                  <button
                    type="button"
                    className="btn btn-dark btn-lg hover-target"
                    id="viewDetails"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${item.id}`}
                  >
                    View Details
                  </button>
                </div>

                {/* Modal Body */}
                <div
                  className="modal fade"
                  id={`modal-${item.id}`}
                  tabIndex="-1"
                  aria-labelledby={`modal-${item.id}-Label`}
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`modal-${item.id}-Label`}>
                          {item.title} {/* Updated to use 'title' instead of 'name' */}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {item.modalBody} {/* Display modal body text */}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn hover-target"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Modal Body */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenClothing;
