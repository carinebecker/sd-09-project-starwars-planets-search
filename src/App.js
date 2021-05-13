import React from 'react';

import Provider from './context/Provider';
import Table from './components/Table';
import Form from './components/Form';

import './App.css';

function App() {
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
