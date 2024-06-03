import React from "react";

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { retrieveCards } from "./lib/cards.js";
import { Register } from "./components/auth/register/Register.jsx";

import Navbar from "./components/NavBar/Navbar.jsx";
import Teste from "./components/Teste/Teste.jsx";
import Login from "./components/auth/login/Login.jsx";
import CardList from "./components/Definitii/CardList.jsx";
import CreateCard from "./components/CreateCard/CreateCard.jsx";
import Home from "./components/Home/Home.jsx";
import CardDetails from "./components/Card-Details/CardDetails.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Logout from "./components/auth/logout/logout.jsx";

import "./App.css"

export const CardContext = React.createContext();
export const AuthContext = React.createContext();

function App() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [cards, setCards] = useState([]);
  const [auth, setAuth] = useState(accessToken);

  useEffect(() => {
    retrieveCards(setCards, auth, navigate).catch((error) =>
      console.log(error)
    );
  }, [auth, navigate]);
  
  return (
    <>
      <CardContext.Provider value={{ cards, setCards }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/teste" element={<Teste />} />
            <Route path="/definitii" element={<CardList />} />
            <Route path="/card/:idFromPath" element={<CardDetails />}></Route>
            <Route path="/create-card" element={<CreateCard />}></Route>
            <Route path="/edit-card/:idFromPath"element={<CreateCard />}></Route> 
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>

          <Footer></Footer>
        </AuthContext.Provider>
      </CardContext.Provider>
    </>
  );
}

export default App;
