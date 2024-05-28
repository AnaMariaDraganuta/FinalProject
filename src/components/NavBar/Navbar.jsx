
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar-list"> 
        <li><Link to="/">Home</Link></li>
        <li><Link to="/definitii">Definiții</Link></li>
        <li><Link to="/teste">Teste</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/create-card">CreateCard</Link></li>

      </ul>
    </nav>
  );
};

export default Navbar;

