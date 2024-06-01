import "./CardList.css";

import { useContext, useEffect, useState } from "react";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import { AuthContext} from "../../App";

const CardList = () => {
  const{auth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [card, setCard] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchCard = async () => {
    try {
      const response = await fetch("http://localhost:3000/cards");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCard(data);
    } catch (error) {
      console.error("Error fetching card:", error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const filteredCard = card.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function showCard(id) {
    navigate(`/card/${id}`);

  }
  function createCard() {
    navigate(`/create-card`);
  }

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ul className="card-list">
        {filteredCard.map((card) => (
          <li
            key={card.id}
            className="card-container"
            onClick={() => showCard(card.id)}
          >
            <h2>{card.title}</h2>
            <img src={card.imageUrl} alt={card.title} />
            <p>Definiție: {card.description}</p>
          </li>
        ))}
      </ul>
      {auth?(
      <button className="create-button" onClick={() => createCard()}>Adauga definitii</button>
    ):(
      ""
     )}
      </div>
  );
};

export default CardList;
