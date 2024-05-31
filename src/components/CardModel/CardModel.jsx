import PropTypes from "prop-types";


function CardModel({ cardElement, large = false }) {
  // if (!cardElement) {
  //   return null; // 
  // }
  
  const { id, imageUrl, title, description } = cardElement;
  console.log(cardElement);

  return (
    <li className={`card ${large ? "card--large" : "card--small"}`} key={id}>
      <img className="card__image" src={imageUrl} />
      
      <div className='card__info'>
        <div>

          <span className="card__description">{description}</span>
        </div>

        <h3 className="card__title">{title}</h3>
      </div>
    </li>
  );
}

export default CardModel;

CardModel.propTypes = {
  large: PropTypes.bool,
  cardElement: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,

  }),
};