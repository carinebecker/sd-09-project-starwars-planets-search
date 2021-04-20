import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import PlanetsList from './components/PlanetsList';

function App() {
  return (
    <Switch>
      <Route exact path="/"><PlanetsList /></Route>
    </Switch>
  );
}

export default App;
