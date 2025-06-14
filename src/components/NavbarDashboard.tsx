// components/Navbar.js
'use client';
import { useState } from 'react';
import { FaBars, FaBell, FaSun, FaMoon } from 'react-icons/fa';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Implement actual dark mode toggling logic if using tailwind's dark mode class strategy
    // e.g., document.documentElement.classList.toggle('dark')
  };

  return (
    <div className="w-full border-b bg-white dark:bg-gray-800 dark:text-white px-4 py-2 flex items-center justify-between">
      {/* Left: Menu Icon */}
      <div className="flex items-center space-x-4">
        <button className="text-2xl">
          <FaBars />
        </button>
        <span className="text-lg font-semibold">MyApp</span>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="text-xl relative">
          <FaBell />
          {/* Optional Notification Dot */}
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        {/* Theme Toggle */}
        <button className="text-xl" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile Image */}
        <img
          src="/profile.jpg" // replace with real image or placeholder
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
