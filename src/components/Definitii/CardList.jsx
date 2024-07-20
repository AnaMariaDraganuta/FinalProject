import "./CardList.css";
import { useEffect, useState } from "react";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";

const CardList = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    console.log('User from localStorage:', userFromStorage); 
    
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      console.log('Parsed user:', user); 

      if (user.roles && Array.isArray(user.roles)) {
        console.log('User roles:', user.roles); 
        setAdmin(user.roles.includes("Admin"));
      } else {
        console.log('User roles are not an array or undefined');
        setAdmin(false);
      }
    } else {
      console.log('No user found');
      setAdmin(false);
    }
  }, []);

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
            <p>Click pentru mai multe informatii.</p>
          </li>
        ))}
      </ul>
      {isAdmin && (
        <button className="create-button" onClick={createCard}>
          Adauga definitii
        </button>
      )}
    </div>
  );
};

export default CardList;
