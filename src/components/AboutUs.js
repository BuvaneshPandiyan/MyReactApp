import React from 'react';
import './AboutUs.css'; // Update the CSS file as needed

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Me</h1>
        <p>
          Hi, I'm Buvaneshwar, and I single-handedly created this website as a personal project. As a passionate web developer, I wanted to build a platform where users can shop for men's, women's, and kids' clothing in an easy-to-use and stylish interface. This project reflects my dedication to blending technology with fashion, ensuring a seamless shopping experience for all users.
        </p>
        <p>
          With this project, I focused on delivering a responsive design, robust functionality, and a user-friendly interface. The goal was to create an online clothing store that offers a smooth shopping journey and showcases the latest trends in fashion.
        </p>

        <h2>My Mission</h2>
        <p>
          My mission is to offer a well-designed online platform that showcases a variety of clothing options, allowing users to navigate easily and find what they need quickly. I wanted to make sure the website is accessible and works seamlessly on both desktop and mobile devices.
        </p>

        <h2>Why This Project?</h2>
        <ul>
          <li><strong>End-to-End Development:</strong> I developed every aspect of this website, from front-end design to back-end functionality.</li>
          <li><strong>Responsive Design:</strong> This site is optimized for use on both desktop and mobile devices, ensuring a seamless shopping experience.</li>
        </ul>

        <h2>Technologies Used</h2>
        <ul>
          <li><strong>HTML:</strong> Structured the content and layout of the website.</li>
          <li><strong>CSS:</strong> Used for styling the website to make it visually appealing.</li>
          <li><strong>JavaScript:</strong> Added interactivity and logic to the website.</li>
          <li><strong>BootStrap:</strong> Ensured responsive design and a clean layout.</li>
          <li><strong>React.js:</strong> Created a Single Page Application (SPA) for faster navigation and dynamic content rendering without page reloads.</li>
          <li><strong>Spring Boot:</strong> Developed an API to fetch content from the H2 database and serve the website's data efficiently.</li>
        </ul>

        <h2>Contact Me</h2>
        <p>
          If you have any questions about this project or want to connect, feel free to reach out to me. I’m always happy to chat about web development or hear your feedback.
        </p>
        <p>
          <strong>Email:</strong> buvaneshpandiyandurai@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> 7338816479
        </p>
        <p>
          <strong>Instagram:</strong> <a href="https://www.instagram.com/buvaneshwarx" target="_blank" rel="noopener noreferrer">@buvaneshwarx</a>
        </p>
        <p>
          Let’s stay connected! Follow me on Instagram for updates and a behind-the-scenes look at my web development journey.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
