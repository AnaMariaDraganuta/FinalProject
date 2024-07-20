import { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, IdContext } from "../../../App";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { setAuth } = useContext(AuthContext);
  const { setId } = useContext(IdContext);

  const login = (event) => {
    event.preventDefault();
    setError('');

    const formElement = event.target;
    const { email, password } = formElement;

    const user = {
      email: email.value,
      password: password.value,
    };

    console.log('Login request data:', user); 

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json().then(body => ({ status: response.status, body })))
      .then(({ status, body }) => {
        console.log('Response from server:', body); 

        if (status === 400) {
          setError(body.message || "Login failed"); 
          return;
        }

        if (status === 200) {
          localStorage.setItem("accessToken", body.accessToken);
          localStorage.setItem("id", body.user.id);
          localStorage.setItem("roles", body.user.roles);
          localStorage.setItem("user", JSON.stringify(body.user)); 


          setAuth(body.accessToken);
          setId(body.user.id);
          navigate("/");
        } else {
          setError(body.message || "Login failed"); 
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setError("An unexpected error occurred. Please try again.");
      });
  };

  const register = useCallback(() => {
    navigate(`/register`);
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img
          src="https://i.pinimg.com/564x/0c/9b/89/0c9b89b62ba04b4b4740f4ce2da28b54.jpg"
          alt="Placeholder"
        />
      </div>

      <div className="login">
        <form onSubmit={login}>
          <h1>Welcome back</h1>

          <fieldset>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </fieldset>

          <fieldset>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </fieldset>

          <button className="buttonLogin">Login</button>

          {error && <p className="error">{error}</p>}

          <p className="register-button" onClick={register}>
            Create new account
          </p>
        </form>
      </div>
    </div>
  );
}
