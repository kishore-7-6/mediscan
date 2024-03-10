import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact'
import Search from './Components/Search';
import Feedback from './Components/Feedback';
import Account from './Components/Account';
import Navbar from "./Components/Navbar";
import PlantInfo from './Components/PlantInfo';
import Footer from "./Components/Footer";
import { useTranslation } from "react-i18next";



function App() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
     
  };
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Navbar onLanguageChange={handleLanguageChange}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mediscan" element={<Home />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Account" element={<Account/>} />
            <Route path="/plant/:plantName" element = {<PlantInfo/>} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
