import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  console.log(auth);
  console.log(auth.token);
  console.log(auth.userId);

  useEffect(() => {
    if (!auth || !auth.token || !auth.userId) {
      navigate("/login");
      return;
    }

    // Funcție pentru a obține datele de profil ale utilizatorului
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${auth.userId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json"
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          console.error("Failed to fetch user profile", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [auth, navigate]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Username: {userProfile.username}</p>
    </div>
  );
};

export default UserProfile;
