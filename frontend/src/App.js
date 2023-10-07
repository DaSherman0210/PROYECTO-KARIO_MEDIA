import './App.css';
import React from 'react';
import Logo from './components/logo';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './components/main';

function App() {
  return (
    <div className='body'>
      <Router>
        <Routes>
          <Route exact path='/login' Component={Login} />
          <Route exact path='/dashboard' Component={Dashboard} />
          <Route exact path='/' Component={Logo} />
          <Route exact path='/main' Component={Main} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
