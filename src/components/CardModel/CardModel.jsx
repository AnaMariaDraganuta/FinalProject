import PropTypes from "prop-types";


function CradModel({ cardElement, large = false }) {
  const { id, imageUrl, description, title } = cardElement;

  return (
    <li className={`card ${large ? "card--large" : "card--small"}`} key={id}>
      <img className="card__image" src={imageUrl} />
      <div className="card__bookmark">
        <i className="card__bookmark-icon" />
      </div>

      <div className='card__info'>
        <div>

          <span className="card__description">{description}</span>
        </div>

        <h3 className="card__title">{title}</h3>
      </div>
    </li>
  );
}

export default CradModel;

CradModel.propTypes = {
  large: PropTypes.bool,
  cardElement: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,

  }),
};