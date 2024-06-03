import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";

export default function Logout() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth(null);
    navigate("/login");
  };

  return (
    <ul>
      <li onClick={logout}>LogOut</li>
    </ul>
  );
}
