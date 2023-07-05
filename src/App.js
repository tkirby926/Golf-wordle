import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeComponent } from './components/HomeComponent';
import HomePhoto from './components/golfle.jpeg';
import Scheffle from './components/Scheffle_logo.jpeg';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App" style={{backgroundImage: "url(" + HomePhoto + ")"}}>
      <img src={Scheffle} style={{height: '12vh', maxWidth: '85vw', marginBottom: '2vh'}}></img>
      <Router>
        <Routes>
          <Route path='/' element={<HomeComponent/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
