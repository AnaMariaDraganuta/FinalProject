import { useNavigate } from "react-router-dom";

import "./Register.css";

export function Register() {
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();

    const formElement = event.target;
    const { firstName ,secondName, username, email,phoneNumber ,  password, reTypePassword} =
      formElement;

    if (password.value !== reTypePassword.value) {
      console.warn(`Passwords don't match!`);
      return;
    }

    const user = {
      firstName: firstName.value,
      secondName: secondName.value,
      username: username.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      password: password.value
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => navigate("/login"));
  }

  return (
    <div className="register-container">
      <div className="image-container">
      {/* <img src="src/photo/create1.png" alt="Placeholder" /> */}

        <img src="https://i.pinimg.com/564x/1b/37/e6/1b37e685763b14a05358ad202ac97a2d.jpg" alt="Placeholder" />
      </div>

      <div className="register">
        <form onSubmit={register}>
        <h1 className="register-title">Create new account </h1>
          <div className="register-flex-container">

          <fieldset>
            <label htmlFor="firstName">First Name:</label>
            <div>
              <input type="text" id="firstName" name="firstName" required />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="secondName">Second Name:</label>
            <div>
              <input type="text" id="secondName" name="secondName" required />
            </div>
          </fieldset>
          </div>

          <fieldset>
            <label htmlFor="username">Username:</label>
            <div>
              <input type="text" id="username" name="username" required />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="email">Email:</label>
            <div>
              <input type="email" id="email" name="email" required />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <div>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                required
              />
            </div>
          </fieldset>
          <div className="register-flex-container">
          <fieldset>
            <label htmlFor="password">Password:</label>
            <div>
              <input type="password" id="password" name="password" required />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="reTypePassword">Confirm Password:</label>
            <div>
              <input
                type="password"
                id="reTypePassword"
                name="reTypePassword"
                required
              />
            </div>
          </fieldset>
          </div>

          <fieldset>
            <label htmlFor="checkbox">
              <input type="checkbox" id="checkbox" name="checkbox" required />Accept termenii și condițiile
            </label>
          </fieldset>

          <button className="buttonRegister" type="submit">
            Register
          </button>
        </form>
      </div>


    </div>
  );
}
