import { useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import React from "react";

// export default แค่ครั้งเดียว
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
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}              <RouterLink
                to={href}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(href) ? "text-primary" : "text-foreground"
                }`}
              >
                {label}
              </RouterLink>
            </li>
          ))}
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
                  <RouterLink
                    to={href}
                    className={`block px-4 py-3 font-medium transition-colors hover:bg-secondary ${
                      isActive(href) ? "text-primary bg-secondary" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-glass border-b border-border z-50">
      <nav className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-xl md:text-2xl font-bold text-primary hover:text-accent transition-colors" data-testid="logo-link">
          <i className="fas fa-palette mr-2"></i>
          นิทรรศการศิลปะ
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link 
                href={href}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(href) ? "text-primary" : "text-foreground"
                }`}
                data-testid={`nav-link-${label}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border md:hidden">
            <ul className="flex flex-col">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 font-medium transition-colors hover:bg-secondary ${
                      isActive(href) ? "text-primary bg-secondary" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-link-${label}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
