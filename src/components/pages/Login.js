import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css'; // Import the CSS module

const Login = () => {
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the users from the existing `user` API
      const response = await fetch('http://localhost:8080/api/users'); // Adjust URL to your API
      const users = await response.json();

      // Check if the entered credentials match any user
      const user = users.find(
        (u) =>
          (u.email === formData.emailOrUsername || u.username === formData.emailOrUsername) &&
          u.password === formData.password
      );

      if (user) {
        // Credentials are valid, proceed with login
        navigate('/'); // Redirect to homepage after login
      } else {
        // Invalid credentials, show error message
        setErrorMessage('Invalid username/email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while trying to log in. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="emailOrUsername">Email or Username:</label>
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
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

        {errorMessage && <p className={styles['text-danger']}>{errorMessage}</p>} {/* Display error message if exists */}

        <button type="submit" className={styles.btn + ' ' + styles['btn-primary']}>Login</button>
        <Link className={styles.btn + ' ' + styles['btn-primary']} to="/signup">Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
