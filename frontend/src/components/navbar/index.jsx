import { NavLink } from "react-router";
import "./navbar.css";
import { useNavbarConfig } from "./useNavbarConfig";
function Navbar() {
  const { navItems } = useNavbarConfig();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navItems.map((item) => (
          <li className="nav-item" key={item.name}>
            <NavLink
              to={item.path}
              className="nav-item-text"
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
