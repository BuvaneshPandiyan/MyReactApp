import React, { useState, useEffect } from 'react';
import './Categories.css';
import { Link, useParams } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { category } = useParams(); // Get category from URL parameters if available

  useEffect(() => {
    // Build the API URL based on the category
    let apiUrl = 'http://localhost:8080/api/categories'; // Default API URL
    if (category) {
      apiUrl += `?category=${category}`; // Add category filter to the URL
    }

    // Fetch data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [category]); // Dependency array includes category to refetch data when it changes

  return (
    <div className="container marketing">
      <div className="row">
        {categories.map(cat => (
          <div key={cat.id} className="col-lg-4 horizontal-card">
            <img 
              src={cat.imageUrl} 
              className="image-horizontal" 
              alt={cat.title} 
            />
            <div className="description">
            <h1 className="featurette-heading">{cat.title}</h1> {/* Added title here */}
              <p>{cat.description}</p>
              <Link className="btn btn-secondary hover-target" to={cat.link} role="button">
                {cat.buttonText} &raquo;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
