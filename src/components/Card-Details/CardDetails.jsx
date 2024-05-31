import { CardContext } from '../../App';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext} from "../../App";
import { retrieveCards } from '../../lib/cards';
import { useContext , useEffect, useState } from "react";

async function retrieveCard(setCard, cardId){
    console.log({cardId});
    const response = await fetch(`http://localhost:3000/cards/${cardId}`);
    const card = await response.json();
    setCard(card);
}


export default function CardDetails() {
    const{auth} = useContext(AuthContext);

    const [card , setCard] = useState({});
    const { idFromPath } = useParams();   
    const navigate = useNavigate();
    const { setCards } = useContext(CardContext)

    useEffect(() => {
        console.log("useEffect for retrive card");
      retrieveCard(setCard, idFromPath); 

    }, [idFromPath]);



    useEffect(() => {
        console.log("useEffect for navigation");

        if(!card) {
            navigate('/');
        }
    }, [card , navigate]);

    if (!card){
    return;
    }
    
    const {id , title, imageUrl, description } = card;

    function deleteCard(){
        const userConfirmedAction = confirm('Are you sure you want to delete the card?')

        if(userConfirmedAction) {

            fetch(`http://localhost:3000/cards/${id}`, {
                method:"DELETE",
                headers: {
                    Authorization: `Bearer ${auth}`
                    
          
                  },
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
                </header>
                <img src={imageUrl} />
                <p className="card-detail__description">Description : {description}</p></>
               {auth?(
                <>
               <button onClick={deleteCard}>Delete card</button>
               <button onClick={editCard}>Edit card</button>
    </>
               ):(
                ""
               )}
        </section>
    );
}



