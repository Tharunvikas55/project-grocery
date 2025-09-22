import { useState } from "react";
import { NavLink } from "react-router-dom"; 
import "./navbar.css";
import { useNavbarConfig } from "./useNavbarConfig";

function Navbar() {
  const { navItems } = useNavbarConfig();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div
        className="menu-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "✕" : "☰"}
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li className="nav-item" key={item.name}>
            <NavLink
              to={item.path}
              className="nav-item-text"
              onClick={() => setIsOpen(false)} 
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
