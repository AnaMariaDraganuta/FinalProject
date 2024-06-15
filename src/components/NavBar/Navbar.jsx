import Logout from "../auth/logout/logout";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";

import "./Navbar.css";

const Navbar = () => {
  const { auth } = useContext(AuthContext);
  return (
    <nav>
      <ul className="navbar-list">
        <li><Link to="/">Despre noi</Link></li>
        <li><Link to="/definitii">Definiții</Link></li>
        <li><Link to="/teste">Teste</Link></li>

        {auth ? (
          <li><Logout/></li>
        ) : (
          <li><Link to="/login">LogIn</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
