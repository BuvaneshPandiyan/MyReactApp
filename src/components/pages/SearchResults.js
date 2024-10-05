import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Clothing.css';
const SearchResults = () => {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure the API endpoint is correct and supports searching
        const response = await fetch(`https://mark1-nf8t.onrender.com/api/clothing-items?search=${encodeURIComponent(query)}`); // Replace with your API endpoint
        const data = await response.json();

        // Filter items based on the search query
        const filteredItems = data.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase()) || 
          item.description.toLowerCase().includes(query.toLowerCase())
        );

        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const addToCart = (itemName, price) => {
    console.log(`${itemName} added to cart at price ${price}`);
  };

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.length > 0 ? (
          items.map((item) => (
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
                      onClick={() => addToCart(item.name, item.price)}
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
                            {item.title}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          {item.modalBody}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn hover-target"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn hover-target">Add To Cart</button>
                          <button type="button" className="btn hover-target">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
