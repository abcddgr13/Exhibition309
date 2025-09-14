import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/about", label: "เกี่ยวกับ" },
    { href: "/gallery", label: "แกลเลอรี" },
    { href: "/add", label: "เพิ่มผลงาน" }
  ];

  return (
    <nav className="flex flex-col md:flex-row gap-4 p-4 bg-gray-900">
      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Links */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:flex gap-4`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-white hover:text-yellow-400"
          >
            {item.label}
          </Link>
        ))}

        {/* แสดงเฉพาะ Admin */}
        {sessionStorage.getItem("isAdmin") === "true" && (
          <Link to="/admin" className="text-white hover:text-yellow-400">
            จัดการผลงาน
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
