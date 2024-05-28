
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../App';

export default function CreateCard() {
  const navigate = useNavigate();
  const { cards } = useContext(CardContext);
  const { idFromPath } = useParams();
  const selectedCard = cards.find((card) => card.id === idFromPath);

  function saveCard(event) {
    event.preventDefault();
    const formElement = event.target;

    const { title, url, description } = formElement;

    const card = {
      title: title.value,
      imageUrl: url.value,
      description: description.value,
    };

    if (idFromPath) {
      fetch(`http://localhost:3000/cards/${idFromPath}`, {
        method: "PUT",
        body: JSON.stringify(card),
      })
      .then(() => console.log('card was modified!'))
    } else {
      fetch("http://localhost:3000/cards", {
        method: "POST",
        body: JSON.stringify(card),
      }).then(() => navigate('/'));
  
      formElement.reset();
    }
  }

  return (
    <form onSubmit={saveCard}>
      <fieldset>
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

      <fieldset>
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

      

      <fieldset>
        <label>Description</label>

        <div>
          <label htmlFor="movie">Card</label>
          <input
            name="description"
            type="radio"
            value="movie"
            id="movie"
            required
            defaultChecked={selectedCard?.description.toLowerCase() === "card"}//mod
          />

        </div>
      </fieldset>

      <button>Save card</button>
    </form>
  );
}