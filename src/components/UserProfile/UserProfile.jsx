import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }

    // Funcție pentru a obține datele de profil ale utilizatorului
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${auth}`,
            headers: {
                "Content-Type": "application/json",
              },
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          console.error("Failed to fetch user profile");
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
