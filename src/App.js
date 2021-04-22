import React from 'react';
import Table from './components/Table';
import './App.css';
import Provider from './context/AppProvider';

function App() {
  return (
    <Provider>
      <h1>Starwars Planet Search</h1>
      <Table />
    </Provider>
  );
}

export default App;
