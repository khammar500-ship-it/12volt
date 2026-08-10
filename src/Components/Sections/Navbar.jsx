import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/big_logo.png";

function Navbar() {
    const links = [
        { name: "Home", path: "/Home" },
        { name: "Podcast", path: "/podcast" },
        { name: "Message", path: "/message" },
        { name: "Customer", path: "/customer" },
    ];

    return (
        <nav className="w-full h-20 px-8 flex items-center justify-between bg-white shadow-md">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto object-contain"
                />
            </div>
            <div className="flex items-center gap-3">

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

        </nav>
    );
}

export default Navbar;
