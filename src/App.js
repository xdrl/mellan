import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navs } from './components/nav';
import {Expenses} from './components/Kilo';
import Button from '@material-ui/core/Button';

function App() {

  return (
    <div className="App">
      <div className="container">
        <div className="navbar">
    	    <Navs />
        </div>
        <br />
        <div className="expenses">

          <Expenses />
        </div>

      </div>
    </div>
  );
}
export default App;
