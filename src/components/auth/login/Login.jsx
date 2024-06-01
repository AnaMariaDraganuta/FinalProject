import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [error, setError] = useState();

  async function login(event) {
    event.preventDefault();
    setError(null);

    const formElement = event.target;
    const { email, password } = formElement;

    const user = {
      email: email.value,
      password: password.value,
    };

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();

    if (response.status === 400) {
      setError(body);
      return;
    }

    if (response.ok) {
      localStorage.setItem("accessToken", body.accessToken);
      setAuth(body.accessToken);
      console.log(body.accessToken);
      navigate("/");
    }
  }
  function register() {
    navigate(`/register`);
  }

  return (
    <div>
<div className="login-container">

    <div className="login-image-container">
        <img src="https://i.pinimg.com/564x/0c/9b/89/0c9b89b62ba04b4b4740f4ce2da28b54.jpg" alt="Placeholder" /> 
    </div>

    <div className="login">
        <form onSubmit={login}>
            {error ? <p className="error">{error}</p> : ""}
            <h1>Welcome back</h1>
            <fieldset>
                <label htmlFor="email">Email:</label>
                <div>
                    <input type="email" id="email" name="email" />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password:</label>
                <div>
                    <input type="password" id="password" name="password" />
                </div>
            </fieldset>
            <button className="buttonLogin">Login</button>
        </form>
    </div>

    <div className="login-image-container">
        <img src="https://i.pinimg.com/564x/7d/f8/f3/7df8f39fd1de47e4aad3232774553516.jpg" alt="Placeholder" /> 
    </div>

</div>
<button className="register-button" onClick={() => register()}>Create new acount</button>
</div>

  );
}
