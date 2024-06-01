import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';

const Logout = () => {
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
    <button onClick={logout}>Logout</button>
  );
};

export default Logout;
