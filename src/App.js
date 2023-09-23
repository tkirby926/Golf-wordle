import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeComponent } from './components/HomeComponent';
import HomePhoto from './components/golfle.jpeg';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App" style={{backgroundImage: "url(" + HomePhoto + ")"}}>
      <Router>
        <Routes>
          <Route path='/' element={<HomeComponent/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
