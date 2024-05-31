import React from "react";
import Navbar from "./components/NavBar/Navbar.jsx";
import Teste from "./components/Teste/Teste.jsx";
import Login from "./components/auth/login/Login.jsx";
import CardList from "./components/Definitii/CardList.jsx";
import CreateCard from "./components/CreateCard/CreateCard.jsx";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { retrieveCards } from "./lib/cards.js";
import { Register } from "./components/auth/register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import CardDetails from "./components/Card-Details/CardDetails.jsx";
// import ClickCard from "./components/ClickCard/ClickCard.jsx";
import "./App.css"
// import CardModel from "./components/CardModel/CardModel.jsx";
// import  Recommend  from "./components/Definitii/Recomanded.jsx";
// import CardModel from "./components/CardModel/CardModel.jsx";

export const CardContext = React.createContext();
export const AuthContext = React.createContext();

function App() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [cards, setCards] = useState([]);
  const [auth, setAuth] = useState(accessToken);
  console.log(`Auth :${auth}`);
  useEffect(() => {
    retrieveCards(setCards, auth, navigate).catch((error) =>
      console.log(error)
    );
//   }, [auth]);
  }, [auth, navigate]);
  return (
    <>
      <CardContext.Provider value={{ cards, setCards }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/teste" element={<Teste />} />
            {/* <Route path="definitii" element={<CardModel/>} /> */}

            {/* <Route path="/" element={<ClickCard />} /> */}
            <Route path="/definitii" element={<CardList />} />
        
            <Route path="/card/:idFromPath" element={<CardDetails />}></Route>
            <Route path="/create-card" element={<CreateCard />}></Route>
             <Route path="/edit-card/:idFromPath"element={<CreateCard />}></Route> 
            {/* <Route path="/definitii"element={<ClickCard/>}></Route> */}



            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>


          </Routes>
        </AuthContext.Provider>
      </CardContext.Provider>
    </>
  );
}

export default App;
