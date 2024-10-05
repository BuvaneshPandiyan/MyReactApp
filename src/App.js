import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Categories from './components/categories/Categories';
import MenClothing from './components/pages/MenClothing';
import WomenClothing from './components/pages/WomenClothing';
import KidsClothing from './components/pages/KidsClothing';
import SearchResults from './components/pages/SearchResults';
import AboutUs from './components/AboutUs';
import Signup from './components/pages/SignUp'; // Import Signup component
import Login from './components/pages/Login'; // Import Login component
import Cart from './components/pages/Cart';
import Shoes from './components/pages/Shoes';
import Perfumes from './components/pages/Perfumes';
import Watches from './components/pages/Watches';
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> {/* Ensure full height with flexbox */}
        <Navbar onSearch={handleSearch} />
        <div className="flex-fill"> {/* Allows main content to grow */}
          <Layout /> {/* Optional if Layout contains additional structure */}
          <Routes>
            <Route path="/" element={<MenClothing />} />
            <Route path='categories' element={<Categories />} />
            <Route path='mensclothing' element={<MenClothing />} />
            <Route path='womensclothing' element={<WomenClothing searchTerm={searchTerm} />} />
            <Route path='kidsclothing' element={<KidsClothing searchTerm={searchTerm} />} />
            <Route path='searchresults' element={<SearchResults searchTerm={searchTerm} />} />
            <Route path='aboutus' element={<AboutUs />} />
            <Route path='signup' element={<Signup />} /> {/* Add Signup route */}
            <Route path='login' element={<Login />} /> {/* Add Login route */}
            <Route path='cart' element={<Cart/>} />
            <Route path='shoes' element={<Shoes/>}/>
            <Route path='perfumes' element={<Perfumes/>}/>
            <Route path='watches' element={<Watches/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
