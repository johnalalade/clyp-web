import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './Home'
import './App.css';
import Password from './forget-password';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path='/pay/:username/:id' component={Home}/>
            <Route path='/retrive/:id' component={Password}/>

          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
