import React from 'react';

import { getPlanets } from '../src/services/planetListAPI';

import './App.css';

function App() {
  const data = getPlanets();
  console.log(data);
  return (
    <h1>Starwars Planet Search</h1>
  );
}

export default App;
