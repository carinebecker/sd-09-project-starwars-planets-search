import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PlanetsList from './components/PlanetsList';
import Provider from './local_resources/Provider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Route exact path="/"><PlanetsList /></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
