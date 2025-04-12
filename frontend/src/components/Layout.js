import React, { createContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import harrisonFordImage from '../images/harrison_ford.jpg';
// Create theme context with expanded color palette
export const ThemeContext = createContext();



const Layout = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isHarrisonFordMode, setIsHarrisonFordMode] = useState(false);

    // Expanded theme colors object with both dark and light mode values
    const getThemeColors = (darkMode) => ({
        // Container backgrounds
        containerBg: darkMode ? '#1E2A47' : '#E6F3FF', // Changed light mode to light blue
        
        // Text colors
        textPrimary: darkMode ? '#FFFFFF' : '#1B4332', // Changed light mode to dark green
        textSecondary: darkMode ? '#A0AEC0' : '#2D6A4F', // Changed light mode to slightly lighter green
        
        // Accent colors
        accent: darkMode ? '#A29BFE' : '#1B4332', // Changed light mode to dark green
        accentSecondary: darkMode ? '#6C63FF' : '#2D6A4F',
        
        // UI element colors
        buttonBg: darkMode ? '#6C63FF' : '#2D6A4F',
        buttonText: '#FFFFFF',
        headerBg: darkMode ? '#282828' : '#FFFFFF',
        borderColor: darkMode ? '#404040' : '#D1E9FF',
        
        // Overlay backgrounds
        overlayBg: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(230, 243, 255, 0.9)',
    });

    // Initialize theme states from localStorage
    useEffect(() => {
        const darkModeEnabled = localStorage.getItem('dark-mode') === 'enabled';
        const harrisonFordEnabled = localStorage.getItem('harrison-ford-theme') === 'enabled';
        
        setIsDarkMode(darkModeEnabled);
        setIsHarrisonFordMode(harrisonFordEnabled);
        
        // Set CSS variables for theme
        const root = document.documentElement;
        const colors = getThemeColors(darkModeEnabled);
        
        if (darkModeEnabled) {
            document.body.classList.add('dark-mode');
            root.style.setProperty('--bg-primary', '#1E2A47');
            root.style.setProperty('--bg-secondary', colors.headerBg);
            root.style.setProperty('--bg-tertiary', '#3e3e3e');
            root.style.setProperty('--text-primary', colors.textPrimary);
            root.style.setProperty('--text-secondary', colors.textSecondary);
            root.style.setProperty('--border-color', colors.borderColor);
            root.style.setProperty('--accent-color', colors.accent);
        } else {
            document.body.classList.remove('dark-mode');
            root.style.setProperty('--bg-primary', '#E6F3FF');
            root.style.setProperty('--bg-secondary', colors.headerBg);
            root.style.setProperty('--bg-tertiary', '#e8e8e8');
            root.style.setProperty('--text-primary', colors.textPrimary);
            root.style.setProperty('--text-secondary', colors.textSecondary);
            root.style.setProperty('--border-color', colors.borderColor);
            root.style.setProperty('--accent-color', colors.accent);
        }
    }, []);

    const handleDarkModeToggle = (event) => {
        const enabled = event.target.checked;
        setIsDarkMode(enabled);
        
        const root = document.documentElement;
        const colors = getThemeColors(enabled);
        
        if (enabled) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
        
        root.style.setProperty('--bg-primary', colors.containerBg);
        root.style.setProperty('--bg-secondary', colors.headerBg);
        root.style.setProperty('--text-primary', colors.textPrimary);
        root.style.setProperty('--text-secondary', colors.textSecondary);
        root.style.setProperty('--border-color', colors.borderColor);
        root.style.setProperty('--accent-color', colors.accent);
        root.style.setProperty('--accent-color-secondary', colors.accentSecondary);
    };

    const handleHarrisonFordToggle = (event) => {
        const enabled = event.target.checked;
        setIsHarrisonFordMode(enabled);
        
        if (enabled) {
            document.body.classList.add('harrison-ford-theme');
            localStorage.setItem('harrison-ford-theme', 'enabled');
        } else {
            document.body.classList.remove('harrison-ford-theme');
            localStorage.setItem('harrison-ford-theme', 'disabled');
        }
    };

    const getBackgroundImage = () => {
        if (isHarrisonFordMode) {
            return 'url("/backgroundStarry.jpeg")';
        } else if (isDarkMode) {
            return 'url("/backgroundDark.jpeg")';
        }
        return 'url("/background.jpeg")';
    };

    const colors = getThemeColors(isDarkMode);

    const headerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.headerBg,
        padding: '15px 0',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const navLinkStyle = {
        color: colors.textPrimary,
        textDecoration: 'none',
        marginRight: '20px',
        fontWeight: '500',
        transition: 'color 0.3s ease'
    };

    const shareButtonStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        margin: '0 10px',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #40916c, #1B4332)',
        color: '#FFFFFF',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, background 0.3s ease',
        cursor: 'pointer'
    };

    
    
    const iconStyle = {
        width: '40px',
        height: '40px',
        fill: isDarkMode ? '#FFFFFF' : '#1B4332', // Changes color based on dark mode
        margin: '0 15px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, fill 0.3s ease', // Added transition for color change
        ':hover': {
            transform: 'scale(1.1)'
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, colors }}>
            <div style={{
                minHeight: '100vh',
                backgroundImage: getBackgroundImage(),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                transition: 'background-image 0.3s ease'
            }}>
                {/* Header */}
                <header style={headerStyle}>
                    <div style={{ 
                        maxWidth: '1200px', 
                        margin: '0 auto', 
                        padding: '0 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/Dashboard" style={{ 
                                ...navLinkStyle, 
                                fontSize: '24px', 
                                fontWeight: 'bold', 
                                color: colors.accent,
                                transition: 'color 0.3s ease'
                            }}>
                                Medicine Box
                            </Link>
                            <nav style={{ marginLeft: '40px' }}>
                                <Link to="/yourmedications" style={navLinkStyle}>Your Medications</Link> {/* publicwraps */}
                                <Link to="/aichat" style={navLinkStyle}>AI Chat</Link>  {/* personality */}
                                <Link to="/contact" style={navLinkStyle}>Contact Your Pharmacist</Link> 
                                <Link to="/deleteaccount" style={navLinkStyle}>Account</Link>
                            </nav>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: colors.textPrimary }}>
                            <label>
                                <input 
                                    type="checkbox"
                                    checked={isDarkMode}
                                    onChange={handleDarkModeToggle}
                                />
                                <span></span>
                                Dark Mode
                            </label>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main style={{ 
                    paddingTop: '60px',
                    backgroundColor: colors.overlayBg,
                    minHeight: '100vh',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {children}
                </main>

                {/* Harrison Ford Image */}
                {isHarrisonFordMode && (
                    <div id="harrisonFordImage">
                        <img
                            src={harrisonFordImage}
                            alt="Harrison Ford"
                        />
                    </div>
                )}
            </div>
        </ThemeContext.Provider>
    );
};

export default Layout;