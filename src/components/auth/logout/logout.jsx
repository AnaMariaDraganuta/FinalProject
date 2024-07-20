import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";

export default function Logout() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    localStorage.removeItem("roles");
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/login");
  };

  return (
    <ul>
      <li onClick={logout}>LogOut</li>
    </ul>
  );
}
