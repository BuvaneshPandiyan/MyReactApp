import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(''); // Add error state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await fetch('https://mark1-nf8t.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully!');
        navigate('/login');
      } else {
        const data = await response.json();
        if (data.message === 'Email already exists') {
          setError('Email already exists. Use a different email.');
        } else {
          setError('Failed to register user');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={styles['form-control']}
            required
          />
        </div>
        <button type="submit" className={styles.btn + ' ' + styles['btn-primary']}>Sign Up</button>
        <Link className={styles.btn + ' ' + styles['btn-primary']} to="/login">Login</Link>
      </form>
    </div>
  );
};

export default SignUp;
