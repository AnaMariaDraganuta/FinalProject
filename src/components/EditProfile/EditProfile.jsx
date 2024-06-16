import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";

import './EditProfile.css'

export default function EditProfile() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    username: "",
    secondName: "",
    firstName: "",
    password: "",
    phoneNumber: "",
    name: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
console.log(`ID:${id}`);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth}`
          },
        });

        if (!response.ok) {
          throw new Error("Nu s-a reușit preluarea datelor utilizatorului");
        }

        const data = await response.json();
        setUserData({
          email: data.email,
          username: data.username,
          secondName: data.secondName,
          firstName: data.firstName,
          phoneNumber : data.phoneNumber,
          password: "********",
        });
      } catch (error) {
        setError("Eroare la preluarea datelor utilizatorului");
      } finally {
        setLoading(false);
      }
    }

    if (id && auth) {
      fetchUserData();
    }
  }, [id, auth]);

  async function handleSubmit(event) {
    event.preventDefault();

    const { email, username, password ,firstName, secondName ,phoneNumber } = userData;

    const updatedUserData = {
      email,
      firstName,
      secondName,
      username,
      password,
      phoneNumber,
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error("Nu s-a reușit actualizarea datelor utilizatorului");
      }

      navigate("/");
    } catch (error) {
      setError("Eroare la actualizarea datelor utilizatorului");
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
    <h1 className="edit-title">Edit Profile</h1>
    {error && <div className="error">{error}</div>}
    

    <fieldset className="edit-profile-fieldset">
      <label htmlFor="username" className="edit-profile-label">Username:</label>
      <div>
        <input type="text" id="username" name="username" className="edit-profile-input" value={userData.username} onChange={handleInputChange} />
      </div>
    </fieldset>

    <div className="edit-profile-flex-container">
      <fieldset className="edit-profile-fieldset-half">
        <label htmlFor="firstName" className="edit-profile-label">First Name:</label>
        <div>
          <input type="text" id="firstName" name="firstName" className="edit-profile-input" value={userData.firstName} onChange={handleInputChange} />
        </div>
      </fieldset>

      <fieldset className="edit-profile-fieldset-half">
        <label htmlFor="secondName" className="edit-profile-label">Second Name:</label>
        <div>
          <input type="text" id="secondName" name="secondName" className="edit-profile-input" value={userData.secondName} onChange={handleInputChange} />
        </div>
      </fieldset>
    </div>

    <fieldset className="edit-profile-fieldset">
      <label htmlFor="email" className="edit-profile-label">Email:</label>
      <div>
        <input type="email" id="email" name="email" className="edit-profile-input" value={userData.email} onChange={handleInputChange} />
      </div>
    </fieldset>

    <fieldset className="edit-profile-fieldset">
      <label htmlFor="phoneNumber" className="edit-profile-label">Phone Number:</label>
      <div>
        <input type="text" id="phoneNumber" name="phoneNumber" className="edit-profile-input" value={userData.phoneNumber} onChange={handleInputChange} />
      </div>
    </fieldset>

    <fieldset className="edit-profile-fieldset">
      <label htmlFor="password" className="edit-profile-label">Password:</label>
      <div>
        <input type="password" id="password" name="password" className="edit-profile-input" value={userData.password} onChange={handleInputChange} />
      </div>
    </fieldset>

    <button type="submit" className="edit-profile-button">Save</button>
  </form>
  );
}
