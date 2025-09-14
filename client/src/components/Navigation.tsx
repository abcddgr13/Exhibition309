import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import React from "react"
import { Link } from "react-router-dom"

const Navigation: React.FC = () => {
return (
<nav className="flex gap-4 p-4 bg-gray-900">
<Link to="/" className="text-white hover:text-yellow-400">หน้าแรก</Link>
<Link to="/about" className="text-white hover:text-yellow-400">เกี่ยวกับ</Link>
<Link to="/gallery" className="text-white hover:text-yellow-400">แกลเลอรี</Link>
<Link to="/add" className="text-white hover:text-yellow-400">เพิ่มผลงาน</Link>

{/* ✅ โชว์เฉพาะแอดมิน */}  
  {sessionStorage.getItem("isAdmin") === "true" && (  
    <Link to="/admin" className="text-white hover:text-yellow-400">  
      จัดการผลงาน  
    </Link>  
  )}  
</nav>

)
}

export default Navigation

export default function Navigation() {
const [location] = useLocation();
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const navItems = [
{ href: "/", label: "หน้าแรก", icon: "fas fa-home" },
{ href: "/about", label: "เกี่ยวกับ", icon: "fas fa-info" },
{ href: "/gallery", label: "แกลเลอรี", icon: "fas fa-images" },
{ href: "/add", label: "เพิ่มผลงาน", icon: "fas fa-plus" }
];

const isActive = (href: string) => {
if (href === "/") return location === "/";
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

