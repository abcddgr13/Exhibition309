import { useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import React from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/about", label: "เกี่ยวกับ" },
    { href: "/gallery", label: "แกลเลอรี" },
    { href: "/add", label: "เพิ่มผลงาน" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-glass border-b border-border z-50">
      <nav className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="text-xl md:text-2xl font-bold text-primary hover:text-accent transition-colors">
          นิทรรศการศิลปะ
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(href) ? "text-primary" : "text-foreground"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          {/* แสดงเฉพาะแอดมิน */}
          {sessionStorage.getItem("isAdmin") === "true" && (
            <li>
              <a
                href="/admin"
                className="font-medium transition-colors hover:text-primary text-red-500"
              >
                จัดการผลงาน
              </a>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border md:hidden">
            <ul className="flex flex-col">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`block px-4 py-3 font-medium transition-colors hover:bg-secondary ${
                      isActive(href) ? "text-primary bg-secondary" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              {sessionStorage.getItem("isAdmin") === "true" && (
                <li>
                  <a
                    href="/admin"
                    className="block px-4 py-3 font-medium transition-colors hover:bg-secondary text-red-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    จัดการผลงาน
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}