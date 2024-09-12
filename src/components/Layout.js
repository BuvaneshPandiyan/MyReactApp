import React from 'react';
import './Layout.css'; 
import { Link } from 'react-router-dom';
const Layout =() =>{
    return (
        <header className="layout-content">
        <div className="layout-content">
            <Link to="/categories" className='layout-brand'>Categories</Link>
            <Link to="/mensclothing" className='layout-brand'>Men's Clothing</Link>
            <Link to="/womensclothing" className='layout-brand'>Women's Clothing</Link>
            <Link to="/kidsclothing" className='layout-brand'>Kid's Clothing</Link>
            <Link to="/shoes" className='layout-brand'>Shoes</Link>
            <Link to="/perfumes" className='layout-brand'>Perfumes</Link>
            <Link to="/watches" className='layout-brand'>Watches</Link>
        </div>
        </header>

    );
};
export default Layout;