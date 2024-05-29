import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from 'react';

import { CardContext } from "../../App";

// import "./Recommended.css";

function Recommended({ searchTerm }) {
  const { cards } = useContext(CardContext);

  const filteredCards = cards.filter(({ title }) =>
    title.toUpperCase().includes(searchTerm.toUpperCase())
  );
  
  const cardsNotFound = filteredCards.length === 0;

  return (
    <section>
      <header>
        <h1>Recommended for you</h1>
      </header>

      {cardsNotFound ? (
        <p>404 There were no movies found for the given search input.</p>
      ) : (
        <ul className="card-list">
          {filteredCards.map((cardItem) => (
            <Link key={cardItem.id} to={`/card/${cardItem.id}`}>
            </Link>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Recommended;

Recommended.propTypes = {
  searchTerm: PropTypes.string,
  cards: PropTypes.any,
};