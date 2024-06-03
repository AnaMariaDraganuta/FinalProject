import { CardContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import { retrieveCards } from "../../lib/cards";
import { useContext, useEffect, useState } from "react";
import "./CardDetails.css";

async function retrieveCard(setCard, cardId) {
  const response = await fetch(`http://localhost:3000/cards/${cardId}`);
  const card = await response.json();
  setCard(card);
}

export default function CardDetails() {
  const { auth } = useContext(AuthContext);

  const [card, setCard] = useState({});
  const { idFromPath } = useParams();
  const navigate = useNavigate();
  const { setCards } = useContext(CardContext);

  useEffect(() => {
    retrieveCard(setCard, idFromPath);
  }, [idFromPath]);

  useEffect(() => {
    if (!card) {
      navigate("/");
    }
  }, [card, navigate]);

  if (!card) {
    return;
  }

  const { id, title, imageUrl, description } = card;

  function deleteCard() {
    const userConfirmedAction = confirm(
      "Are you sure you want to delete the card?"
    );

    if (userConfirmedAction) {
      fetch(`http://localhost:3000/cards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }).then(() => {
        retrieveCards(setCards);

        navigate("/definitii");
      });
    }
  }

  function editCard() {
    navigate(`/edit-card/${id}`);
  }

  return (
    <section className="detail">
      <div className="detail-content">
        <>
          <header className="detail-header">
            <h3>{title}</h3>
          </header>
          <div className="principal-detail">
            <img className="detail-image" src={imageUrl} />
            <p className="detail-description">Definitie : {description}</p>
          </div>
        </>
        {auth ? (
          <>
            <div className="card-detail__actions">
              <button
                className="card-detail__button card-detail__button--delete"
                onClick={deleteCard}
              >
                Delete card
              </button>
              <button
                className="card-detail__button card-detail__button--edit"
                onClick={editCard}
              >
                Edit card
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
