import { useNavigate } from 'react-router-dom';
import "./Register.css"
export function Register() {
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();

    const formElement = event.target;
    const { email, username, password, reTypePassword } = formElement;

    if (password.value !== reTypePassword.value) {
      console.warn(`Passwords don't match!`);
      return;
    }

    const user = {
      email: email.value,
      username: username.value,
      password: password.value,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => navigate('/login'));
  }

  return (
    <div className="register-container">

    <div className="image-container">
        <img src="https://i.pinimg.com/564x/33/4d/8e/334d8e06c2ef719d6094e9ac1e3213c1.jpg" alt="Placeholder" />
        <div className="overlay-text">Create new acount</div>
    </div>

    <div className="register">
    <form onSubmit={register}>
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

        {/* <fieldset>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <div>
                <input type="number" id="phoneNumber" name="phoneNumber" required />
            </div>
        </fieldset> */}

        <fieldset>
            <label htmlFor="password">Password:</label>
            <div>
                <input type="password" id="password" name="password" required />
            </div>
        </fieldset>

        <fieldset>
            <label htmlFor="reTypePassword">Confirm password:</label>
            <div>
                <input type="password" id="reTypePassword" name="reTypePassword" required />
            </div>
        </fieldset>

        <fieldset>
            <label htmlFor="checkbox">
                <input type="checkbox" id="checkbox" name="checkbox" required />
                Accept termenii și condițiile
            </label>
        </fieldset>

        <button className='buttonRegister' type="submit">Register</button>
    </form>
</div>

<div className="image-container">
        <img src="https://i.pinimg.com/564x/ab/46/42/ab4642d231cb198fab0dcde22f3cf31b.jpg" alt="Placeholder" />

    </div>

</div>

  );
}
