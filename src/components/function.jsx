
export default async function retrieveCards(setCards) {
    const response = await fetch("http://localhost:3000/cards");
    const cardsFromServer = await response.json();
  
    setCards(cardsFromServer);
  }