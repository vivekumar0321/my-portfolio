// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import data from '../../data/portfolio.json';
import useTheme from '../../context/useTheme';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navItems = data.navigation || [];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // setMobileOpen(false);
    }, [location]);

    return (
        <>
            <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
                <div className="container">
                    <Link to="/" className="logo">
                        <img src={data.website?.logo || '/images/logo/logo.svg'} alt={data.website?.name || 'Logo'} />
                        <span>{data.website?.first_name || 'Portfolio'}</span>
                        <span className='last_name'>{data.website?.last_name || 'Portfolio'}</span>
                    </Link>

                    <ul className="nav-links">
                        {navItems.map((item) => (
                            <li key={item.hash}>
                                <a href={item.hash} className="nav-link">
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="header-right">
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </button>
                        <a href="#contact" className="btn-hire">
                            Hire Me
                        </a>
                        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            <div className={`offcanvas-overlay ${mobileOpen ? 'offcanvas-overlay--open' : ''}`} onClick={() => setMobileOpen(false)} />

            <div className={`offcanvas ${mobileOpen ? 'offcanvas--open' : ''}`}>
                <button className="close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                    <FaTimes />
                </button>
                <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
                    <img src={data.website?.logo || '/images/logo/logo.svg'} alt={data.website?.name || 'Logo'} />
                    <span>{data.website?.name || 'Portfolio'}</span>
                </Link>
                <nav className="offcanvas-nav">
                    {navItems.map((item) => (
                        <a key={item.hash} href={item.hash} onClick={() => setMobileOpen(false)}>
                            {item.name}
                        </a>
                    ))}
                </nav>
                <a href="#contact" className="btn-hire" onClick={() => setMobileOpen(false)}>
                    Hire Me
                </a>
            </div>
        </>
    );
};

export default Header;