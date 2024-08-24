import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
const NavBar = () => {
  const location = useLocation();
  return (
    <div className="Navbar-container">
      <div className="Navbar-logo">
        <img src="logo.png" alt="logo" />{" "}
        {/* Replace "logo.png" with your logo file */}
      </div>
      <div className="Navbar-btn">
        {location.pathname === "/register" ? (
          <Link to="/login">
            <button className="Navbar-child-btn">Login</button>
          </Link>
        ) : location.pathname === "/login" ? (
          <Link to="/register">
            <button className="Navbar-child-btn">Register</button>
          </Link>
        ) : location.pathname === "/" ? (
          <Link to="/logout">
            <button className="Navbar-child-btn-logout">Logout</button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default NavBar;
