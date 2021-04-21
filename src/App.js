import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Filter from './components/Filter';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <Filter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
