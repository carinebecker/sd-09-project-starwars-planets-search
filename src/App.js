import React, { useContext } from 'react';
import './App.css';
import Table from './components/Table';
import StarWarsContext from './Context/StarWarsContext';

function App() {
  const value = useContext(StarWarsContext);
  return (
    <main>
      <h1>Star Wars Planets Search</h1>
      <h2>{value}</h2>
      <Table />
    </main>
  );
}

export default App;
