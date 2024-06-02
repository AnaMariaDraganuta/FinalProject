import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';

export default function Logout()  {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    // Șterge token-ul din localStorage
    localStorage.removeItem('accessToken');

    // Actualizează starea autentificării
    setAuth(null);

    // Redirecționează utilizatorul către pagina de login
    navigate('/login');
  };

  return (
    <ul>
      <li onClick={logout}>LogOut</li>

    </ul>
  )
}


