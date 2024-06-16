import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, CardContext } from '../../App';

import './CreateCard.css';


export default function CreateCard() {
  const navigate = useNavigate();
  const { cards } = useContext(CardContext);
  const {auth} = useContext(AuthContext)
  const { idFromPath } = useParams();
  const selectedCard = cards.find((card) => card.id === idFromPath);

  function saveCard(event) {
    event.preventDefault();
    const formElement = event.target;

    const { title, url, description, youtube } = formElement;

    const cards = {
      title: title.value,
      imageUrl: url.value,
      description: description.value,
      youtube : youtube.value,
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
      .then(() => navigate(`/card/${idFromPath}`));
    } else {
      fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cards),
      }).then(() => navigate('/definitii'));
  
      formElement.reset();
    }
  }

  return (
    <div>
    <form className="card-form" onSubmit={saveCard}>

      <h1 className="card">Adaugati noua lectie</h1>

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

    <fieldset className="form-fieldset">
      <div>
        <label htmlFor="youtube">Youtube Link:</label>
        <input
          className="form-input"
          name="youtube"
          type="url"
          id="youtube"
          required
          defaultValue={selectedCard?.youtube}
        />
      </div>
    </fieldset>


    <button className="form-button">Save card</button>

  </form>
  </div>
  );
}