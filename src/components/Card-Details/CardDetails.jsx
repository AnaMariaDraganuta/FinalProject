import { useParams, useNavigate } from "react-router-dom";

import "./CardDetails.css";
import { useContext, useEffect, useState } from "react";
import { retrieveCards } from '../../lib/cards';
import { CardContext } from "../../App";

async function retrieveCard(setCard, cardId) {
  const response = await fetch(`http://localhost:3000/cards/${cardId}`);
  const card = await response.json();

  setCard(card);
}

export default function CardDetails() {
  const [card, setCard] = useState({});
  const { idFromPath } = useParams();
  const navigate = useNavigate();
  const { cards, setCards } = useContext(CardContext);

  useEffect(() => {
    retrieveCard(setCard, idFromPath);
  }, []);

  useEffect(() => {
    if(!card) {
      navigate('/');
    }
  }, [card])

  // if (!card) {
  //   return;
  // }

  const { title, imageUrl, description , id } = card;

  function deleteCard() {
    const userConfirmedAction = confirm('Are you sure you want to delete the movie?')

    if (userConfirmedAction) {
      fetch(`http://localhost:3000/cards/${id}`, {
        method: "DELETE",
      }).then(() => {
    
        retrieveCards(setCards);

        navigate('/');
      });
    }
  }

  function editCard() {
    navigate(`/edit-card/${id}`);
  }

  return (
    <section>
      <header>
        <h3> {title} </h3>
      </header>

      <img src={imageUrl} />

      <p className="movie-detail__category"> Category: {description}</p>

      <button onClick={deleteCard}>Delete movie</button>
      <button onClick={editCard}>Edit movie</button>
    </section>
  );
}


// import { useParams, useNavigate } from "react-router-dom";
// import "./CardDetails.css";
// import { useContext, useEffect, useState } from "react";
// import { retrieveCards } from '../../lib/cards';
// import { CardContext } from "../../App";

// async function retrieveCard(setCard, cardId) {
//   const response = await fetch(`http://localhost:3000/cards/${cardId}`);
//   const card = await response.json();
//   setCard(card);
// }

// export default function CardDetails() {
//   const [card, setCard] = useState(null);
//   const { id } = useParams(); 
//   const navigate = useNavigate();
//   const { setCards } = useContext(CardContext);

//   useEffect(() => {
//     retrieveCard(setCard, id); 
//   }, [id]);

//   useEffect(() => {
//     if (card === null) {
//       navigate('/');
//     }
//   }, [card, navigate]); 

//   if (card === null) {
//     return null; 
//   }

//   const { title, imageUrl, description, id: cardId } = card;

//   function deleteCard() {
//     const userConfirmedAction = confirm('Are you sure you want to delete the movie?');
//     if (userConfirmedAction) {
//       fetch(`http://localhost:3000/cards/${cardId}`, {
//         method: "DELETE",
//       }).then(() => {
//         retrieveCards(setCards);
//         navigate('/');
//       });
//     }
//   }

//   function editCard() {
//     navigate(`/edit-card/${cardId}`);
//   }

//   return (
//     <section>
//       <header>
//         <h3>{title}</h3>
//       </header>
//       <img src={imageUrl} alt={title} />
//       <p className="card-detail__description">Description: {description}</p>
//       <button onClick={deleteCard}>Delete movie</button>
//       <button onClick={editCard}>Edit movie</button>
//     </section>
//   );
// }
