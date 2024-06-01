import { useContext } from 'react';
import { AuthContext } from '../../../App';



export default function LogoutButton(){
  const { setAuth } = useContext(AuthContext);


  const logout = () => {
    // Șterge token-ul din localStorage
    localStorage.removeItem('authToken');

    // Actualizează starea autentificării
    setAuth(null);

  };

  return (
    <button onClick={logout}>Logout</button>
  );
}


