import { useContext , useEffect, useState } from "react";
import { retrieveCards } from '../../lib/cards';
import { AuthContext, CardContext } from '../../App';
import { useNavigate, useParams } from "react-router-dom";


async function retrieveCard(setCard, cardId){
    console.log({cardId});
    const response = await fetch(`http://localhost:3000/cards/${cardId}`);
    const card = await response.json();

    setCard(card);
}

export default function CardDetails() {
    const auth = useContext(AuthContext);
    const [card , setCard] = useState({});
    const { idFromPath } = useParams();   
    const navigate = useNavigate();
    const {  setCards } = useContext(CardContext)

    useEffect(() => {
      retrieveCard(setCard, idFromPath); 
    }, [idFromPath]);

    useEffect(() => {
        if(!card) {
            navigate('/');
        }
    }, [card , navigate])

    if (!card){
    return;
    }
    
    const {title, imageUrl, description , id} = card;

    function deleteCard(){
        const userConfirmedAction = confirm('Are you sure you want to delete the product?')

        if(userConfirmedAction) {

            fetch(`http://localhost:3000/cards/${id}`, {
                method:"DELETE",
              }).then(() => {
        
                retrieveCards(setCards);
        
                navigate('/');
              });
            }
          }

        function editCard(){
            navigate(`/edit-card/${id}`);
        }


    return(

        <section>
            <><header>
                    <h3>{title}</h3>
                </header><img src={imageUrl} /><p className="card-detail__description">Description : {description}</p></>
               <button onClick={deleteCard}>Delete card</button>
        
           {auth ? (
               <button onClick={editCard}>Edit card</button>
            ) : (
                ""
            )}
        </section>
    );
}


