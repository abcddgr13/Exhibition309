// client/src/components/Navigation.tsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navigation() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <h1>My Website</h1>
                <button onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? 'Close' : 'Menu'}
                </button>
                <ul className={isMobileMenuOpen ? 'nav-open' : 'nav-closed'}>
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <a href="/">Home</a>
                    </li>
                    <li className={location.pathname === '/about' ? 'active' : ''}>
                        <a href="/about">About</a>
                    </li>
                    <li className={location.pathname === '/contact' ? 'active' : ''}>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}