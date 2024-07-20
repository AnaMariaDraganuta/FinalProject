import Logout from "../auth/logout/logout";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext} from "../../App";
import { IdContext } from "../../App";


import "./Navbar.css";

const Navbar = () => {
  const { auth } = useContext(AuthContext);
  const { id } = useContext(IdContext);
  return (
    <nav>
      <ul className="navbar-list">
        <li><Link to="/">Despre noi</Link></li>
        <li><Link to="/definitii">Definiții</Link></li>
        <li><Link to="/teste">Teste</Link></li>

        {auth ? (
          <>
          <li><Link to={`/edit-profile/${id}`}>Edit Profile</Link></li>
          <li><Logout/></li>
        </>
        ) : (
        
          <li><Link to="/login">LogIn</Link></li>
      

        )}
      </ul>
    </nav>
  );
};

export default Navbar;
