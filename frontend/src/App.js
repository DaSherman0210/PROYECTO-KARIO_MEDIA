import './App.css';
import React from 'react';
import Main from './components/main';
import Logo from './components/logo';
import Help from './components/help';
import Login from './components/login';
import Añadir from './components/añadir';
import Report from './components/report';
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
          <Route exact path='/report' Component={Report} />
          <Route exact path='/help' Component={Help} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
