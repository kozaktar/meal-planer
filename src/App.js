import React from 'react';
import './App.css';
import HeaderComponent from './components/header/header.component'
import HomePage from './pages/HomePage/HomePage';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div>
    <HeaderComponent/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
      </Switch> 
      
    </div>
  );
}

export default App;
