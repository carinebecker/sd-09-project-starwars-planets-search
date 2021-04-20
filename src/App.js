import React from 'react';
import Table from './components/Table';
import { PlanetsProvider } from './context/PlanetsContext';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars - Planets Search</h1>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
