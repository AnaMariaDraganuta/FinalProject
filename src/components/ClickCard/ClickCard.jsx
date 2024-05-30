import { CardContext } from "../../App";
import Search from "../Search/Search";

import { useState, useContext, useEffect } from "react";

// Version 2
async function retrieveCards(setCards) {
  const response = await fetch("http://localhost:3000/cards");
  const cardsFromServer = await response.json();

  setCards(cardsFromServer);
}

export default function ClickCard() {
  
  const [ searchTerm ,setSearchTerm , setCards] = useState(""); //
  const { cards } = useContext(CardContext);

  function onSearchChange(_searchTerm) {
    setSearchTerm(_searchTerm , searchTerm); //
  }
//   Version 1
  useEffect(() => {
    async function getCards() {
      const cardsFromServer = await retrieveCards();

      setCards(cardsFromServer);
    }

    getCards();
  }, [setCards]);

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