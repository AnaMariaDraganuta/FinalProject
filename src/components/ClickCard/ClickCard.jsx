// import { CardContext } from "../../App";
import Search from "../Search/Search";
import retrieveCards from "../function";

import { useState, useEffect } from "react";

// Version 2
// async function retrieveCards(setCards) {
//   const response = await fetch("http://localhost:3000/cards");
//   const cardsFromServer = await response.json();

//   setCards(cardsFromServer);
// }

// Version 1
// function retrieveCards() {
//   return fetch("http://localhost:3000/cards").then((response) =>
//     response.json()
//   );
// }


export default function ClickCard() {
  
  const [ searchTerm ,setSearchTerm] = useState(""); //
  const [cards , setCards] = useState([]) ;
  // const { cards } = useContext(CardContext);

  function onSearchChange(_searchTerm) {
    setSearchTerm(_searchTerm , searchTerm); //
  }
//   Version 1
  useEffect(() => {
    console.log("in useEfect");
    retrieveCards(setCards);
  }, []);

  console.log(cards);



  if (!cards?.length) {
    return <h1>There are no movies yet!</h1>;
  }

  return (
    <>
      <Search onSearchChange={onSearchChange} />
    </>
  );
}