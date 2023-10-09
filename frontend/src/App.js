import './App.css';
import React from 'react';
import Main from './components/main';
import Logo from './components/logo';
import Login from './components/login';
import Añadir from './components/añadir';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className='body'>
      <Router>
        <Routes>
          <Route exact path='/login' Component={Login} />
          <Route exact path='/dashboard' Component={Dashboard} />
          <Route exact path='/' Component={Logo} />
          <Route exact path='/main' Component={Main} />
          <Route exact path='/add' Component={Añadir} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
