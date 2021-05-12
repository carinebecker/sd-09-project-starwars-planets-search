import React, { useState, useEffect } from 'react';

import Provider from './context/Provider';
import Table from './components/Table';
import Form from './components/Form';

// import { getPlanets } from '../src/services/planetListAPI';

import './App.css';

function App() {
  /* const data = getPlanets();
  console.log(data); */

  return (
    <div>
      <h1>Starwars Planet Search</h1>
      <Provider>
        <Form />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
