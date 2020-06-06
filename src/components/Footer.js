import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="main-footer"> 
        <p>Post Website</p>
        <nav>
            <ul className="footer__links">
                <li className="footer__link">
                    <Link to="/">Homepage</Link>
                </li>
                <li className="footer__link">
                    <Link to="/contact-us">Contact Us</Link>
                </li>
                <li className="footer__link">
                    <Link to="/about">About</Link>
                </li>
                <li className="footer__link"> 
                    <Link to="/search">Search Photos</Link>
                </li>
            </ul>
        </nav>
    </footer>
);

export default Footer;