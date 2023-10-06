import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className='body'>
      <Router>
        <Routes>
          <Route exact path='/' Component={Login} />
          <Route exact path='/dashboard' Component={Dashboard} />
        </Routes>
      </Router >
    </div >
  );
}

export default App;
