import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/big_logo.png";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: "الصفحة الرئيسية", path: "/home"},
        { name: "سلايدر", path : "/slider"},
        { name: "الشكاوي", path: "/podcast"},
        { name: "الطلبات", path: "/message"},
        { name: "الذبائن", path: "/customer"}
        
    ];

    return (
        <nav className="w-full min-h-20 px-5 md:px-8 flex items-center justify-between bg-white shadow-md relative">
            
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-3">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `
                            px-5 py-2.5
                            rounded-xl
                            text-[17px]
                            font-medium
                            transition-all duration-300
                            ${
                                isActive
                                    ? "bg-[#FEEA09] text-black shadow-[0_4px_15px_rgba(254,234,9,0.35)]"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }
                            `
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>

            {/* Hamburger Button - Mobile */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
            >
                <span
                    className={`block w-7 h-0.5 bg-black transition-all duration-300 ${
                        menuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                ></span>

                <span
                    className={`block w-7 h-0.5 bg-black transition-all duration-300 ${
                        menuOpen ? "opacity-0" : ""
                    }`}
                ></span>

                <span
                    className={`block w-7 h-0.5 bg-black transition-all duration-300 ${
                        menuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                ></span>
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white shadow-lg md:hidden z-50">
                    <div className="flex flex-col p-4 gap-2">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `
                                    px-5 py-3
                                    rounded-xl
                                    text-[17px]
                                    font-medium
                                    transition-all duration-300
                                    ${
                                        isActive
                                            ? "bg-[#FEEA09] text-black"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-black"}
                                    `
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;