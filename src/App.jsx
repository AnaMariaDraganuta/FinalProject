import "./App.css"; 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Teste from "./components/Teste/Teste.jsx";
import Login from "./components/LogIn/Login.jsx";
import Home from "./components/Home/Home.jsx";
import CardList from "./components/EvaluareNationala/CardList.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<Teste />} />
        <Route path="/evaluare" element={<CardList />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
