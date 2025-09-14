import React, { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">My Website</div>
      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-6">
        <li><a href="#home" className="hover:text-gray-300">Home</a></li>
        <li><a href="#about" className="hover:text-gray-300">About</a></li>
        <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
      </ul>
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 border rounded"
        onClick={toggleMenu}
      >
        {isMobileMenuOpen ? "Close" : "Menu"}
      </button>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-blue-700 text-white flex flex-col items-center md:hidden">
          <li className="py-2"><a href="#home">Home</a></li>
          <li className="py-2"><a href="#about">About</a></li>
          <li className="py-2"><a href="#contact">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}