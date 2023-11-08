import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeComponent } from './components/HomeComponent';
import HomePhoto from './components/golfle1.jpeg';
import React, { useState } from 'react';
import { AdminLoginComponent } from './components/adminlogin';
import{ AdminComponent } from './components/admin';

function App() {
  return (
    <div className="App" style={{backgroundImage: "url(" + HomePhoto + ")", position: 'absolute', width: '100vw'}}>
      <head>
      </head>
      <Router>
        <Routes>
          <Route path='/' element={<HomeComponent/>} />
          <Route path='/log_adm' element={<AdminLoginComponent/>} />
          <Route path='/admin' element={<AdminComponent/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
