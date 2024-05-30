import './CardList.css';

import { useEffect, useState , } from 'react';
import CardDetails from '../Card-Details/CardDetails';
import Search from '../Search/Search';

const CardList = () => {
  const [card, setCard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fetchCard = async () => {
    try {
      const response = await fetch('http://localhost:3000/cards');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCard(data);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);
  

  const filteredCard = card.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div onClick={CardDetails}>
      <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul className="card-list">
        {filteredCard.map(card => (
          <li key={card.id} className="card-container">
            <h2>{card.title}</h2>
            <img src={card.imageUrl} alt={card.title} />
            <p>Definiție: {card.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
