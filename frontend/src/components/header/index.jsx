import Navbar from "../navbar";
import Profile from "./component/profile";
import "./header.css";
function Header() {
  return (
    <header className="header-component">
      <div>
        <div className="top-container">
          <div>Shanmuga stores </div>
          {/* <div>Search component</div> */}
          <div className="user-section">
            {/* <div>Cart</div> */}
            <div>
              <Profile />
            </div>
          </div>
        </div>
        <div className="nav-container">
          <Navbar />
        </div>
      </div>
    </header>
  );
}

export default Header;
