import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const { login, user, logout } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <nav>
            <div className="logo-container">
                <span className="logo">StudySankalp</span>
            </div>
            <span className="menu-icon" onClick={toggleMenu}>&#9776;</span>
            <div className={`nav-links ${menuVisible ? 'show' : ''}`} id="navLinks">
                <a href="/">Home</a>
                <a href="/playlist">Player</a>
                <a href="/contact">Contact</a>
                <a href="/all_playlist">All Playlist</a>
            </div>
            {user ? (
                <div className="user-menu" onClick={toggleDropdown}>
                    <img 
                        src={user.photoURL} 
                        alt={user.displayName} 
                        className="user-photo" 
                    />
                    <span className="username">{user.displayName}</span>
                    <span className="dropdown-icon">▼</span>
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button className="logout-btn" onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <button className="login-btn" onClick={login}>Login with Google</button>
            )}
        </nav>
    );
}

export default Navbar;
