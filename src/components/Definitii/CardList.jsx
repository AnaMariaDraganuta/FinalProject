import "./CardList.css";
import { useContext, useEffect, useState } from "react";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const CardList = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useState(() => {
    const userFromStorage = localStorage.getItem('user');
    console.log('User from localStorage:', userFromStorage); // Verificăm conținutul
    return userFromStorage ? JSON.parse(userFromStorage) : null;
  });
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (user && user.roles) {
      console.log('User roles:', user.roles); // Verificăm rolurile
      setAdmin(user.roles.includes("Admin"));
    } else {
      console.log('No roles found for user');
      setAdmin(false);
    }
  }, [user]);

  console.log(`Is Admin: ${isAdmin}`);

  const fetchCards = () => {
    fetch("http://localhost:3000/cards")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showCard = (id) => {
    navigate(`/card/${id}`);
  };

  const createCard = () => {
    navigate(`/create-card`);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ul className="card-list">
        {filteredCards.map((card) => (
          <li
            key={card.id}
            className="card-container"
            onClick={() => showCard(card.id)}
          >
            <h2>{card.title}</h2>
            <img src={card.imageUrl} alt={card.title} />
            {/* <p>Definiție: {card.description}</p> */}
            <p>Click pentru mai multe informatii.</p>
          </li>
        ))}
      </ul>
      {auth && isAdmin ? (
        <button className="create-button" onClick={createCard}>
          Adauga definitii
        </button>
      ) : null}
    </div>
  );
};

export default CardList;
