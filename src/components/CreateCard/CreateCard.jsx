
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, CardContext } from '../../App';
import './CreateCard.css';

// import CardList from '../Definitii/CardList';

export default function CreateCard() {
  const navigate = useNavigate();
  const { cards } = useContext(CardContext);
  const {auth} = useContext(AuthContext)
  const { idFromPath } = useParams();
  const selectedCard = cards.find((card) => card.id === idFromPath);

  function saveCard(event) {
    event.preventDefault();
    const formElement = event.target;

    const { title, url, description } = formElement;

    const cards = {
      title: title.value,
      imageUrl: url.value,
      description: description.value,
    };

    if (idFromPath) {
      fetch(`http://localhost:3000/cards/${idFromPath}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",

        },
        body: JSON.stringify(cards),
      })
      .then(() => console.log('card was modified!'))
    } else {
      fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cards),
      }).then(() => navigate('/'));
  
      formElement.reset();
    }
  }

  return (
    <form className="card-form" onSubmit={saveCard}>
    <fieldset className="form-fieldset">
      <label htmlFor="title">Title</label>
      <input
        name="title"
        className="form-input"
        id="title"
        type="text"
        required
        minLength={5}
        defaultValue={selectedCard?.title}
      />
    </fieldset>

    <fieldset className="form-fieldset">
      <label htmlFor="imgUrl">Image Url:</label>
      <input
        name="url"
        className="form-input"
        type="url"
        id="imgUrl"
        required
        defaultValue={selectedCard?.imageUrl}
      />
    </fieldset>

    <fieldset className="form-fieldset">
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          type="area"
          id="description"
          required
          defaultValue={selectedCard?.description}
        />
      </div>
    </fieldset>

    <button className="form-button">Save card</button>
  </form>
  );
}