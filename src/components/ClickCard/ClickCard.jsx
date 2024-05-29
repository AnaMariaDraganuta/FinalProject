import { CardContext } from "../../App";
import Search from "../Search/Search";

import { useState, useContext } from "react";


export default function ClickCard() {
  const [ setSearchTerm] = useState("");
  const { cards } = useContext(CardContext);

  function onSearchChange(_searchTerm) {
    setSearchTerm(_searchTerm);
  }

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