import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/about", label: "เกี่ยวกับ" },
    { href: "/gallery", label: "แกลเลอรี" },
    { href: "/add", label: "เพิ่มผลงาน" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur border-b border-gray-200 z-50">
      <nav className="flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">
        <a href="/" className="text-xl font-bold text-primary">
          นิทรรศการศิลปะ
        </a>

        <ul className="hidden md:flex space-x-8">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`font-medium hover:text-primary ${
                  isActive(href) ? "text-primary" : "text-gray-700"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b md:hidden">
            <ul className="flex flex-col">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`block px-4 py-3 hover:bg-gray-100 ${
                      isActive(href) ? "text-primary" : "text-gray-700"
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
}