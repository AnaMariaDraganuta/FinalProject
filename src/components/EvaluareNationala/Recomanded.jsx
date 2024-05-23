
import PropTypes from "prop-types";

import "./Recommended.css";
import CardList from "./CardList";

export default function Recommended({ searchTerm, cardList }) {

  return (
    <section>

      <ul className="card-list">
        {cardList
          .filter((card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
          )
          .map((card) => (
            <li className="card-container" key={card.id}>
              <CardList card={card} />
            </li>
          ))}
      </ul>
    </section>
  );
}

Recommended.propTypes = {
  searchTerm: PropTypes.string,
  cardList: PropTypes.any,
};